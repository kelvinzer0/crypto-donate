import { CHAINS, type DonateData, formatNumber, explorerLink } from "./chains"

interface Env {
  KV: KVNamespace
  DOMAIN: string
}

const npmCSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#ffffff;--bg-secondary:#fff5d8;--border:#f2f2f2;
  --text:#000000;--text-secondary:#666666;
  --accent:#cb3837;--secondary:#886701;
  --btn-bg:#231f20;--btn-text:#ffffff;
  --shadow-mid:rgba(0,0,0,0.12) 0px 2px 7px 0px;
  --shadow-high:rgba(0,0,0,0.1) 0px 4px 13px -3px;
  --radius:4px;--radius-btn:8px;
}
html{font-size:16px}
body{
  font-family:'Source Sans Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:var(--bg);color:var(--text);line-height:1.5;
  -webkit-font-smoothing:antialiased;
}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}

/* ─── Nav ─── */
.nav{
  background:var(--btn-bg);padding:0 24px;height:56px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:100;
}
.nav-brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:700;font-size:18px;text-decoration:none}
.nav-brand:hover{text-decoration:none;color:#fff}
.nav-brand svg{width:28px;height:28px}
.nav-links{display:flex;gap:24px;align-items:center}
.nav-links a{color:rgba(255,255,255,0.85);font-size:14px;font-weight:400}
.nav-links a:hover{color:#fff;text-decoration:none}

/* ─── Container ─── */
.container{max-width:1024px;margin:0 auto;padding:32px 24px}

/* ─── Hero ─── */
.hero{text-align:center;padding:48px 0 32px}
.hero h1{font-size:32px;font-weight:700;line-height:1.15;margin-bottom:8px;letter-spacing:-.02em}
.hero p{font-size:17px;color:var(--text-secondary);max-width:520px;margin:0 auto}

/* ─── Progress ─── */
.progress-card{
  background:var(--bg-secondary);border:1px solid var(--border);
  border-radius:var(--radius);padding:24px 32px;margin-bottom:32px;
  box-shadow:var(--shadow-mid);
}
.progress-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
.progress-raised{font-size:28px;font-weight:700;color:var(--accent)}
.progress-target{font-size:14px;color:var(--text-secondary)}
.progress-pct{font-size:14px;font-weight:700;color:var(--secondary)}
.progress-bar{height:8px;background:var(--border);border-radius:100px;overflow:hidden}
.progress-fill{
  height:100%;border-radius:100px;
  background:linear-gradient(90deg,var(--accent),var(--secondary));
  transition:width .6s ease;
}

/* ─── Actions ─── */
.actions{display:flex;gap:12px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.btn{
  display:inline-flex;align-items:center;gap:6px;
  font-family:inherit;font-size:14px;font-weight:700;
  border:none;cursor:pointer;border-radius:var(--radius-btn);
  padding:8px 20px;transition:all .15s;
}
.btn-primary{background:var(--btn-bg);color:var(--btn-text)}
.btn-primary:hover{opacity:.85}
.btn-outline{background:var(--bg);color:var(--text);border:1px solid var(--border)}
.btn-outline:hover{border-color:var(--accent);color:var(--accent)}

/* ─── Chain Grid ─── */
.chain-section h2{font-size:19px;font-weight:600;margin-bottom:16px}
.chain-grid{display:grid;grid-template-columns:1fr;gap:16px}
.chain-card{
  background:var(--bg);border:1px solid var(--border);
  border-radius:var(--radius);padding:20px 24px;
  transition:box-shadow .2s,border-color .2s;
}
.chain-card:hover{box-shadow:var(--shadow-high);border-color:#ddd}
.chain-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.chain-name{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px}
.chain-icon{
  width:32px;height:32px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;background:var(--bg-secondary);border:1px solid var(--border);
}
.chain-icon img{width:28px;height:28px;border-radius:50%;object-fit:cover}
.chain-balance{font-weight:700;font-size:15px}
.chain-balance.ok{color:var(--secondary)}
.chain-balance.zero{color:var(--text-secondary)}
.addr-row{display:flex;gap:8px;align-items:center}
.addr{
  flex:1;font-family:'SF Mono',Monaco,Consolas,'Courier New',monospace;
  font-size:13px;color:var(--text-secondary);background:var(--bg);
  padding:8px 12px;border-radius:var(--radius);
  border:1px solid var(--border);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.btn-copy{
  background:var(--btn-bg);color:var(--btn-text);border:none;
  border-radius:var(--radius-btn);padding:8px 16px;
  font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;
  transition:opacity .15s;white-space:nowrap;
}
.btn-copy:hover{opacity:.85}
.btn-ext{
  background:var(--bg);color:var(--text);border:1px solid var(--border);
  border-radius:var(--radius-btn);padding:8px 10px;
  font-size:14px;cursor:pointer;text-decoration:none;
  display:flex;align-items:center;
}
.btn-ext:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}
.qr-toggle{
  display:block;margin-top:8px;background:none;border:none;
  color:var(--text-secondary);cursor:pointer;font-size:13px;
  font-family:inherit;padding:0;
}
.qr-toggle:hover{color:var(--accent)}
.qr-wrap{text-align:center;margin-top:12px;display:none}
.qr-wrap img{border-radius:var(--radius);border:1px solid var(--border)}

/* ─── Badge ─── */
.badge-section{text-align:center;padding:24px 0}
.badge-section img{height:28px}

/* ─── Footer ─── */
.footer{
  text-align:center;padding:32px 0;margin-top:48px;
  border-top:1px solid var(--border);color:var(--text-secondary);font-size:13px;
}
.footer a{color:var(--accent)}

/* ─── Sidebar ─── */
.sidebar-card{
  background:var(--bg);border:1px solid var(--border);
  border-radius:var(--radius);padding:20px;
  margin-bottom:16px;
}
.sidebar-card h3{font-size:14px;font-weight:700;margin-bottom:12px;color:var(--text)}
.stat-row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;border-bottom:1px solid var(--border)}
.stat-row:last-child{border-bottom:none}
.stat-label{color:var(--text-secondary)}
.stat-value{font-weight:600}

/* ─── Responsive ─── */
@media(max-width:640px){
  .container{padding:16px}
  .hero h1{font-size:24px}
  .hero p{font-size:15px}
  .progress-card{padding:16px}
  .progress-raised{font-size:22px}
  .addr{font-size:11px;padding:6px 8px}
  .chain-card{padding:16px}
  .sidebar{margin-top:24px}
}

/* ─── Desktop sidebar layout ─── */
@media(min-width:768px){
  .content-grid{display:grid;grid-template-columns:1fr 280px;gap:32px;align-items:start}
  .sidebar{position:sticky;top:72px}
}
`

export function renderDonatePage(data: DonateData, base64: string, balances: Record<string, number>) {
  const total = Object.values(balances).reduce((s, v) => s + v, 0)
  const pct = data.target > 0 ? Math.min(100, (total / data.target) * 100) : 0
  const title = data.title || "Support This Project"
  const desc = data.desc || "Every contribution helps."
  const entries = Object.entries(data.addresses).filter(([chain]) => CHAINS[chain])
  const chainCount = entries.length

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — Crypto Donate</title>
<meta name="description" content="${desc}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="Goal: ${data.target} USDC · ${formatNumber(total)} raised (${pct.toFixed(1)}%) · Join Discord for Contributor role"/>
<meta property="og:image" content="/${base64}/badge"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
<style>${npmCSS}</style>
</head>
<body>

<nav class="nav">
  <a href="/" class="nav-brand"><i class="fas fa-cube"></i> Crypto Donate</a>
  <div class="nav-links">
    <a href="/">Create</a>
    <a href="/${base64}/stats" target="_blank">API</a>
    ${data.discord ? `<a href="${escHtml(data.discord)}" target="_blank" style="color:#5865F2"><i class="fab fa-discord"></i> Discord</a>` : ""}
  </div>
</nav>

<div class="container">
  <div class="hero">
    <h1>${escHtml(title)}</h1>
    <p>${escHtml(desc)}</p>
  </div>

  <div class="progress-card">
    <div class="progress-header">
      <div>
        <span class="progress-raised"><img src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png" alt="USDC" width="20" height="20" style="vertical-align:middle;border-radius:50%;margin-right:4px"/>${formatNumber(total)} USDC</span>
        <span class="progress-target"> of ${formatNumber(data.target)} goal</span>
      </div>
      <span class="progress-pct">${pct.toFixed(1)}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${pct}%"></div>
    </div>
  </div>

  <div class="actions">
    <button class="btn btn-primary" onclick="copyLink(this)"><i class="fas fa-link"></i> Copy Link</button>
    <button class="btn btn-outline" onclick="window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent('${escHtml(title)} — Membership Moral')+'&url='+encodeURIComponent(location.href),'_blank')"><i class="fab fa-x-twitter"></i> Share on X</button>
    <a href="/${base64}/stats" target="_blank" class="btn btn-outline" style="text-decoration:none"><i class="fas fa-chart-bar"></i> Stats API</a>
  </div>

  <div class="content-grid">
    <div class="main-content">
      <div class="chain-section">
        <h2>Membership · ${chainCount} chain${chainCount > 1 ? "s" : ""}</h2>
        <div class="chain-grid">
          ${entries.map(([chain, addr]) => {
            const cfg = CHAINS[chain]
            const bal = balances[chain] || 0
            return `
            <div class="chain-card">
              <div class="chain-top">
                <div class="chain-name">
                  <span class="chain-icon"><img src="${cfg.iconPath}" alt="${cfg.name}" width="28" height="28"/></span>
                  <span>${cfg.name}</span>
                </div>
                <span class="chain-balance${bal > 0 ? " ok" : " zero"}">${formatNumber(bal)} USDC</span>
              </div>
              <div class="addr-row">
                <div class="addr" title="${addr}">${addr}</div>
                <button class="btn-copy" onclick="copyAddr(this,'${addr}')"><i class="fas fa-copy"></i> Copy</button>
                <a href="${explorerLink(chain, addr)}" target="_blank" class="btn-ext" title="View on explorer"><i class="fas fa-arrow-up-right-from-square"></i></a>
              </div>
              <button class="qr-toggle" onclick="toggleQR(this)"><i class="fas fa-qrcode"></i> Show QR Code</button>
              <div class="qr-wrap">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(chain === 'solana' || chain === 'tron' ? addr : 'ethereum:' + addr)}" alt="QR" width="180" height="180"/>
              </div>
            </div>`
          }).join("\n")}
        </div>
      </div>
    </div>

    <div class="sidebar">
      ${data.discord ? `<div class="sidebar-card" style="border-color:#5865F2;background:linear-gradient(135deg,rgba(88,101,242,0.05),rgba(88,101,242,0.02))">
        <h3><i class="fab fa-discord" style="color:#5865F2"></i> Discord</h3>
        <p style="font-size:14px;margin-bottom:12px">Join our Discord and <strong>claim your Contributor role</strong> to get recognized for your support.</p>
        <a href="${escHtml(data.discord)}" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;justify-content:center;background:#5865F2;text-decoration:none"><i class="fab fa-discord"></i> Join Discord & Claim Role</a>
      </div>` : ""}
      <div class="sidebar-card">
        <h3><i class="fas fa-info-circle"></i> Details</h3>
        <div class="stat-row"><span class="stat-label">Target</span><span class="stat-value">${formatNumber(data.target)} USDC</span></div>
        <div class="stat-row"><span class="stat-label">Raised</span><span class="stat-value">${formatNumber(total)} USDC</span></div>
        <div class="stat-row"><span class="stat-label">Progress</span><span class="stat-value">${pct.toFixed(1)}%</span></div>
        <div class="stat-row"><span class="stat-label">Chains</span><span class="stat-value">${chainCount}</span></div>
      </div>
      <div class="sidebar-card">
        <h3><i class="fas fa-code"></i> Embed Badge</h3>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">Add to your README:</p>
        <div class="addr" style="font-size:11px;word-break:break-all;white-space:normal;padding:8px">
          [![${title}](https://your-domain.com/${base64}/badge)](https://your-domain.com/${base64})
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <p><a href="/">Crypto Donate</a> — Open source, no fees, no middleman. Membership goes directly to wallet addresses.</p>
  </div>
</div>
<script>
function copyAddr(btn,addr){navigator.clipboard.writeText(addr).then(function(){btn.innerHTML='<i class="fas fa-check"></i> Copied!';setTimeout(function(){btn.innerHTML='<i class="fas fa-copy"></i> Copy'},1500)})}
function copyLink(btn){navigator.clipboard.writeText(location.href).then(function(){btn.innerHTML='<i class="fas fa-check"></i> Copied!';setTimeout(function(){btn.innerHTML='<i class="fas fa-link"></i> Copy Link'},1500)})}
function toggleQR(btn){var w=btn.nextElementSibling;w.style.display=w.style.display==='block'?'none':'block';btn.innerHTML=w.style.display==='block'?'<i class="fas fa-qrcode"></i> Hide QR Code':'<i class="fas fa-qrcode"></i> Show QR Code'}
</script>
</body>
</html>`
}

export function renderGeneratorPage(domain: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Crypto Donate — Create Membership Moral Page</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
<style>
${npmCSS}

/* ─── Generator specific ─── */
.form-card{
  background:var(--bg);border:1px solid var(--border);
  border-radius:var(--radius);padding:32px;
  box-shadow:var(--shadow-mid);max-width:640px;margin:0 auto;
}
.field{margin-bottom:20px}
.field label{display:block;font-weight:700;font-size:14px;margin-bottom:6px;color:var(--text)}
.field input,.field textarea,.field select{
  width:100%;background:var(--bg);border:1px solid var(--border);
  border-radius:var(--radius);padding:10px 12px;color:var(--text);
  font-family:inherit;font-size:15px;transition:border-color .15s;
}
.field input:focus,.field textarea:focus,.field select:focus{outline:none;border-color:var(--accent)}
.field textarea{resize:vertical;min-height:64px}
.field .hint{font-size:13px;color:var(--text-secondary);margin-top:4px}

.chain-addr{
  display:grid;grid-template-columns:130px 1fr auto;gap:8px;
  align-items:start;margin-bottom:8px;
}
.chain-addr select{
  background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);
  padding:10px 8px;color:var(--text);font-family:inherit;font-size:14px;
}
.chain-addr input{
  background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);
  padding:10px 12px;color:var(--text);font-family:'SF Mono',Monaco,Consolas,'Courier New',monospace;font-size:13px;
}
.chain-addr input:focus{outline:none;border-color:var(--accent)}
.chain-addr button{
  background:none;border:1px solid var(--border);color:var(--text-secondary);
  border-radius:var(--radius);padding:10px;cursor:pointer;font-size:14px;
  transition:all .15s;
}
.chain-addr button:hover{border-color:var(--accent);color:var(--accent)}
.row-err{color:var(--accent);font-size:12px;margin-top:2px;grid-column:1/-1}

