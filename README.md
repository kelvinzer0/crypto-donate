# ⚡ Crypto Donate

Multi-chain USDC donation platform on Cloudflare Workers. Simple, elegant, no middleman.

## Features

- **9 chains**: Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, Solana, Tron
- **Live balance tracking** — reads on-chain USDC balances via public RPCs
- **Embeddable badge** — SVG progress badge for READMEs
- **Stats API** — JSON endpoint for programmatic access
- **Generator page** — form to create donation links
- **Zero fees** — no platform, no middleman, donations go directly to your wallets

## Routes

| Route | Description |
|-------|-------------|
| `/` | Generator — input wallets + target, get a link |
| `/{base64}` | Donation page with QR codes + live balances |
| `/{base64}/stats` | JSON stats API |
| `/{base64}/badge` | SVG progress badge |

## Data Format

The `{base64}` is a URL-safe Base64 encoded JSON:

```json
{
  "title": "Help Build My Project",
  "desc": "A short description",
  "target": 5000,
  "addresses": {
    "ethereum": "0x...",
    "polygon": "0x...",
    "base": "0x...",
    "solana": "...",
    "tron": "..."
  }
}
```

## Badge Usage

```markdown
![Donation Progress](https://your-domain.com/{base64}/badge)
```

Options: `?theme=light` for light theme.

## Setup

```bash
npm install

# Create KV namespace
npx wrangler kv namespace create KV

# Update wrangler.toml with the KV ID

# Deploy
npx wrangler deploy
```

## Local Dev

```bash
npx wrangler dev
```

## Supported Chains

| Chain | USDC Contract |
|-------|--------------|
| Ethereum | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |
| Polygon | `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` |
| Arbitrum | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` |
| Optimism | `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` |
| Base | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| BSC | `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d` |
| Avalanche | `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E` |
| Solana | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
| Tron | `TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8` |

## License

MIT
