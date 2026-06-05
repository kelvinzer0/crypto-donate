// Chain configurations for USDC
export interface ChainConfig {
  name: string
  symbol: string
  usdc: string           // USDC contract address
  rpc: string            // Public RPC endpoint
  explorer: string       // Block explorer URL
  explorerApi?: string   // API for balance checking
  color: string          // Brand color
  faIcon: string         // Font Awesome class (fallback)
  iconPath: string       // Path to chain icon image
  decimals: number       // USDC decimals (6 for most)
  native: boolean        // Is native token (like SOL)
}

export const CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    rpc: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io",
    color: "#627EEA",
    faIcon: "fab fa-ethereum",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png",
    decimals: 6,
    native: false,
  },
  polygon: {
    name: "Polygon",
    symbol: "MATIC",
    usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
    color: "#8247E5",
    faIcon: "fas fa-shield-halved",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/matic.png",
    decimals: 6,
    native: false,
  },
  arbitrum: {
    name: "Arbitrum",
    symbol: "ETH",
    usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io",
    color: "#28A0F0",
    faIcon: "fas fa-circle-nodes",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImFyYiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzI4QTBGMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzIwNjBBMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjYwIiBmaWxsPSJ1cmwoI2FyYikiLz48cGF0aCBkPSJNMzggODhWNTZsMjUgNDRoOFY0NGgtOHYzMkwzOCA0NGgtOHY0NGg4em01MiAwVjU2bC0yNSA0NGgtOFY0NGg4djMybDI1LTMyaDh2NDRoLTh6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjk1Ii8+PC9zdmc+Cg==",
    decimals: 6,
    native: false,
  },
  optimism: {
    name: "Optimism",
    symbol: "ETH",
    usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    rpc: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io",
    color: "#FF0420",
    faIcon: "fas fa-circle",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im9wIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkYwNDIwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0MwMDE4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNjAiIGZpbGw9InVybCgjb3ApIi8+PGNpcmNsZSBjeD0iNjQiIGN5PSI1NiIgcj0iMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI4Ii8+PGNpcmNsZSBjeD0iNjQiIGN5PSI1NiIgcj0iOCIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00NCA4Mmg0MHY4SDQ0eiIgcng9IjQiIGZpbGw9IiNmZmYiLz48L3N2Zz4K",
    decimals: 6,
    native: false,
  },
  base: {
    name: "Base",
    symbol: "ETH",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    color: "#0052FF",
    faIcon: "fas fa-diamond",
    iconPath: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJhc2UiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDUyRkYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDNBQ0MiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI2MCIgZmlsbD0idXJsKCNiYXNlKSIvPjxwYXRoIGQ9Ik02NCAzMGMxOC44IDAgMzQgMTUuMiAzNCAzNHMtMTUuMiAzNC0zNCAzNC0zNC0xNS4yLTM0LTM0IDE1LjItMzQgMzQtMzR6bTAgMTRjLTExIDAtMjAgOS0yMCAyMHM5IDIwIDIwIDIwIDIwLTkgMjAtMjAtOS0yMC0yMC0yMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjQgNDh2MzJNNDggNjRoMzIiIHN0cm9rZT0iIzAwNTJGRiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K",
    decimals: 6,
    native: false,
  },
  bsc: {
    name: "BNB Chain",
    symbol: "BNB",
    usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    rpc: "https://bsc-dataseed.binance.org",
    explorer: "https://bscscan.com",
    color: "#F3BA2F",
    faIcon: "fab fa-btc",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png",
    decimals: 18,
    native: false,
  },
  avalanche: {
    name: "Avalanche",
    symbol: "AVAX",
    usdc: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io",
    color: "#E84142",
    faIcon: "fas fa-mountain-sun",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png",
    decimals: 6,
    native: false,
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    usdc: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    rpc: "https://api.mainnet-beta.solana.com",
    explorer: "https://solscan.io",
    color: "#9945FF",
    faIcon: "fas fa-sun",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png",
    decimals: 6,
    native: true,
  },
  tron: {
    name: "Tron",
    symbol: "TRX",
    usdc: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8", // USDC on Tron
    rpc: "https://api.trongrid.io",
    explorer: "https://tronscan.org",
    color: "#FF0013",
    faIcon: "fas fa-bolt",
    iconPath: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/trx.png",
    decimals: 6,
    native: true,
  },
}

export interface DonateData {
  title?: string
  desc?: string
  target: number
  currency?: string
  addresses: Record<string, string>
  logo?: string
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

export async function getUSDCBalance(chain: string, address: string): Promise<number> {
  const cfg = CHAINS[chain]
  if (!cfg) return 0

  try {
    if (chain === "solana") {
      return await getSolanaUSDCBalance(address)
    }
    if (chain === "tron") {
      return await getTronUSDCBalance(address)
    }
    return await getEVMUSDCBalance(cfg, address)
  } catch {
    return 0
  }
}

async function getEVMUSDCBalance(cfg: ChainConfig, address: string): Promise<number> {
  // balanceOf(address) = 0x70a08231 + padded address
  const data = "0x70a08231" + address.slice(2).padStart(64, "0")

  const resp = await fetch(cfg.rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to: cfg.usdc, data }, "latest"],
    }),
  })

  const json: any = await resp.json()
  if (!json.result || json.result === "0x") return 0
  const raw = BigInt(json.result)
  return Number(raw) / 10 ** cfg.decimals
}

async function getSolanaUSDCBalance(address: string): Promise<number> {
  const resp = await fetch("https://api.mainnet-beta.solana.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenAccountsByOwner",
      params: [
        address,
        { mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
        { encoding: "jsonParsed" },
      ],
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

async function getTronUSDCBalance(address: string): Promise<number> {
  // Tron uses a different API - check via trc20 balance
  const resp = await fetch(
    `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?limit=1&only_confirmed=true`
  )
  // For Tron we'd need a proper API key for reliable balance checking
  // This is a simplified version
  try {
    const data = JSON.stringify({
      owner_address: address,
      contract_address: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
      function_selector: "balanceOf(address)",
      parameter: address.padStart(64, "0"),
      visible: true,
    })
    const r = await fetch("https://api.trongrid.io/wallet/triggerconstantcontract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
    const j: any = await r.json()
    if (j.constant_result?.[0]) {
      const raw = BigInt("0x" + j.constant_result[0])
      return Number(raw) / 1e6
    }
  } catch {}
  return 0
}

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
  return `${cfg.explorer}/address/${address}`
}