.add-chain-btn{
  width:100%;background:var(--bg);border:1px dashed var(--border);
  color:var(--text-secondary);border-radius:var(--radius);
  padding:10px;cursor:pointer;font-family:inherit;font-size:14px;
  margin-bottom:24px;transition:all .15s;
}
.add-chain-btn:hover{border-color:var(--accent);color:var(--accent)}

.gen-btn{
  width:100%;background:var(--accent);color:#fff;border:none;
  border-radius:var(--radius-btn);padding:12px;
  font-family:inherit;font-size:16px;font-weight:700;
  cursor:pointer;transition:opacity .15s;
}
.gen-btn:hover{opacity:.85}

.result-card{
  display:none;margin-top:24px;background:var(--bg-secondary);
  border:1px solid var(--border);border-radius:var(--radius);padding:20px;
}
.result-card.show{display:block}
.result-card label{font-size:13px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:6px}
.result-url{
  width:100%;background:var(--bg);border:1px solid var(--border);
  border-radius:var(--radius);padding:10px 12px;color:var(--accent);
  font-family:'SF Mono',Monaco,Consolas,'Courier New',monospace;font-size:13px;
  word-break:break-all;
}
.result-actions{display:flex;gap:8px;margin-top:12px}
.result-actions .btn{flex:1;justify-content:center}

