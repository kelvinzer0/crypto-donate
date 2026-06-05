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

function validateAddresses(addresses: Record<string, string>): Record<string, string> {
  const clean: Record<string, string> = {}
  for (const [chain, addr] of Object.entries(addresses)) {
    if (!CHAINS[chain]) continue
    if (chain === "solana") { if (SOL_RE.test(addr)) clean[chain] = addr; continue }
    if (chain === "tron") { if (TRX_RE.test(addr)) clean[chain] = addr; continue }
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
  const raw = decodeData(c.req.param("base64"))
  if (!raw) return c.json({ error: "Invalid data" }, 400)
  const data = { ...raw, addresses: validateAddresses(raw.addresses) }
  if (Object.keys(data.addresses).length === 0) return c.json({ error: "No valid addresses" }, 400)

  const balances: Record<string, number> = {}
  const entries = Object.entries(data.addresses)

  // Check all balances in parallel
  const results = await Promise.allSettled(
    entries.map(async ([chain, addr]) => {
      const bal = await getUSDCBalance(chain, addr)
      return { chain, bal }
    })
  )

  for (const r of results) {
    if (r.status === "fulfilled") {
      balances[r.value.chain] = r.value.bal
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
})

// ─── Badge SVG ───
app.get("/:base64/badge", async (c) => {
  const raw = decodeData(c.req.param("base64"))
  if (!raw) return c.text("Invalid", 400)
  const data = { ...raw, addresses: validateAddresses(raw.addresses) }
  if (Object.keys(data.addresses).length === 0) return c.text("Invalid", 400)

  const theme = c.req.query("theme") || "dark"

  // Try cache first
  const cacheKey = `badge:${c.req.param("base64")}:${theme}`
  const cached = await c.env.KV?.get(cacheKey)
  if (cached) {
    c.header("Content-Type", "image/svg+xml")
    c.header("Cache-Control", "public, max-age=300")
    return c.body(cached)
  }

  // Fetch balances
  const balances: Record<string, number> = {}
  const entries = Object.entries(data.addresses)
  const results = await Promise.allSettled(
    entries.map(async ([chain, addr]) => {
      const bal = await getUSDCBalance(chain, addr)
      return { chain, bal }
    })
  )
  for (const r of results) {
    if (r.status === "fulfilled") balances[r.value.chain] = r.value.bal
  }

  const svg = renderBadge(data, balances, theme)

  // Cache for 5 min
  await c.env.KV?.put(cacheKey, svg, { expirationTtl: 300 })

  c.header("Content-Type", "image/svg+xml")
  c.header("Cache-Control", "public, max-age=300")
  return c.body(svg)
})

// ─── Donate page ───
app.get("/:base64", async (c) => {
  const base64 = c.req.param("base64")
  const raw = decodeData(base64)
  if (!raw) return c.text("Invalid donation link", 400)
  const data = { ...raw, addresses: validateAddresses(raw.addresses) }
  if (Object.keys(data.addresses).length === 0) return c.text("No valid wallet addresses", 400)

  // Fetch balances
  const balances: Record<string, number> = {}
  const entries = Object.entries(data.addresses)
  const results = await Promise.allSettled(
    entries.map(async ([chain, addr]) => {
      const bal = await getUSDCBalance(chain, addr)
      return { chain, bal }
    })
  )
  for (const r of results) {
    if (r.status === "fulfilled") balances[r.value.chain] = r.value.bal
  }

  return c.html(renderDonatePage(data, base64, balances))
})

export default app
