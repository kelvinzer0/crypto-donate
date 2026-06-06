import { Hono } from "hono"
import { cors } from "hono/cors"
import { CHAINS, decodeData, encodeData, getUSDCBalance, type DonateData } from "./chains"
import { renderDonatePage, renderGeneratorPage } from "./pages"
import { renderBadge } from "./badge"

type Bindings = {
  KV: KVNamespace
  DOMAIN: string
}

const EVM_RE = /^0x[0-9a-fA-F]{40}$/
const SOL_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
const TRX_RE = /^T[a-zA-Z0-9]{33}$/
const TON_RE = /^(EQ|UQ|EQA|UQA)[A-Za-z0-9_-]{40,50}$/
const DOT_RE = /^[1-9A-HJ-NP-Za-km-z]{47,48}$/

function validateAddresses(addresses: Record<string, string>): Record<string, string> {
  const clean: Record<string, string> = {}
  for (const [chain, addr] of Object.entries(addresses)) {
    if (!CHAINS[chain]) continue
    if (chain === "solana") { if (SOL_RE.test(addr)) clean[chain] = addr; continue }
    if (chain === "tron") { if (TRX_RE.test(addr)) clean[chain] = addr; continue }
    if (chain === "ton") { if (TON_RE.test(addr)) clean[chain] = addr; continue }
    if (chain === "polkadot") { if (DOT_RE.test(addr)) clean[chain] = addr; continue }
    if (EVM_RE.test(addr)) clean[chain] = addr
  }
  return clean
}

const app = new Hono<{ Bindings: Bindings }>()

app.use("/*", cors())

// ─── Home: Generator ───
app.get("/", (c) => {
  return c.html(renderGeneratorPage(c.env.DOMAIN || c.req.header("host") || "localhost"))
})

// ─── Stats API ───
app.get("/:base64/stats", async (c) => {
  try {
    const raw = decodeData(c.req.param("base64"))
    if (!raw) return c.json({ error: "Invalid data" }, 400)
    const data = { ...raw, addresses: validateAddresses(raw.addresses) }
    if (Object.keys(data.addresses).length === 0) return c.json({ error: "No valid addresses" }, 400)

    const balances: Record<string, number> = {}
    const entries = Object.entries(data.addresses)

    // Check all balances in parallel with timeout
    const balancePromise = Promise.allSettled(
      entries.map(async ([chain, addr]) => {
        const bal = await getUSDCBalance(chain, addr)
        return { chain, bal }
      })
    )
    const timeoutPromise = new Promise<"timeout">(resolve => setTimeout(() => resolve("timeout"), 25_000))
    const result = await Promise.race([balancePromise, timeoutPromise])

    if (result !== "timeout") {
      for (const r of result) {
        if (r.status === "fulfilled") balances[r.value.chain] = r.value.bal
      }
    }

    const total = Object.values(balances).reduce((s, v) => s + v, 0)
    const pct = data.target > 0 ? Math.min(100, (total / data.target) * 100) : 0

    return c.json({
      title: data.title,
      target: data.target,
      raised: total,
      percentage: Math.round(pct * 100) / 100,
      balances,
      chains: entries.map(([chain]) => chain),
      updated: new Date().toISOString(),
    })
  } catch {
    return c.json({ error: "Internal error" }, 500)
  }
})

// ─── Safe KV wrapper (handles placeholder/missing KV bindings) ───
async function kvGet(kv: KVNamespace | undefined, key: string): Promise<string | null> {
  try { return await kv?.get(key) ?? null } catch { return null }
}
async function kvPut(kv: KVNamespace | undefined, key: string, value: string, opts?: { expirationTtl?: number }) {
  try { await kv?.put(key, value, opts) } catch { /* ignore */ }
}

// ─── Badge SVG ───
app.get("/:base64/badge", async (c) => {
  try {
    const raw = decodeData(c.req.param("base64"))
    if (!raw) return c.text("Invalid", 400)
    const data = { ...raw, addresses: validateAddresses(raw.addresses) }
    if (Object.keys(data.addresses).length === 0) return c.text("Invalid", 400)

    const theme = c.req.query("theme") || "dark"

    // Try cache first
    const cacheKey = `badge:${c.req.param("base64")}:${theme}`
    const cached = await kvGet(c.env.KV, cacheKey)
    if (cached) {
      c.header("Content-Type", "image/svg+xml")
      c.header("Cache-Control", "public, max-age=300")
      return c.body(cached)
    }

    // Fetch balances with global timeout
    const balances: Record<string, number> = {}
    const entries = Object.entries(data.addresses)
    const balancePromise = Promise.allSettled(
      entries.map(async ([chain, addr]) => {
        const bal = await getUSDCBalance(chain, addr)
        return { chain, bal }
      })
    )

    // Hard timeout: 25 seconds max
    const timeoutPromise = new Promise<"timeout">(resolve => setTimeout(() => resolve("timeout"), 25_000))
    const result = await Promise.race([balancePromise, timeoutPromise])

    if (result !== "timeout") {
      for (const r of result) {
        if (r.status === "fulfilled") balances[r.value.chain] = r.value.bal
      }
    }

    const svg = renderBadge(data, balances, theme)

    // Cache for 5 min (fire-and-forget)
    kvPut(c.env.KV, cacheKey, svg, { expirationTtl: 300 })

    c.header("Content-Type", "image/svg+xml")
    c.header("Cache-Control", "public, max-age=300")
    return c.body(svg)
  } catch (err) {
    // Fallback: render badge with zero balances instead of 500
    const raw = decodeData(c.req.param("base64"))
    if (!raw) return c.text("Invalid", 400)
    const data = { ...raw, addresses: validateAddresses(raw.addresses) }
    const theme = c.req.query("theme") || "dark"
    const svg = renderBadge(data, {}, theme)
    c.header("Content-Type", "image/svg+xml")
    c.header("Cache-Control", "public, max-age=60")
    return c.body(svg)
  }
})

// ─── Donate page → redirect to GitHub Pages ───
app.get("/:base64", async (c) => {
  const base64 = c.req.param("base64")
  // Redirect to GitHub Pages hash route
  return c.redirect(`https://n8n-code.github.io/membership/#${base64}`, 302)
})

export default app
