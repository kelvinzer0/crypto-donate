import { CHAINS, type DonateData, formatNumber } from "./chains"

// Inline USDC icon from spothq/cryptocurrency-icons (simplified, no filters)
function usdcIconSVG(x: number, y: number, size: number): string {
  const s = size / 32 // scale factor (original is 32x32)
  return `<g transform="translate(${x},${y}) scale(${s})">
  <circle cx="16" cy="15" r="15" fill="#3E73C4"/>
  <circle cx="16" cy="15" r="14.5" fill="none" stroke="#FFF" stroke-opacity=".15"/>
  <g fill="#FFF">
    <path d="M20.022 17.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V8.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V20.34c1.829-.303 3.047-1.578 3.047-3.217z"/>
    <path d="M12.892 23.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z"/>
  </g>
</g>`
}

export function renderBadge(data: DonateData, balances: Record<string, number>, theme: string = "light"): string {
  const total = Object.values(balances).reduce((s, v) => s + v, 0)
  const pct = data.target > 0 ? Math.min(100, (total / data.target) * 100) : 0
  const title = data.title || "Membership"
  const filled = pct / 100

  const bg = theme === "dark" ? "#231f20" : "#ffffff"
  const border = theme === "dark" ? "#444" : "#f2f2f2"
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const mutedColor = theme === "dark" ? "#aaa" : "#666666"
  const barBg = theme === "dark" ? "#444" : "#f2f2f2"
  const width = 360
  const height = 64

  const iconSize = 14
  const valueText = `${formatNumber(total)}/${formatNumber(data.target)}`
  // Estimate text width (~7.2px per char at font-size 13)
  const textWidthEst = valueText.length * 7.2
  const groupWidth = iconSize + 4 + textWidthEst
  const iconX = width - 16 - groupWidth
  const iconY = 22 - iconSize + 2
  const textX = iconX + iconSize + 4

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
  <linearGradient id="npmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:#cb3837"/>
    <stop offset="100%" style="stop-color:#886701"/>
  </linearGradient>
</defs>
<rect width="${width}" height="${height}" rx="4" fill="${bg}" stroke="${border}" stroke-width="1"/>
<text x="16" y="22" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="13" font-weight="700" fill="${textColor}">${escapeXml(title)}</text>
${usdcIconSVG(iconX, iconY, iconSize)}
<text x="${textX}" y="22" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#cb3837">${valueText}</text>
<rect x="16" y="34" width="${width - 32}" height="6" rx="3" fill="${barBg}"/>
<rect x="16" y="34" width="${(width - 32) * filled}" height="6" rx="3" fill="url(#npmGrad)"/>
<text x="16" y="54" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="11" fill="${mutedColor}">${pct.toFixed(1)}% achieved · ${Object.keys(data.addresses).filter(k=>CHAINS[k]).length} chains</text>
<text x="${width - 16}" y="54" font-family="Source Sans Pro, -apple-system, sans-serif" font-size="11" fill="${mutedColor}" text-anchor="end">membership moral</text>
</svg>`
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
