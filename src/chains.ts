// Chain configurations for USDC with viem for EVM chains

import { createPublicClient, http, fallback, formatUnits, type Chain } from "viem"
import { mainnet, polygon, arbitrum, optimism, bsc, avalanche } from "viem/chains"

// Custom Base chain (not always in viem/chains)
const base: Chain = {
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] },
  },
  blockExplorers: {
    default: { name: "BaseScan", url: "https://basescan.org" },
  },
}

export interface ChainConfig {
  name: string
  symbol: string
  usdc: string
  rpcs: string[]
  explorer: string
  color: string
  faIcon: string
  iconPath: string
  decimals: number
  native: boolean
  type: "evm" | "solana" | "tron" | "ton" | "polkadot"
  viemChain?: Chain
}

export const CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    rpcs: [
      "https://eth.llamarpc.com",
      "https://cloudflare-eth.com",
      "https://rpc.ankr.com/eth",
      "https://1rpc.io/eth",
      "https://ethereum-rpc.publicnode.com",
    ],
    explorer: "https://etherscan.io",
    color: "#627EEA",
    faIcon: "fab fa-ethereum",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: mainnet,
  },
  polygon: {
    name: "Polygon",
    symbol: "MATIC",
    usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    rpcs: [
      "https://polygon-rpc.com",
      "https://rpc.ankr.com/polygon",
      "https://1rpc.io/matic",
      "https://polygon-bor-rpc.publicnode.com",
      "https://polygon-mainnet.g.alchemy.com/v2/demo",
    ],
    explorer: "https://polygonscan.com",
    color: "#8247E5",
    faIcon: "fas fa-shield-halved",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/matic.png",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: polygon,
  },
  arbitrum: {
    name: "Arbitrum",
    symbol: "ETH",
    usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    rpcs: [
      "https://arb1.arbitrum.io/rpc",
      "https://rpc.ankr.com/arbitrum",
      "https://1rpc.io/arb",
      "https://arbitrum-one-rpc.publicnode.com",
    ],
    explorer: "https://arbiscan.io",
    color: "#28A0F0",
    faIcon: "fas fa-circle-nodes",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImFyYiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzI4QTBGMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzIwNjBBMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjYwIiBmaWxsPSJ1cmwoI2FyYikiLz48cGF0aCBkPSJNMzggODhWNTZsMjUgNDRoOFY0NGgtOHYzMkwzOCA0NGgtOHY0NGg4em01MiAwVjU2bC0yNSA0NGgtOFY0NGg4djMybDI1LTMyaDh2NDRoLTh6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjk1Ii8+PC9zdmc+Cg==",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: arbitrum,
  },
  optimism: {
    name: "Optimism",
    symbol: "ETH",
    usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    rpcs: [
      "https://mainnet.optimism.io",
      "https://rpc.ankr.com/optimism",
      "https://1rpc.io/op",
      "https://optimism-rpc.publicnode.com",
    ],
    explorer: "https://optimistic.etherscan.io",
    color: "#FF0420",
    faIcon: "fas fa-circle",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im9wIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkYwNDIwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0MwMDE4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNjAiIGZpbGw9InVybCgjb3ApIi8+PGNpcmNsZSBjeD0iNjQiIGN5PSI1NiIgcj0iMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI4Ii8+PGNpcmNsZSBjeD0iNjQiIGN5PSI1NiIgcj0iOCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00NCA4Mmg0MHY4SDQ0eiIgcng9IjQiIGZpbGw9IiNmZmYiLz48L3N2Zz4K",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: optimism,
  },
  base: {
    name: "Base",
    symbol: "ETH",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    rpcs: [
      "https://mainnet.base.org",
      "https://rpc.ankr.com/base",
      "https://1rpc.io/base",
      "https://base-rpc.publicnode.com",
    ],
    explorer: "https://basescan.org",
    color: "#0052FF",
    faIcon: "fas fa-diamond",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJhc2UiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDUyRkYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDNBQ0MiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI2MCIgZmlsbD0idXJsKCNiYXNlKSIvPjxwYXRoIGQ9Ik02NCAzMGMxOC44IDAgMzQgMTUuMiAzNCAzNHMtMTUuMiAzNC0zNCAzNC0zNC0xNS4yLTM0LTM0IDE1LjItMzQgMzQtMzR6bTAgMTRjLTExIDAtMjAgOS0yMCAyMHM5IDIwIDIwIDIwIDIwLTkgMjAtMjAtOS0yMC0yMC0yMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjQgNDh2MzJNNDggNjRoMzIiIHN0cm9rZT0iIzAwNTJGRiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: base,
  },
  bsc: {
    name: "BNB Chain",
    symbol: "BNB",
    usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    rpcs: [
      "https://bsc-dataseed.binance.org",
      "https://bsc-dataseed1.binance.org",
      "https://rpc.ankr.com/bsc",
      "https://1rpc.io/bnb",
      "https://bsc-rpc.publicnode.com",
    ],
    explorer: "https://bscscan.com",
    color: "#F3BA2F",
    faIcon: "fab fa-btc",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png",
    decimals: 18,
    native: false,
    type: "evm",
    viemChain: bsc,
  },
  avalanche: {
    name: "Avalanche",
    symbol: "AVAX",
    usdc: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    rpcs: [
      "https://api.avax.network/ext/bc/C/rpc",
      "https://rpc.ankr.com/avalanche",
      "https://1rpc.io/avax/c",
      "https://avalanche-c-chain-rpc.publicnode.com",
    ],
    explorer: "https://snowtrace.io",
    color: "#E84142",
    faIcon: "fas fa-mountain-sun",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png",
    decimals: 6,
    native: false,
    type: "evm",
    viemChain: avalanche,
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    usdc: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    rpcs: [
      "https://api.mainnet-beta.solana.com",
      "https://rpc.ankr.com/solana",
      "https://solana-mainnet.g.alchemy.com/v2/demo",
    ],
    explorer: "https://solscan.io",
    color: "#9945FF",
    faIcon: "fas fa-sun",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png",
    decimals: 6,
    native: true,
    type: "solana",
  },
  tron: {
    name: "Tron",
    symbol: "TRX",
    usdc: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
    rpcs: [
      "https://api.trongrid.io",
      "https://api.tronstack.io",
    ],
    explorer: "https://tronscan.org",
    color: "#FF0013",
    faIcon: "fas fa-bolt",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/trx.png",
    decimals: 6,
    native: true,
    type: "tron",
  },
  ton: {
    name: "TON",
    symbol: "TON",
    usdc: "EQCxE6m0tU6zI8dRbmkBNNOkNUsToPj1vZC4I2IaLj0VjGFd",
    rpcs: [
      "https://toncenter.com/api/v2",
      "https://tonapi.io",
    ],
    explorer: "https://tonscan.org",
    color: "#0098EA",
    faIcon: "fas fa-water",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ton.png",
    decimals: 6,
    native: true,
    type: "ton",
  },
  polkadot: {
    name: "Polkadot",
    symbol: "DOT",
    usdc: "1337",
    rpcs: [
      "https://polkadot.api.subscan.io",
      "https://assethub-polkadot.api.subscan.io",
    ],
    explorer: "https://assethub.subscan.io",
    color: "#E6007A",
    faIcon: "fas fa-coins",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png",
    decimals: 6,
    native: true,
    type: "polkadot",
  },
}