.features{
  display:grid;grid-template-columns:repeat(3,1fr);gap:16px;
  margin-top:48px;max-width:640px;margin-left:auto;margin-right:auto;
}
.feature{
  text-align:center;padding:20px 12px;
  border:1px solid var(--border);border-radius:var(--radius);
}
.feature-icon{font-size:24px;margin-bottom:8px}
.feature h3{font-size:14px;font-weight:700;margin-bottom:4px}
.feature p{font-size:13px;color:var(--text-secondary)}

@media(max-width:640px){
  .chain-addr{grid-template-columns:1fr;gap:4px}
  .features{grid-template-columns:1fr}
}
</style>
</head>
<body>

<nav class="nav">
  <a href="/" class="nav-brand"><i class="fas fa-cube"></i> Crypto Donate</a>
  <div class="nav-links">
    <a href="/">Create</a>
  </div>
</nav>

<div class="container">
  <div class="hero">
    <h1>Create a Membership Moral Page</h1>
    <p>Multi-chain USDC membership. No fees, no middleman — direct moral support with on-chain transparency.</p>
  </div>

  <div class="form-card">
    <div class="field">
      <label>Title</label>
      <input id="title" placeholder="e.g. Help Build My Project" maxlength="120"/>
    </div>
    <div class="field">
      <label>Description</label>
      <textarea id="desc" placeholder="A short message about your fundraising goal" maxlength="300"></textarea>
    </div>
    <div class="field">
      <label>Target Amount (USDC)</label>
      <input id="target" type="number" min="1" placeholder="1000" value="1000"/>
      <div class="hint">The goal amount for your membership</div>
    </div>
    <div class="field">
      <label>Discord Invite Link</label>
      <input id="discord" placeholder="https://discord.gg/your-invite"/>
      <div class="hint">Members will be directed here to claim their Contributor role</div>
    </div>
    <div class="field">
      <label>Wallet Addresses</label>
      <div id="addresses"></div>
      <button class="add-chain-btn" onclick="addRow()">+ Add Another Chain</button>
    </div>
    <button class="gen-btn" onclick="generate()">Generate Membership Link →</button>

    <div id="result" class="result-card">
      <label>Your membership link</label>
      <div class="result-url" id="resultUrl"></div>
      <div class="result-actions">
        <button class="btn btn-primary" onclick="copyGenLink(this)"><i class="fas fa-link"></i> Copy Link</button>
        <button class="btn btn-outline" onclick="window.open(document.getElementById('resultUrl').textContent,'_blank')"><i class="fas fa-arrow-up-right-from-square"></i> Open</button>
      </div>
      <div style="text-align:center;margin-top:12px">
        <img id="badgePreview" style="height:28px" alt="badge preview"/>
      </div>
    </div>
  </div>

  <div class="features">
    <div class="feature"><div class="feature-icon"><i class="fas fa-link" style="color:var(--accent)"></i></div><h3>9 Chains</h3><p>Ethereum, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche, Solana, Tron</p></div>
    <div class="feature"><div class="feature-icon"><i class="fas fa-chart-line" style="color:var(--accent)"></i></div><h3>Live Tracking</h3><p>Real-time on-chain USDC balance via public RPCs</p></div>
    <div class="feature"><div class="feature-icon"><i class="fab fa-discord" style="color:var(--accent)"></i></div><h3>Discord Roles</h3><p>Members claim Contributor role automatically</p></div>
  </div>

  <div class="footer">
    <p>Crypto Donate — Open source, no fees, no middleman</p>
  </div>
