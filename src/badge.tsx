import { CHAINS, type DonateData, formatNumber } from "./chains"

export function renderBadge(data: DonateData, balances: Record<string, number>, theme: string = "light"): string {
  const total = Object.values(balances).reduce((s, v) => s + v, 0)
  const pct = data.target > 0 ? Math.min(100, (total / data.target) * 100) : 0
  const title = data.title || "Donation"
  const filled = pct / 100

  const bg = theme === "dark" ? "#231f20" : "#ffffff"
  const border = theme === "dark" ? "#444" : "#f2f2f2"
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const mutedColor = theme === "dark" ? "#aaa" : "#666666"
  const barBg = theme === "dark" ? "#444" : "#f2f2f2"
  const width = 360
  const height = 64

  const iconSize = 14
  const iconX = width - 16 - iconSize
  const iconY = 22 - iconSize + 2
  const textEndX = iconX - 4
  const usdcIconUrl = "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png"

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
  <linearGradient id="npmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:#cb3837"/>
    <stop offset="100%" style="stop-color:#886701"/>
  </linearGradient>
  <clipPath id="usdcClip">
    <circle cx="${iconX + iconSize / 2}" cy="${iconY + iconSize / 2}" r="${iconSize / 2}"/>
  </clipPath>
</defs>
<rect width="${width}" height="${height}" rx="4" fill="${bg}" stroke="${border}" stroke-width="1"/>
<text x="16" y="22" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="13" font-weight="700" fill="${textColor}">${escapeXml(title)}</text>
<text x="${textEndX}" y="22" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#cb3837" text-anchor="end">${formatNumber(total)}/${formatNumber(data.target)} USDC</text>
<image x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" href="${usdcIconUrl}" clip-path="url(#usdcClip)"/>
<rect x="16" y="34" width="${width - 32}" height="6" rx="3" fill="${barBg}"/>
<rect x="16" y="34" width="${(width - 32) * filled}" height="6" rx="3" fill="url(#npmGrad)"/>
<text x="16" y="54" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="11" fill="${mutedColor}">${pct.toFixed(1)}% funded · ${Object.keys(data.addresses).filter(k=>CHAINS[k]).length} chains</text>
<text x="${width - 16}" y="54" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="11" fill="${mutedColor}" text-anchor="end">crypto-donate</text>
</svg>`
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