export interface DonateData {
  title?: string
  desc?: string
  target: number
  currency?: string
  addresses: Record<string, string>
  logo?: string
  discord?: string
}

export function encodeData(data: DonateData): string {
  return btoa(JSON.stringify(data)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export function decodeData(b64: string): DonateData | null {
  try {
    const padded = b64.replace(/-/g, "+").replace(/_/g, "/")
    const padLen = (4 - (padded.length % 4)) % 4
    const json = atob(padded + "=".repeat(padLen))
    return JSON.parse(json)
  } catch {
    return null
  }
}

// ─── ERC20 ABI (balanceOf only) ───
const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const

// ─── Cache-busting fetch (prevents CDN/edge caching of RPC responses) ───
// Date.now() is evaluated on EACH fetch call, not at wrapper creation
const noCacheFetch: typeof fetch = (input, init) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url
  const sep = url.includes("?") ? "&" : "?"
  const busted = `${url}${sep}x-timestamp=${Date.now()}`
  return fetch(busted, init)
}

// ─── EVM Client Cache ───
const clientCache = new Map<string, ReturnType<typeof createPublicClient>>()

function getEVMClient(chainKey: string, cfg: ChainConfig) {
  const cached = clientCache.get(chainKey)
  if (cached) return cached

  if (!cfg.viemChain) return null

  const transports = cfg.rpcs.map((rpc) => http(rpc, { timeout: 5000, retryCount: 0, fetch: noCacheFetch }))
  const client = createPublicClient({
    chain: cfg.viemChain,
    transport: fallback(transports, { rank: false }),
  })

  clientCache.set(chainKey, client)
  return client
}

// ─── Balance Checkers ───

export async function getUSDCBalance(chain: string, address: string): Promise<number> {
  const cfg = CHAINS[chain]
  if (!cfg) return 0

  try {
    switch (cfg.type) {
      case "evm": return await getEVMUSDCBalance(chain, cfg, address)
      case "solana": return await getSolanaUSDCBalance(cfg, address)
      case "tron": return await getTronUSDCBalance(cfg, address)
      case "ton": return await getTonUSDCBalance(cfg, address)
      case "polkadot": return await getPolkadotUSDCBalance(cfg, address)
      default: return 0
    }
  } catch {
    return 0
  }
}

async function getEVMUSDCBalance(chainKey: string, cfg: ChainConfig, address: string): Promise<number> {
  const client = getEVMClient(chainKey, cfg)
  if (!client) return 0

  const balance = await client.readContract({
    address: cfg.usdc as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  })

  return Number(formatUnits(balance, cfg.decimals))
}

async function getSolanaUSDCBalance(cfg: ChainConfig, address: string): Promise<number> {
  const resp = await fetchWithRotation(cfg.rpcs, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "getTokenAccountsByOwner",
      params: [address, { mint: cfg.usdc }, { encoding: "jsonParsed" }],
    }),
  })
  const json: any = await resp.json()
  const accounts = json.result?.value || []
  let total = 0
  for (const acc of accounts) {
    const info = acc.account?.data?.parsed?.info?.tokenAmount
    if (info) total += Number(info.uiAmount || 0)
  }
  return total
}