</div>

<script>
const CHAINS=${JSON.stringify(Object.entries(CHAINS).map(([k,v])=>({id:k,name:v.name,faIcon:v.faIcon,iconPath:v.iconPath,color:v.color})))};
const EVM_CHAINS=new Set(["ethereum","polygon","arbitrum","optimism","base","bsc","avalanche"]);
function validateAddr(chain,addr){
  if(!chain||!addr)return{ok:false,msg:"Required"};
  if(chain==="solana"){if(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr))return{ok:true};return{ok:false,msg:"Invalid Solana address (base58, 32-44 chars)"};}
  if(chain==="tron"){if(/^T[a-zA-Z0-9]{33}$/.test(addr))return{ok:true};return{ok:false,msg:"Invalid Tron address (starts with T, 34 chars)"};}
  if(chain==="ton"){if(/^(EQ|UQ|EQA|UQA)[A-Za-z0-9_-]{40,50}$/.test(addr))return{ok:true};return{ok:false,msg:"Invalid TON address (EQ/UQ + 40-50 chars)"};}
  if(chain==="polkadot"){if(/^[1-9A-HJ-NP-Za-km-z]{47,48}$/.test(addr))return{ok:true};return{ok:false,msg:"Invalid Polkadot address (SS58, 47-48 chars)"};}
  if(EVM_CHAINS.has(chain)){if(/^0x[0-9a-fA-F]{40}$/.test(addr))return{ok:true};return{ok:false,msg:"Invalid EVM address (0x + 40 hex chars)"};}
  return{ok:true};
}
let rowIdx=0;
function addRow(addr){
  const d=document.createElement("div");d.className="chain-addr";d.id="row"+rowIdx;
  d.innerHTML='<select onchange="validateRow(this.parentElement)"><option value="">Select chain</option>'+CHAINS.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join("")+'</select><input placeholder="Wallet address" value="'+(addr||'')+'" oninput="validateRow(this.parentElement)"/><button onclick="this.parentElement.remove()"><i class="fas fa-xmark"></i></button><div class="row-err" style="display:none"></div>';
  document.getElementById("addresses").appendChild(d);rowIdx++;
}
function validateRow(row){
  const chain=row.querySelector("select").value;
  const addr=row.querySelector("input").value.trim();
  const errDiv=row.querySelector(".row-err");
  const input=row.querySelector("input");
  if(!chain&&!addr){errDiv.style.display="none";input.style.borderColor="var(--border)";return true;}
  const v=validateAddr(chain,addr);
  if(!v.ok&&addr){errDiv.textContent="⚠ "+v.msg;errDiv.style.display="block";input.style.borderColor="var(--accent)";return false;}
  errDiv.style.display="none";input.style.borderColor=v.ok&&addr?"#00b894":"var(--border)";return v.ok;
}
addRow();
function copyGenLink(btn){navigator.clipboard.writeText(document.getElementById('resultUrl').textContent).then(function(){btn.innerHTML='<i class="fas fa-check"></i> Copied!';setTimeout(function(){btn.innerHTML='<i class="fas fa-link"></i> Copy Link'},1500)})}
function generate(){
  const title=document.getElementById("title").value.trim();
  const desc=document.getElementById("desc").value.trim();
  const target=parseFloat(document.getElementById("target").value)||1000;
  const rows=document.querySelectorAll(".chain-addr");
  const addresses={};let hasError=false;
  rows.forEach(r=>{
    const chain=r.querySelector("select").value;
    const addr=r.querySelector("input").value.trim();
    const errDiv=r.querySelector(".row-err");
    if(chain&&!addr){hasError=true;errDiv.textContent="⚠ Address required";errDiv.style.display="block";r.querySelector("input").style.borderColor="var(--accent)";return;}
    if(chain&&addr){
      const v=validateAddr(chain,addr);
      if(!v.ok){hasError=true;errDiv.textContent="⚠ "+v.msg;errDiv.style.display="block";r.querySelector("input").style.borderColor="var(--accent)";return;}
      if(addresses[chain]){hasError=true;errDiv.textContent="⚠ Duplicate: "+chain;errDiv.style.display="block";return;}
      addresses[chain]=addr;
    }
  });
  if(hasError)return;
  if(Object.keys(addresses).length===0){alert("Add at least one chain with a wallet address");return;}
  const discord=document.getElementById("discord").value.trim();
  const data={title,desc,target,addresses,discord:discord||undefined};
  const b64=btoa(JSON.stringify(data)).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,"");
  const url=location.origin+"/"+b64;
  document.getElementById("resultUrl").textContent=url;
  document.getElementById("result").classList.add("show");
  document.getElementById("badgePreview").src=url+"/badge";
}
</script>
</body>
</html>`
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
