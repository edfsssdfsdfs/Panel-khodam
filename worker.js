const HTML = "<!doctype html><html lang=\"fa\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Dev Panel</title><style>\n:root{--bg:#eef4fb;--card:#fff;--tx:#0f1b3d;--mut:#64708a;--bd:#d6e0ef;--pri:#1677ff;--bad:#dc2626}\n@media(prefers-color-scheme:dark){:root{--bg:#0b1220;--card:#111a2e;--tx:#e6ecf8;--mut:#93a0ba;--bd:#24304a}}\n*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font-family:Tahoma,system-ui,sans-serif}\nheader{display:flex;align-items:center;gap:8px;padding:12px 14px;background:var(--card);border-bottom:1px solid var(--bd);position:sticky;top:0;z-index:5}\nheader h1{font-size:17px;margin:0;flex:1}\n.tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 14px;max-width:760px;margin:auto}\n.tab{padding:8px 14px;border-radius:12px;border:1px solid var(--bd);background:var(--card);color:var(--tx);white-space:nowrap;cursor:pointer;font:inherit}\n.tab.on{background:var(--pri);color:#fff;border-color:var(--pri)}\nmain{padding:0 14px 40px;max-width:760px;margin:auto}\n.card{background:var(--card);border:1px solid var(--bd);border-radius:18px;padding:14px;margin-bottom:12px}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}.grid .card{margin:0}\n.big{font-size:24px;font-weight:700;margin-top:6px}.mut{color:var(--mut);font-size:13px}\n.btn{background:linear-gradient(90deg,#1677ff,#18d6c9);color:#fff;border:0;border-radius:12px;padding:10px 16px;font:inherit;cursor:pointer}\n.btn.s{background:var(--card);color:var(--tx);border:1px solid var(--bd);padding:7px 11px;font-size:13px}.btn.d{color:var(--bad)}\ninput{width:100%;padding:11px;border-radius:12px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font:inherit;margin:4px 0 10px}\n.bar{height:7px;border-radius:9px;background:var(--bd);overflow:hidden;margin:8px 0}.bar i{display:block;height:100%;background:var(--pri)}\n.row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}\n.badge{font-size:12px;padding:2px 8px;border-radius:9px;background:var(--bd)}\n.modal{position:fixed;inset:0;background:#0007;display:flex;align-items:center;justify-content:center;padding:16px;z-index:9}.modal .card{width:100%;max-width:420px;margin:0}\n.login{max-width:360px;margin:20vh auto 0}\n</style></head><body><div id=\"app\"></div><script>\nvar $=function(s){return document.querySelector(s)};\nfunction esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]})}\nfunction api(path,method,body){return fetch('/api'+path,{method:method||'GET',headers:{'content-type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){if(r.status===401&&path!=='/login'){login();throw new Error('auth')}return r.json().then(function(j){if(!r.ok)throw new Error(j.error||'خطا');return j})})}\nfunction gb(b){return (b/1073741824).toFixed(2)+' GB'}\nvar tab='dash';\nvar TABS=[['dash','داشبورد'],['users','کاربران'],['locs','لوکیشن‌ها'],['bak','پشتیبان‌گیری']];\nfunction login(){$('#app').innerHTML='<div class=\"card login\"><h3>ورود به پنل</h3><input id=\"pw\" type=\"password\" placeholder=\"رمز عبور\"><button class=\"btn\" id=\"go\">ورود</button><p class=\"mut\" id=\"err\"></p></div>';\n $('#go').onclick=function(){api('/login','POST',{password:$('#pw').value}).then(shell).catch(function(){$('#err').textContent='رمز اشتباه است'})}}\nfunction shell(){\n $('#app').innerHTML='<header><h1>Dev Panel</h1><button class=\"btn s\" id=\"out\">خروج</button><button class=\"btn\" id=\"nu\">+ کاربر جدید</button></header><div class=\"tabs\" id=\"tabs\"></div><main id=\"main\"></main>';\n $('#out').onclick=function(){api('/logout','POST').then(login)};\n $('#nu').onclick=function(){form('کاربر جدید',[{k:'name',l:'نام'},{k:'quotaGB',l:'حجم (GB) — خالی = نامحدود'},{k:'days',l:'مدت (روز) — خالی = نامحدود'}],function(v){return api('/users','POST',v)})};\n $('#tabs').innerHTML=TABS.map(function(t){return '<button class=\"tab'+(t[0]===tab?' on':'')+'\" data-t=\"'+t[0]+'\">'+t[1]+'</button>'}).join('');\n [].forEach.call(document.querySelectorAll('.tab'),function(b){b.onclick=function(){tab=b.dataset.t;shell()}});\n ({dash:dash,users:users,locs:locs,bak:bak})[tab]();\n}\nfunction form(title,fields,cb){var m=document.createElement('div');m.className='modal';\n m.innerHTML='<div class=\"card\"><h3>'+title+'</h3>'+fields.map(function(f){return '<label class=\"mut\">'+f.l+'</label><input id=\"f_'+f.k+'\" value=\"'+esc(f.v||'')+'\">'}).join('')+'<div class=\"row\"><button class=\"btn\" id=\"ok\">ذخیره</button><button class=\"btn s\" id=\"no\">انصراف</button></div></div>';\n document.body.appendChild(m);$('#no').onclick=function(){m.remove()};\n $('#ok').onclick=function(){var v={};fields.forEach(function(f){v[f.k]=$('#f_'+f.k).value});cb(v).then(function(){m.remove();shell()}).catch(function(e){alert(e.message)})}}\nfunction dash(){api('/stats').then(function(s){$('#main').innerHTML='<div class=\"grid\"><div class=\"card\"><div class=\"mut\">کاربران</div><div class=\"big\">'+(s.total||0)+'</div><div class=\"mut\">'+(s.ok||0)+' فعال</div></div><div class=\"card\"><div class=\"mut\">مصرف کل</div><div class=\"big\">'+gb(s.used||0)+'</div></div><div class=\"card\"><div class=\"mut\">آنلاین (۵ دقیقه اخیر)</div><div class=\"big\">'+(s.online||0)+'</div></div><div class=\"card\"><div class=\"mut\">منقضی / تمام‌شده</div><div class=\"big\">'+(s.expired||0)+'</div></div></div>'})}\nfunction users(){api('/users').then(function(l){\n $('#main').innerHTML=l.length?l.map(function(u){\n  var pct=u.quota?Math.min(100,u.used/u.quota*100):0;\n  var exp=u.expire?new Date(u.expire).toLocaleDateString('fa-IR'):'نامحدود';\n  var st=!u.active?'غیرفعال':((u.expire&&u.expire<Date.now())||(u.quota&&u.used>=u.quota))?'پایان‌یافته':'فعال';\n  var i=' data-i=\"'+u.id+'\"';\n  return '<div class=\"card\"><b>'+esc(u.name)+'</b> <span class=\"badge\">'+st+'</span><div class=\"bar\"><i style=\"width:'+pct+'%\"></i></div><div class=\"mut\">'+gb(u.used)+' / '+(u.quota?gb(u.quota):'∞')+' · انقضا: '+exp+'</div><div class=\"row\"><button class=\"btn s\" data-a=\"copy\"'+i+'>کپی لینک</button><button class=\"btn s\" data-a=\"edit\"'+i+'>ویرایش</button><button class=\"btn s\" data-a=\"tog\"'+i+'>'+(u.active?'غیرفعال‌سازی':'فعال‌سازی')+'</button><button class=\"btn s\" data-a=\"rst\"'+i+'>ریست حجم</button><button class=\"btn s d\" data-a=\"del\"'+i+'>حذف</button></div></div>'}).join(''):'<div class=\"card mut\">هنوز کاربری نیست.</div>';\n $('#main').onclick=function(e){var b=e.target.closest('button[data-a]');if(!b)return;var u=l.filter(function(x){return x.id===b.dataset.i})[0],a=b.dataset.a;\n  if(a==='copy'){var link=location.origin+'/sub/'+u.id;(navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(function(){alert('لینک ساب کپی شد')}).catch(function(){prompt('لینک:',link)})}\n  if(a==='edit')form('ویرایش',[{k:'name',l:'نام',v:u.name},{k:'quotaGB',l:'حجم GB (۰ = نامحدود)',v:u.quota?(u.quota/1073741824).toFixed(2):'0'},{k:'days',l:'تمدید از امروز (روز) — خالی = بدون تغییر، ۰ = نامحدود',v:''}],function(v){return api('/users/'+u.id,'PUT',v)});\n  if(a==='tog')api('/users/'+u.id,'PUT',{active:!u.active}).then(shell);\n  if(a==='rst')api('/users/'+u.id+'/reset','POST').then(shell);\n  if(a==='del'&&confirm('حذف شود؟'))api('/users/'+u.id,'DELETE').then(shell)}})}\nfunction locs(){api('/locations').then(function(l){\n $('#main').innerHTML='<div class=\"card mut\">آدرس: IP یا دامنه تمیز برای کانفیگ (خالی = دامنه خود ورکر). ProxyIP: برای تغییر کشور خروجی.</div>'+l.map(function(x){var i=' data-i=\"'+x.id+'\"';\n  return '<div class=\"card\"><b>'+esc(x.name)+'</b> <span class=\"badge\">'+(x.enabled?'فعال':'غیرفعال')+'</span><div class=\"mut\">آدرس: '+esc(x.address||'—')+' · ProxyIP: '+esc(x.proxy_ip||'—')+'</div><div class=\"row\"><button class=\"btn s\" data-a=\"tog\"'+i+'>'+(x.enabled?'غیرفعال‌سازی':'فعال‌سازی')+'</button>'+(x.id!=='main'?'<button class=\"btn s d\" data-a=\"del\"'+i+'>حذف</button>':'')+'</div></div>'}).join('')+'<button class=\"btn\" id=\"al\">+ لوکیشن جدید</button>';\n $('#al').onclick=function(){form('لوکیشن جدید',[{k:'name',l:'نام (مثلاً 🇩🇪 آلمان)'},{k:'address',l:'آدرس / IP تمیز (اختیاری)'},{k:'proxy_ip',l:'ProxyIP (اختیاری)'}],function(v){return api('/locations','POST',v)})};\n $('#main').onclick=function(e){var b=e.target.closest('button[data-a]');if(!b)return;var x=l.filter(function(y){return y.id===b.dataset.i})[0];\n  if(b.dataset.a==='tog')api('/locations/'+x.id,'PUT',{enabled:!x.enabled}).then(shell);\n  if(b.dataset.a==='del'&&confirm('حذف شود؟'))api('/locations/'+x.id,'DELETE').then(shell)}})}\nfunction bak(){$('#main').innerHTML='<div class=\"card\"><button class=\"btn\" id=\"ex\">دانلود پشتیبان</button></div><div class=\"card\"><div class=\"mut\">بازگردانی از فایل JSON</div><input type=\"file\" id=\"fl\" accept=\".json\"></div>';\n $('#ex').onclick=function(){api('/backup').then(function(j){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(j)],{type:'application/json'}));a.download='panel-backup.json';a.click()})};\n $('#fl').onchange=function(e){var f=e.target.files[0];if(!f)return;f.text().then(function(t){if(confirm('همه داده‌های فعلی جایگزین می‌شود. ادامه؟'))return api('/backup','POST',JSON.parse(t)).then(function(){alert('انجام شد')})}).catch(function(e){alert(e.message)})}}\napi('/stats').then(shell).catch(function(){});\n</script></body></html>";
const enc = new TextEncoder();
const J = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json' } });
let inited = false;
async function init(env) {
if (inited) return;
await env.DB.batch([
env.DB.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, quota INTEGER DEFAULT 0, used INTEGER DEFAULT 0, expire INTEGER DEFAULT 0, active INTEGER DEFAULT 1, created INTEGER, last_seen INTEGER DEFAULT 0, last_ip TEXT)'),
env.DB.prepare('CREATE TABLE IF NOT EXISTS locations (id TEXT PRIMARY KEY, name TEXT, address TEXT, proxy_ip TEXT, enabled INTEGER DEFAULT 1)'),
env.DB.prepare("INSERT OR IGNORE INTO locations (id,name,address,proxy_ip,enabled) VALUES ('main','مستقیم','','',1)")
]);
inited = true;
}
async function tok(env) {
const d = await crypto.subtle.digest('SHA-256', enc.encode('dc:' + env.ADMIN_PASSWORD));
return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function authed(req, env) {
const c = req.headers.get('cookie') || '';
const t = await tok(env);
return c.split(';').some(x => x.trim() === 't=' + t);
}
const cache = new Map();
async function getUser(env, id) {
const c = cache.get(id);
if (c && Date.now() - c.t < 15000) return c.u;
const u = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(id).first();
cache.set(id, { t: Date.now(), u });
return u;
}
function allowed(u) { return u && u.active == 1 && (!u.expire || u.expire > Date.now()) && (!u.quota || u.used < u.quota); }
function uuidStr(b) {
const h = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}
async function dial(host, port, proxyIP) {
const mod = await import('cloudflare:sockets');
const connect = mod.connect;
try { const s = connect({ hostname: host, port: port }); await s.opened; return s; }
catch (e) { if (!proxyIP) throw e; const s = connect({ hostname: proxyIP, port: port }); await s.opened; return s; }
}
async function vless(req, env, ctx, url) {
const locId = url.pathname.split('/')[2] || 'main';
const loc = await env.DB.prepare('SELECT proxy_ip FROM locations WHERE id=?').bind(locId).first();
const proxyIP = (loc && loc.proxy_ip) || '';
const pair = new WebSocketPair();
const client = pair[0], server = pair[1];
server.accept();
const ip = req.headers.get('cf-connecting-ip') || '';
let user = null, writer = null, remote = null, udp = false, first = true, pend = 0, last = Date.now(), closed = false, sentHdr = false, ver = 0;
function flush() {
if (!user || !pend) return;
const n = pend; pend = 0; last = Date.now(); user.used += n;
ctx.waitUntil(env.DB.prepare('UPDATE users SET used=used+?1, last_seen=?2, last_ip=?3 WHERE id=?4').bind(n, Date.now(), ip, user.id).run().catch(function () {}));
}
function close() {
if (closed) return; closed = true; flush();
try { server.close(); } catch (e) {}
try { if (remote) remote.close(); } catch (e) {}
}
function overQuota() { return user.quota && user.used + pend >= user.quota; }
async function dnsQuery(buf) {
let i = 0;
while (i + 2 <= buf.length) {
const l = (buf[i] << 8) | buf[i + 1];
const q = buf.subarray(i + 2, i + 2 + l); i += 2 + l;
const r = await fetch('https://1.1.1.1/dns-query', { method: 'POST', headers: { 'content-type': 'application/dns-message' }, body: q });
const a = new Uint8Array(await r.arrayBuffer());
const out = new Uint8Array((sentHdr ? 0 : 2) + 2 + a.length);
let k = 0;
if (!sentHdr) { out[0] = ver; out[1] = 0; k = 2; sentHdr = true; }
out[k] = a.length >> 8; out[k + 1] = a.length & 255; out.set(a, k + 2);
server.send(out); pend += out.length;
}
}
async function onMsg(d) {
if (closed || typeof d === 'string') return;
const data = new Uint8Array(d);
if (!first) {
pend += data.byteLength;
if (udp) await dnsQuery(data);
else if (writer) await writer.write(data);
if (overQuota()) close();
else if (Date.now() - last > 30000) flush();
return;
}
first = false;
if (data.length < 24) throw new Error('short');
user = await getUser(env, uuidStr(data.subarray(1, 17)));
if (!allowed(user)) throw new Error('denied');
ver = data[0];
let o = 18 + data[17];
const cmd = data[o++];
const port = (data[o] << 8) | data[o + 1]; o += 2;
const at = data[o++];
let host;
if (at === 1) { host = data.subarray(o, o + 4).join('.'); o += 4; }
else if (at === 2) { const l = data[o++]; host = new TextDecoder().decode(data.subarray(o, o + l)); o += l; }
else if (at === 3) { const p = []; for (let i = 0; i < 8; i++) p.push(((data[o + i * 2] << 8) | data[o + i * 2 + 1]).toString(16)); host = p.join(':'); o += 16; }
else throw new Error('atype');
const payload = data.subarray(o);
pend += data.byteLength; flush();
if (cmd === 2) { if (port !== 53) throw new Error('udp'); udp = true; if (payload.length) await dnsQuery(payload); return; }
if (cmd !== 1) throw new Error('cmd');
remote = await dial(host, port, proxyIP);
writer = remote.writable.getWriter();
if (payload.length) await writer.write(payload);
remote.readable.pipeTo(new WritableStream({
write(chunk) {
let out = chunk;
if (!sentHdr) { out = new Uint8Array(2 + chunk.byteLength); out[0] = ver; out[1] = 0; out.set(chunk, 2); sentHdr = true; }
server.send(out); pend += chunk.byteLength;
if (overQuota()) close();
}
})).catch(function () {}).then(close);
}
let chain = Promise.resolve();
server.addEventListener('message', e => { chain = chain.then(() => onMsg(e.data)).catch(() => close()); });
server.addEventListener('close', close);
server.addEventListener('error', close);
return new Response(null, { status: 101, webSocket: client });
}
async function sub(env, url, id) {
const u = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(id).first();
if (!u) return new Response('Not found', { status: 404 });
const r = await env.DB.prepare('SELECT * FROM locations WHERE enabled=1').all();
const host = url.hostname;
const lines = r.results.map(l => 'vless://' + u.id + '@' + (l.address || host) + ':443?encryption=none&security=tls&sni=' + host + '&fp=chrome&type=ws&host=' + host + '&path=' + encodeURIComponent('/ws/' + l.id) + '#' + encodeURIComponent(l.name + '-' + u.name));
return new Response(btoa(lines.join(String.fromCharCode(10))), { headers: {
'content-type': 'text/plain; charset=utf-8',
'subscription-userinfo': 'upload=0; download=' + u.used + '; total=' + u.quota + '; expire=' + Math.floor(u.expire / 1000),
'profile-update-interval': '6'
} });
}
async function api(req, env, url) {
const p = url.pathname, m = req.method, DB = env.DB, now = Date.now();
if (p === '/api/login' && m === 'POST') {
const b = await req.json().catch(() => ({}));
if (b.password && b.password === env.ADMIN_PASSWORD) return new Response('{"ok":true}', { headers: { 'content-type': 'application/json', 'set-cookie': 't=' + await tok(env) + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000' } });
return J({ error: 'bad' }, 401);
}
if (!(await authed(req, env))) return J({ error: 'unauthorized' }, 401);
if (p === '/api/logout') return new Response('{}', { headers: { 'content-type': 'application/json', 'set-cookie': 't=; Max-Age=0' } });
let b = {};
if (m === 'POST' || m === 'PUT') b = await req.json().catch(() => ({}));
const parts = p.split('/'), r = parts[2], id = parts[3], act = parts[4];
if (r === 'stats') {
const s = await DB.prepare('SELECT COUNT(*) total, SUM(CASE WHEN active=1 AND (expire=0 OR expire>?1) AND (quota=0 OR used<quota) THEN 1 ELSE 0 END) ok, SUM(CASE WHEN (expire>0 AND expire<=?1) OR (quota>0 AND used>=quota) THEN 1 ELSE 0 END) expired, SUM(CASE WHEN last_seen>?2 THEN 1 ELSE 0 END) online, COALESCE(SUM(used),0) used FROM users').bind(now, now - 300000).first();
return J(s);
}
if (r === 'users') {
if (m === 'GET') return J((await DB.prepare('SELECT * FROM users ORDER BY created DESC').all()).results);
if (m === 'POST' && !id) {
const nid = crypto.randomUUID();
const quota = Math.round((+b.quotaGB || 0) * 1073741824);
const exp = +b.days > 0 ? now + b.days * 86400000 : 0;
await DB.prepare('INSERT INTO users (id,name,quota,used,expire,active,created) VALUES (?,?,?,0,?,1,?)').bind(nid, String(b.name || 'user').slice(0, 60), quota, exp, now).run();
return J({ id: nid });
}
if (m === 'POST' && act === 'reset') { await DB.prepare('UPDATE users SET used=0 WHERE id=?').bind(id).run(); cache.delete(id); return J({ ok: 1 }); }
if (m === 'PUT' && id) {
const u = await DB.prepare('SELECT * FROM users WHERE id=?').bind(id).first();
if (!u) return J({ error: 'not found' }, 404);
const name = b.name != null ? String(b.name).slice(0, 60) : u.name;
const quota = b.quotaGB != null && b.quotaGB !== '' ? Math.round(+b.quotaGB * 1073741824) : u.quota;
const exp = b.days != null && b.days !== '' ? (+b.days > 0 ? now + b.days * 86400000 : 0) : u.expire;
const active = b.active != null ? (b.active ? 1 : 0) : u.active;
await DB.prepare('UPDATE users SET name=?,quota=?,expire=?,active=? WHERE id=?').bind(name, quota, exp, active, id).run();
cache.delete(id); return J({ ok: 1 });
}
if (m === 'DELETE' && id) { await DB.prepare('DELETE FROM users WHERE id=?').bind(id).run(); cache.delete(id); return J({ ok: 1 }); }
}
if (r === 'locations') {
if (m === 'GET') return J((await DB.prepare('SELECT * FROM locations ORDER BY rowid').all()).results);
if (m === 'POST') {
const nid = crypto.randomUUID().slice(0, 6);
await DB.prepare('INSERT INTO locations (id,name,address,proxy_ip,enabled) VALUES (?,?,?,?,1)').bind(nid, String(b.name || 'loc').slice(0, 60), String(b.address || '').trim(), String(b.proxy_ip || '').trim()).run();
return J({ id: nid });
}
if (m === 'PUT' && id) { await DB.prepare('UPDATE locations SET enabled=? WHERE id=?').bind(b.enabled ? 1 : 0, id).run(); return J({ ok: 1 }); }
if (m === 'DELETE' && id && id !== 'main') { await DB.prepare('DELETE FROM locations WHERE id=?').bind(id).run(); return J({ ok: 1 }); }
}
if (r === 'backup') {
if (m === 'GET') return J({ users: (await DB.prepare('SELECT * FROM users').all()).results, locations: (await DB.prepare('SELECT * FROM locations').all()).results });
if (m === 'POST') {
const st = [DB.prepare('DELETE FROM users'), DB.prepare('DELETE FROM locations')];
for (const u of (b.users || [])) st.push(DB.prepare('INSERT OR REPLACE INTO users (id,name,quota,used,expire,active,created,last_seen,last_ip) VALUES (?,?,?,?,?,?,?,?,?)').bind(String(u.id), String(u.name || ''), +u.quota || 0, +u.used || 0, +u.expire || 0, u.active ? 1 : 0, +u.created || now, +u.last_seen || 0, u.last_ip || ''));
for (const l of (b.locations || [])) st.push(DB.prepare('INSERT OR REPLACE INTO locations (id,name,address,proxy_ip,enabled) VALUES (?,?,?,?,?)').bind(String(l.id), String(l.name || ''), String(l.address || ''), String(l.proxy_ip || ''), l.enabled ? 1 : 0));
st.push(DB.prepare("INSERT OR IGNORE INTO locations (id,name,address,proxy_ip,enabled) VALUES ('main','مستقیم','','',1)"));
await DB.batch(st); cache.clear(); return J({ ok: 1 });
}
}
return J({ error: 'not found' }, 404);
}
export default {
async fetch(req, env, ctx) {
try {
const url = new URL(req.url);
if (url.pathname === '/health') return J({ ok: 1, hasDB: !!env.DB, hasPw: !!env.ADMIN_PASSWORD });
await init(env);
if ((req.headers.get('upgrade') || '').toLowerCase() === 'websocket') return await vless(req, env, ctx, url);
const p = url.pathname;
if (p === '/') return new Response(HTML, { headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'no-store' } });
if (p.startsWith('/sub/')) return await sub(env, url, p.slice(5));
if (p.startsWith('/api/')) return await api(req, env, url);
return new Response('Not found', { status: 404 });
} catch (e) { return J({ error: String((e && e.message) || e), stack: String((e && e.stack) || '').slice(0, 600) }, 500); }
}
};