async function fetchWithRotation(rpcs: string[], init: RequestInit, timeoutMs = 5000): Promise<Response> {
  let lastErr: Error | null = null
  for (const rpc of rpcs) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeoutMs)
      const sep = rpc.includes("?") ? "&" : "?"
      const url = `${rpc}${sep}x-timestamp=${Date.now()}`
      const resp = await fetch(url, { ...init, signal: controller.signal })
      clearTimeout(timer)
      if (resp.ok) return resp
    } catch (e) {
      lastErr = e as Error
    }
  }
  throw lastErr || new Error("All RPCs failed")
}

async function getTronUSDCBalance(cfg: ChainConfig, address: string): Promise<number> {
  try {
    const url = cfg.rpcs[0] + "/wallet/triggerconstantcontract?x-timestamp=" + Date.now()
    const r = await noCacheFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner_address: address,
        contract_address: cfg.usdc,
        function_selector: "balanceOf(address)",
        parameter: address.padStart(64, "0"),
        visible: true,
      }),
    })
    const j: any = await r.json()
    if (j.constant_result?.[0]) {
      return Number(BigInt("0x" + j.constant_result[0])) / 1e6
    }
  } catch {}
  return 0
}

async function getTonUSDCBalance(cfg: ChainConfig, address: string): Promise<number> {
  try {
    const resp = await noCacheFetch(
      `https://tonapi.io/v2/accounts/${address}/jettons?currencies=usd&x-timestamp=${Date.now()}`,
      { headers: { "Accept": "application/json" } }
    )
    const j: any = await resp.json()
    const balances = j.balances || []
    for (const b of balances) {
      const symbol = b.jetton?.symbol || ""
      const jettonAddr = b.jetton?.address || ""
      if (symbol === "USDC" || jettonAddr === cfg.usdc) {
        return Number(b.balance) / 10 ** (b.jetton?.decimals || cfg.decimals)
      }
    }
  } catch {}
  return 0
}

async function getPolkadotUSDCBalance(cfg: ChainConfig, address: string): Promise<number> {
  try {
    const resp = await fetch("https://assethub-polkadot.api.subscan.io/api/v2/scan/account/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ address }),
    })
    const j: any = await resp.json()
    const assets = j.data?.assets || []
    const usdc = assets.find((a: any) => a.asset_symbol === "USDC" || a.asset_id === "1337")
    if (usdc) {
      const decimals = usdc.decimals || 6
      return Number(usdc.balance) / 10 ** decimals
    }
  } catch {}
  return 0
}

// ─── Formatters ───

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  if (n >= 1) return n.toFixed(2)
  if (n > 0) return "<0.01"
  return "0"
}

export function explorerLink(chain: string, address: string): string {
  const cfg = CHAINS[chain]
  if (!cfg) return "#"
  if (chain === "solana") return `${cfg.explorer}/account/${address}`
  if (chain === "tron") return `${cfg.explorer}/address/${address}`
  if (chain === "ton") return `${cfg.explorer}/address/${address}`
  if (chain === "polkadot") return `${cfg.explorer}/account/${address}`
  return `${cfg.explorer}/address/${address}`
}
