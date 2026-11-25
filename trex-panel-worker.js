const HTML = "<!doctype html><html lang=\"fa\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Trex Panel</title><style>\n:root{--bg:#0b1020;--bg2:#121a33;--card:#141b30;--tx:#eef2ff;--mut:#8b95b8;--bd:#232c4d;--pri:#22c55e;--pri2:#16a34a;--acc:#6366f1;--bad:#ef4444}\n@media(prefers-color-scheme:light){:root{--bg:#f3f5fb;--bg2:#ffffff;--card:#ffffff;--tx:#10162b;--mut:#5b6480;--bd:#e3e7f4;--pri:#16a34a;--pri2:#15803d;--acc:#4f46e5;--bad:#dc2626}}\n*{box-sizing:border-box}body{margin:0;background:radial-gradient(1200px 600px at 50% -10%,var(--bg2),var(--bg));color:var(--tx);font-family:Tahoma,system-ui,sans-serif;min-height:100vh}\nheader{display:flex;align-items:center;gap:10px;padding:14px 16px;background:color-mix(in srgb,var(--card) 85%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--bd);position:sticky;top:0;z-index:5}\nheader .logo{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--pri),var(--acc));display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:14px}\nheader h1{font-size:17px;margin:0;flex:1;font-weight:800;letter-spacing:.3px}\n.tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 16px;max-width:760px;margin:auto}\n.tab{padding:8px 16px;border-radius:999px;border:1px solid var(--bd);background:var(--card);color:var(--tx);white-space:nowrap;cursor:pointer;font:inherit;font-weight:600}\n.tab.on{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#fff;border-color:transparent}\nmain{padding:0 16px 40px;max-width:760px;margin:auto}\n.card{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:16px;margin-bottom:14px;box-shadow:0 6px 20px -12px rgba(0,0,0,.3)}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.grid .card{margin:0}\n.big{font-size:26px;font-weight:800;margin-top:6px}.mut{color:var(--mut);font-size:13px}\n.btn{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#fff;border:0;border-radius:14px;padding:11px 18px;font:inherit;font-weight:700;cursor:pointer;box-shadow:0 8px 18px -8px color-mix(in srgb,var(--pri) 60%,transparent)}\n.btn.s{background:var(--card);color:var(--tx);border:1px solid var(--bd);padding:8px 12px;font-size:13px;font-weight:600;box-shadow:none}.btn.d{color:var(--bad)}\ninput{width:100%;padding:13px;border-radius:14px;border:1px solid var(--bd);background:color-mix(in srgb,var(--card) 70%,var(--bg));color:var(--tx);font:inherit;margin:4px 0 10px}\ninput:focus{outline:2px solid var(--pri);outline-offset:1px}\n.bar{height:8px;border-radius:9px;background:var(--bd);overflow:hidden;margin:8px 0}.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--pri),var(--acc))}\n.row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}\n.badge{font-size:12px;padding:3px 10px;border-radius:999px;background:var(--bd);font-weight:700}\n.modal{position:fixed;inset:0;background:#0009;display:flex;align-items:center;justify-content:center;padding:16px;z-index:9}.modal .card{width:100%;max-width:420px;margin:0}\n.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}\n.login{max-width:380px;width:100%;text-align:center}\n.login .brand{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,var(--pri),var(--acc));display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:26px;margin:0 auto 14px;box-shadow:0 14px 30px -12px color-mix(in srgb,var(--acc) 60%,transparent)}\n.login h2{margin:0 0 4px;font-size:22px;font-weight:800}\n.login p.sub{color:var(--mut);margin:0 0 22px;font-size:13px}\n.login .btn{width:100%}\n</style></head><body><div id=\"app\"></div><script>\nvar $=function(s){return document.querySelector(s)};\nfunction esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]})}\nfunction api(path,method,body){return fetch('/api'+path,{method:method||'GET',headers:{'content-type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){if(r.status===401&&path!=='/login'){login();throw new Error('auth')}return r.json().then(function(j){if(!r.ok)throw new Error(j.error||'\u062e\u0637\u0627');return j})})}\nfunction gb(b){return (b/1073741824).toFixed(2)+' GB'}\nvar tab='dash';\nvar TABS=[['dash','\u062f\u0627\u0634\u0628\u0648\u0631\u062f'],['users','\u06a9\u0627\u0631\u0628\u0631\u0627\u0646'],['locs','\u0644\u0648\u06a9\u06cc\u0634\u0646\u200c\u0647\u0627'],['bak','\u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u200c\u06af\u06cc\u0631\u06cc']];\nfunction login(){$('#app').innerHTML='<div class=\"login-wrap\"><div class=\"card login\"><div class=\"brand\">T</div><h2>Trex Panel</h2><p class=\"sub\">\u0628\u0631\u0627\u06cc \u0627\u062f\u0627\u0645\u0647 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f</p><input id=\"pw\" type=\"password\" placeholder=\"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631\"><button class=\"btn\" id=\"go\">\u0648\u0631\u0648\u062f</button><p class=\"mut\" id=\"err\" style=\"color:var(--bad)\"></p></div></div>';\n $('#pw').addEventListener('keydown',function(e){if(e.key==='Enter')$('#go').click()});\n $('#go').onclick=function(){api('/login','POST',{password:$('#pw').value}).then(shell).catch(function(e){$('#err').textContent=e.message||'\u0631\u0645\u0632 \u0627\u0634\u062a\u0628\u0627\u0647 \u0627\u0633\u062a'})}}\nfunction shell(){\n $('#app').innerHTML='<header><div class=\"logo\">T</div><h1>Trex Panel</h1><button class=\"btn s\" id=\"out\">\u062e\u0631\u0648\u062c</button><button class=\"btn\" id=\"nu\">+ \u06a9\u0627\u0631\u0628\u0631 \u062c\u062f\u06cc\u062f</button></header><div class=\"tabs\" id=\"tabs\"></div><main id=\"main\"></main>';\n $('#out').onclick=function(){api('/logout','POST').then(login)};\n $('#nu').onclick=function(){form('\u06a9\u0627\u0631\u0628\u0631 \u062c\u062f\u06cc\u062f',[{k:'name',l:'\u0646\u0627\u0645'},{k:'quotaGB',l:'\u062d\u062c\u0645 (GB) \u2014 \u062e\u0627\u0644\u06cc = \u0646\u0627\u0645\u062d\u062f\u0648\u062f'},{k:'days',l:'\u0645\u062f\u062a (\u0631\u0648\u0632) \u2014 \u062e\u0627\u0644\u06cc = \u0646\u0627\u0645\u062d\u062f\u0648\u062f'}],function(v){return api('/users','POST',v)})};\n $('#tabs').innerHTML=TABS.map(function(t){return '<button class=\"tab'+(t[0]===tab?' on':'')+'\" data-t=\"'+t[0]+'\">'+t[1]+'</button>'}).join('');\n [].forEach.call(document.querySelectorAll('.tab'),function(b){b.onclick=function(){tab=b.dataset.t;shell()}});\n ({dash:dash,users:users,locs:locs,bak:bak})[tab]();\n}\nfunction form(title,fields,cb){var m=document.createElement('div');m.className='modal';\n m.innerHTML='<div class=\"card\"><h3>'+title+'</h3>'+fields.map(function(f){return '<label class=\"mut\">'+f.l+'</label><input id=\"f_'+f.k+'\" value=\"'+esc(f.v||'')+'\">'}).join('')+'<div class=\"row\"><button class=\"btn\" id=\"ok\">\u0630\u062e\u06cc\u0631\u0647</button><button class=\"btn s\" id=\"no\">\u0627\u0646\u0635\u0631\u0627\u0641</button></div></div>';\n document.body.appendChild(m);$('#no').onclick=function(){m.remove()};\n $('#ok').onclick=function(){var v={};fields.forEach(function(f){v[f.k]=$('#f_'+f.k).value});cb(v).then(function(){m.remove();shell()}).catch(function(e){alert(e.message)})}}\nfunction dash(){api('/stats').then(function(s){$('#main').innerHTML='<div class=\"grid\"><div class=\"card\"><div class=\"mut\">\u06a9\u0627\u0631\u0628\u0631\u0627\u0646</div><div class=\"big\">'+(s.total||0)+'</div><div class=\"mut\">'+(s.ok||0)+' \u0641\u0639\u0627\u0644</div></div><div class=\"card\"><div class=\"mut\">\u0645\u0635\u0631\u0641 \u06a9\u0644</div><div class=\"big\">'+gb(s.used||0)+'</div></div><div class=\"card\"><div class=\"mut\">\u0622\u0646\u0644\u0627\u06cc\u0646 (\u06f5 \u062f\u0642\u06cc\u0642\u0647 \u0627\u062e\u06cc\u0631)</div><div class=\"big\">'+(s.online||0)+'</div></div><div class=\"card\"><div class=\"mut\">\u0645\u0646\u0642\u0636\u06cc / \u062a\u0645\u0627\u0645\u200c\u0634\u062f\u0647</div><div class=\"big\">'+(s.expired||0)+'</div></div></div>'})}\nfunction users(){api('/users').then(function(l){\n $('#main').innerHTML=l.length?l.map(function(u){\n  var pct=u.quota?Math.min(100,u.used/u.quota*100):0;\n  var exp=u.expire?new Date(u.expire).toLocaleDateString('fa-IR'):'\u0646\u0627\u0645\u062d\u062f\u0648\u062f';\n  var st=!u.active?'\u063a\u06cc\u0631\u0641\u0639\u0627\u0644':((u.expire&&u.expire<Date.now())||(u.quota&&u.used>=u.quota))?'\u067e\u0627\u06cc\u0627\u0646\u200c\u06cc\u0627\u0641\u062a\u0647':'\u0641\u0639\u0627\u0644';\n  var i=' data-i=\"'+u.id+'\"';\n  return '<div class=\"card\"><b>'+esc(u.name)+'</b> <span class=\"badge\">'+st+'</span><div class=\"bar\"><i style=\"width:'+pct+'%\"></i></div><div class=\"mut\">'+gb(u.used)+' / '+(u.quota?gb(u.quota):'\u221e')+' \u00b7 \u0627\u0646\u0642\u0636\u0627: '+exp+'</div><div class=\"row\"><button class=\"btn s\" data-a=\"open\"'+i+'>\u0635\u0641\u062d\u0647 \u0633\u0627\u0628</button><button class=\"btn s\" data-a=\"copy\"'+i+'>\u06a9\u067e\u06cc \u0644\u06cc\u0646\u06a9</button><button class=\"btn s\" data-a=\"edit\"'+i+'>\u0648\u06cc\u0631\u0627\u06cc\u0634</button><button class=\"btn s\" data-a=\"tog\"'+i+'>'+(u.active?'\u063a\u06cc\u0631\u0641\u0639\u0627\u0644\u200c\u0633\u0627\u0632\u06cc':'\u0641\u0639\u0627\u0644\u200c\u0633\u0627\u0632\u06cc')+'</button><button class=\"btn s\" data-a=\"rst\"'+i+'>\u0631\u06cc\u0633\u062a \u062d\u062c\u0645</button><button class=\"btn s d\" data-a=\"del\"'+i+'>\u062d\u0630\u0641</button></div></div>'}).join(''):'<div class=\"card mut\">\u0647\u0646\u0648\u0632 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0646\u06cc\u0633\u062a.</div>';\n $('#main').onclick=function(e){var b=e.target.closest('button[data-a]');if(!b)return;var u=l.filter(function(x){return x.id===b.dataset.i})[0],a=b.dataset.a;\n  if(a==='open')window.open(location.origin+'/sub/'+u.id,'_blank');\n  if(a==='copy'){var link=location.origin+'/sub/'+u.id;(navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(function(){alert('\u0644\u06cc\u0646\u06a9 \u0633\u0627\u0628 \u06a9\u067e\u06cc \u0634\u062f')}).catch(function(){prompt('\u0644\u06cc\u0646\u06a9:',link)})}\n  if(a==='edit')form('\u0648\u06cc\u0631\u0627\u06cc\u0634',[{k:'name',l:'\u0646\u0627\u0645',v:u.name},{k:'quotaGB',l:'\u062d\u062c\u0645 GB (\u06f0 = \u0646\u0627\u0645\u062d\u062f\u0648\u062f)',v:u.quota?(u.quota/1073741824).toFixed(2):'0'},{k:'days',l:'\u062a\u0645\u062f\u06cc\u062f \u0627\u0632 \u0627\u0645\u0631\u0648\u0632 (\u0631\u0648\u0632) \u2014 \u062e\u0627\u0644\u06cc = \u0628\u062f\u0648\u0646 \u062a\u063a\u06cc\u06cc\u0631\u060c \u06f0 = \u0646\u0627\u0645\u062d\u062f\u0648\u062f',v:''}],function(v){return api('/users/'+u.id,'PUT',v)});\n  if(a==='tog')api('/users/'+u.id,'PUT',{active:!u.active}).then(shell);\n  if(a==='rst')api('/users/'+u.id+'/reset','POST').then(shell);\n  if(a==='del'&&confirm('\u062d\u0630\u0641 \u0634\u0648\u062f\u061f'))api('/users/'+u.id,'DELETE').then(shell)}})}\nfunction locs(){api('/locations').then(function(l){\n $('#main').innerHTML='<div class=\"card mut\">\u0622\u062f\u0631\u0633: IP \u06cc\u0627 \u062f\u0627\u0645\u0646\u0647 \u062a\u0645\u06cc\u0632 \u0628\u0631\u0627\u06cc \u06a9\u0627\u0646\u0641\u06cc\u06af (\u062e\u0627\u0644\u06cc = \u062f\u0627\u0645\u0646\u0647 \u062e\u0648\u062f \u0648\u0631\u06a9\u0631). ProxyIP: \u0628\u0631\u0627\u06cc \u062a\u063a\u06cc\u06cc\u0631 \u06a9\u0634\u0648\u0631 \u062e\u0631\u0648\u062c\u06cc.</div>'+l.map(function(x){var i=' data-i=\"'+x.id+'\"';\n  return '<div class=\"card\"><b>'+esc(x.name)+'</b> <span class=\"badge\">'+(x.enabled?'\u0641\u0639\u0627\u0644':'\u063a\u06cc\u0631\u0641\u0639\u0627\u0644')+'</span><div class=\"mut\">\u0622\u062f\u0631\u0633: '+esc(x.address||'\u2014')+' \u00b7 ProxyIP: '+esc(x.proxy_ip||'\u2014')+'</div><div class=\"row\"><button class=\"btn s\" data-a=\"tog\"'+i+'>'+(x.enabled?'\u063a\u06cc\u0631\u0641\u0639\u0627\u0644\u200c\u0633\u0627\u0632\u06cc':'\u0641\u0639\u0627\u0644\u200c\u0633\u0627\u0632\u06cc')+'</button>'+(x.id!=='main'?'<button class=\"btn s d\" data-a=\"del\"'+i+'>\u062d\u0630\u0641</button>':'')+'</div></div>'}).join('')+'<button class=\"btn\" id=\"al\">+ \u0644\u0648\u06a9\u06cc\u0634\u0646 \u062c\u062f\u06cc\u062f</button>';\n $('#al').onclick=function(){form('\u0644\u0648\u06a9\u06cc\u0634\u0646 \u062c\u062f\u06cc\u062f',[{k:'name',l:'\u0646\u0627\u0645 (\u0645\u062b\u0644\u0627\u064b \ud83c\udde9\ud83c\uddea \u0622\u0644\u0645\u0627\u0646)'},{k:'address',l:'\u0622\u062f\u0631\u0633 / IP \u062a\u0645\u06cc\u0632 (\u0627\u062e\u062a\u06cc\u0627\u0631\u06cc)'},{k:'proxy_ip',l:'ProxyIP (\u0627\u062e\u062a\u06cc\u0627\u0631\u06cc)'}],function(v){return api('/locations','POST',v)})};\n $('#main').onclick=function(e){var b=e.target.closest('button[data-a]');if(!b)return;var x=l.filter(function(y){return y.id===b.dataset.i})[0];\n  if(b.dataset.a==='tog')api('/locations/'+x.id,'PUT',{enabled:!x.enabled}).then(shell);\n  if(b.dataset.a==='del'&&confirm('\u062d\u0630\u0641 \u0634\u0648\u062f\u061f'))api('/locations/'+x.id,'DELETE').then(shell)}})}\nfunction bak(){$('#main').innerHTML='<div class=\"card\"><button class=\"btn\" id=\"ex\">\u062f\u0627\u0646\u0644\u0648\u062f \u067e\u0634\u062a\u06cc\u0628\u0627\u0646</button></div><div class=\"card\"><div class=\"mut\">\u0628\u0627\u0632\u06af\u0631\u062f\u0627\u0646\u06cc \u0627\u0632 \u0641\u0627\u06cc\u0644 JSON</div><input type=\"file\" id=\"fl\" accept=\".json\"></div>';\n $('#ex').onclick=function(){api('/backup').then(function(j){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(j)],{type:'application/json'}));a.download='trex-backup.json';a.click()})};\n $('#fl').onchange=function(e){var f=e.target.files[0];if(!f)return;f.text().then(function(t){if(confirm('\u0647\u0645\u0647 \u062f\u0627\u062f\u0647\u200c\u0647\u0627\u06cc \u0641\u0639\u0644\u06cc \u062c\u0627\u06cc\u06af\u0632\u06cc\u0646 \u0645\u06cc\u200c\u0634\u0648\u062f. \u0627\u062f\u0627\u0645\u0647\u061f'))return api('/backup','POST',JSON.parse(t)).then(function(){alert('\u0627\u0646\u062c\u0627\u0645 \u0634\u062f')})}).catch(function(e){alert(e.message)})}}\napi('/stats').then(shell).catch(function(){});\n</script></body></html>\n";
const SUB_PAGE_TEMPLATE = "<!doctype html><html lang=\"fa\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Trex Panel \u2014 \u0627\u0634\u062a\u0631\u0627\u06a9</title><style>\n:root{--bg:#0b1020;--bg2:#121a33;--card:#141b30;--tx:#eef2ff;--mut:#8b95b8;--bd:#232c4d;--pri:#22c55e;--pri2:#16a34a;--acc:#6366f1}\n@media(prefers-color-scheme:light){:root{--bg:#f3f5fb;--bg2:#ffffff;--card:#ffffff;--tx:#10162b;--mut:#5b6480;--bd:#e3e7f4;--pri:#16a34a;--pri2:#15803d;--acc:#4f46e5}}\n*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(1200px 600px at 50% -10%,var(--bg2),var(--bg));color:var(--tx);font-family:Tahoma,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}\n.card{background:var(--card);border:1px solid var(--bd);border-radius:22px;padding:24px;max-width:420px;width:100%;text-align:center;box-shadow:0 20px 50px -20px rgba(0,0,0,.4)}\n.brand{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--pri),var(--acc));display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:22px;margin:0 auto 10px}\nh2{margin:4px 0 2px;font-size:19px}.name{color:var(--mut);font-size:13px;margin-bottom:18px}\n.qr{background:#fff;padding:10px;border-radius:16px;display:inline-block;margin-bottom:18px}\n.qr img{display:block;width:180px;height:180px;border-radius:8px}\n.stats{display:flex;gap:10px;margin-bottom:16px}\n.stat{flex:1;background:color-mix(in srgb,var(--card) 60%,var(--bg));border:1px solid var(--bd);border-radius:14px;padding:10px}\n.stat b{display:block;font-size:15px}.stat span{font-size:11px;color:var(--mut)}\n.bar{height:8px;border-radius:9px;background:var(--bd);overflow:hidden;margin:4px 0 16px}.bar i{display:block;height:100%;width:__PCT__%;background:linear-gradient(90deg,var(--pri),var(--acc))}\n.btn{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#fff;border:0;border-radius:14px;padding:13px 18px;font:inherit;font-weight:700;cursor:pointer;width:100%;box-shadow:0 8px 18px -8px color-mix(in srgb,var(--pri) 60%,transparent)}\n.hint{color:var(--mut);font-size:12px;margin-top:12px;line-height:1.7}\n</style></head><body>\n<div class=\"card\">\n<div class=\"brand\">T</div>\n<h2>Trex Panel</h2>\n<div class=\"name\">__NAME__</div>\n<div class=\"qr\"><img src=\"__QR__\" alt=\"QR\"></div>\n<div class=\"stats\">\n<div class=\"stat\"><b>__USED__</b><span>\u0645\u0635\u0631\u0641\u200c\u0634\u062f\u0647</span></div>\n<div class=\"stat\"><b>__QUOTA__</b><span>\u0633\u0642\u0641 \u062d\u062c\u0645</span></div>\n<div class=\"stat\"><b>__EXPIRE__</b><span>\u0627\u0646\u0642\u0636\u0627</span></div>\n</div>\n<div class=\"bar\"><i></i></div>\n<button class=\"btn\" id=\"cp\">\u06a9\u067e\u06cc \u0644\u06cc\u0646\u06a9 \u0627\u0634\u062a\u0631\u0627\u06a9</button>\n<div class=\"hint\">\u0627\u06cc\u0646 \u0644\u06cc\u0646\u06a9 \u0631\u0627 \u062f\u0631 \u0627\u067e\u0644\u06cc\u06a9\u06cc\u0634\u0646 v2rayNG / Hiddify / NekoBox \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f \u062a\u0627 \u06a9\u0627\u0646\u0641\u06cc\u06af\u200c\u0647\u0627 \u0628\u0647\u200c\u0635\u0648\u0631\u062a \u062e\u0648\u062f\u06a9\u0627\u0631 \u062f\u0631\u06cc\u0627\u0641\u062a \u0634\u0648\u0646\u062f.</div>\n</div>\n<script>\ndocument.getElementById('cp').onclick=function(){\n var url=\"__SUBURL__\";\n (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){\n   var b=document.getElementById('cp');b.textContent='\u06a9\u067e\u06cc \u0634\u062f \u2713';setTimeout(function(){b.textContent='\u06a9\u067e\u06cc \u0644\u06cc\u0646\u06a9 \u0627\u0634\u062a\u0631\u0627\u06a9'},1500);\n }).catch(function(){prompt('\u0644\u06cc\u0646\u06a9:',url)});\n};\n</script>\n</body></html>\n";
const enc = new TextEncoder();
const J = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'content-type': 'application/json' } });
function b64u(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function randToken() { return b64u(crypto.getRandomValues(new Uint8Array(32)).buffer); }
function timingSafeEq(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
async function authed(req, env) {
  const c = req.headers.get('cookie') || '';
  const m = c.split(';').map(x => x.trim()).find(x => x.startsWith('t='));
  if (!m) return false;
  const v = await env.PANEL.get('s:' + m.slice(2));
  return v === '1';
}
function uuidStr(b) {
  const h = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
  return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
}
function allowed(u) { return u && u.active == 1 && (!u.expire || u.expire > Date.now()) && (!u.quota || u.used < u.quota); }
const cache = new Map();
async function getUser(env, id) {
  const c = cache.get(id);
  if (c && Date.now() - c.t < 10000) return c.u;
  const raw = await env.PANEL.get('u:' + id);
  const u = raw ? JSON.parse(raw) : null;
  cache.set(id, { t: Date.now(), u });
  return u;
}
async function saveUser(env, u) { await env.PANEL.put('u:' + u.id, JSON.stringify(u)); cache.set(u.id, { t: Date.now(), u }); }
async function listUsers(env) {
  const out = []; let cursor;
  do {
    const r = await env.PANEL.list({ prefix: 'u:', cursor });
    const vals = await Promise.all(r.keys.map(k => env.PANEL.get(k.name)));
    vals.forEach(v => { if (v) out.push(JSON.parse(v)); });
    cursor = r.list_complete ? undefined : r.cursor;
  } while (cursor);
  return out;
}
async function listLocs(env) {
  const out = []; let cursor;
  do {
    const r = await env.PANEL.list({ prefix: 'l:', cursor });
    const vals = await Promise.all(r.keys.map(k => env.PANEL.get(k.name)));
    vals.forEach(v => { if (v) out.push(JSON.parse(v)); });
    cursor = r.list_complete ? undefined : r.cursor;
  } while (cursor);
  return out;
}
async function ensureMainLoc(env) {
  const v = await env.PANEL.get('l:main');
  if (!v) await env.PANEL.put('l:main', JSON.stringify({ id: 'main', name: 'مستقیم', address: '', proxy_ip: '', enabled: 1 }));
}
async function dial(host, port, proxyIP) {
  const mod = await import('cloudflare:sockets');
  const connect = mod.connect;
  try { const s = connect({ hostname: host, port: port }); await s.opened; return s; }
  catch (e) { if (!proxyIP) throw e; const s = connect({ hostname: proxyIP, port: port }); await s.opened; return s; }
}
async function vless(req, env, ctx, url) {
  const locId = url.pathname.split('/')[2] || 'main';
  const locRaw = await env.PANEL.get('l:' + locId);
  const loc = locRaw ? JSON.parse(locRaw) : null;
  const proxyIP = (loc && loc.proxy_ip) || '';
  const pair = new WebSocketPair();
  const client = pair[0], server = pair[1];
  server.accept();
  const ip = req.headers.get('cf-connecting-ip') || '';
  let user = null, writer = null, remote = null, udp = false, first = true, pend = 0, last = Date.now(), closed = false, sentHdr = false, ver = 0;
  function flush() {
    if (!user || !pend) return;
    const n = pend; pend = 0; last = Date.now(); user.used += n; user.last_seen = Date.now(); user.last_ip = ip;
    ctx.waitUntil(saveUser(env, user).catch(function () {}));
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
function gbFmt(b) { return (b / 1073741824).toFixed(2) + ' GB'; }
async function sub(env, req, url, id) {
  const raw = await env.PANEL.get('u:' + id);
  if (!raw) return new Response('Not found', { status: 404 });
  const u = JSON.parse(raw);
  const locs = (await listLocs(env)).filter(l => l.enabled);
  const host = url.hostname;
  const lines = locs.map(l => 'vless://' + u.id + '@' + (l.address || host) + ':443?encryption=none&security=tls&sni=' + host + '&fp=chrome&type=ws&host=' + host + '&path=' + encodeURIComponent('/ws/' + l.id) + '#' + encodeURIComponent(l.name + '-' + u.name));
  const b64 = btoa(lines.join(String.fromCharCode(10)));
  const accept = req.headers.get('accept') || '';
  const wantsHtml = accept.indexOf('text/html') !== -1 && url.searchParams.get('raw') !== '1';
  if (wantsHtml) {
    const subUrl = url.origin + '/sub/' + id + '?raw=1';
    const exp = u.expire ? new Date(u.expire).toLocaleDateString('fa-IR') : 'نامحدود';
    const pct = u.quota ? Math.min(100, (u.used / u.quota) * 100) : 0;
    const html = SUB_PAGE_TEMPLATE
      .replace(/__NAME__/g, u.name.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])))
      .replace(/__USED__/g, gbFmt(u.used))
      .replace(/__QUOTA__/g, u.quota ? gbFmt(u.quota) : '∞')
      .replace(/__PCT__/g, String(pct))
      .replace(/__EXPIRE__/g, exp)
      .replace(/__SUBURL__/g, subUrl)
      .replace(/__QR__/g, 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(subUrl));
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  }
  return new Response(b64, { headers: {
    'content-type': 'text/plain; charset=utf-8',
    'subscription-userinfo': 'upload=0; download=' + u.used + '; total=' + u.quota + '; expire=' + Math.floor(u.expire / 1000),
    'profile-update-interval': '6'
  } });
}
async function api(req, env, url, ip) {
  const p = url.pathname, m = req.method, now = Date.now();
  if (p === '/api/login' && m === 'POST') {
    const rlKey = 'rl:' + ip;
    const cntRaw = await env.PANEL.get(rlKey);
    const cnt = cntRaw ? parseInt(cntRaw, 10) : 0;
    if (cnt >= 8) return J({ error: 'تلاش بیش از حد، چند دقیقه صبر کنید' }, 429);
    const b = await req.json().catch(() => ({}));
    const pass = typeof b.password === 'string' ? b.password : '';
    const ok = pass.length > 0 && timingSafeEq(pass, env.ADMIN_PASSWORD);
    if (ok) {
      const token = randToken();
      await env.PANEL.put('s:' + token, '1', { expirationTtl: 2592000 });
      await env.PANEL.delete(rlKey).catch(function () {});
      return new Response('{"ok":true}', { headers: { 'content-type': 'application/json', 'set-cookie': 't=' + token + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000' } });
    }
    await env.PANEL.put(rlKey, String(cnt + 1), { expirationTtl: 300 });
    return J({ error: 'رمز اشتباه است' }, 401);
  }
  if (!(await authed(req, env))) return J({ error: 'unauthorized' }, 401);
  if (p === '/api/logout') {
    const c = req.headers.get('cookie') || '';
    const mm = c.split(';').map(x => x.trim()).find(x => x.startsWith('t='));
    if (mm) await env.PANEL.delete('s:' + mm.slice(2)).catch(function () {});
    return new Response('{}', { headers: { 'content-type': 'application/json', 'set-cookie': 't=; Path=/; Max-Age=0' } });
  }
  let b = {};
  if (m === 'POST' || m === 'PUT') b = await req.json().catch(() => ({}));
  const parts = p.split('/'), r = parts[2], id = parts[3], act = parts[4];
  if (r === 'stats') {
    const list = await listUsers(env);
    const s = { total: list.length, ok: 0, expired: 0, online: 0, used: 0 };
    for (const u of list) {
      s.used += u.used || 0;
      if (u.last_seen && u.last_seen > now - 300000) s.online++;
      const exp = (u.expire && u.expire <= now) || (u.quota && u.used >= u.quota);
      if (exp) s.expired++; else if (u.active) s.ok++;
    }
    return J(s);
  }
  if (r === 'users') {
    if (m === 'GET') { const l = await listUsers(env); l.sort((a, b2) => (b2.created || 0) - (a.created || 0)); return J(l); }
    if (m === 'POST' && !id) {
      const nid = crypto.randomUUID();
      const quota = Math.round((+b.quotaGB || 0) * 1073741824);
      const exp = +b.days > 0 ? now + b.days * 86400000 : 0;
      await saveUser(env, { id: nid, name: String(b.name || 'user').slice(0, 60), quota, used: 0, expire: exp, active: 1, created: now, last_seen: 0, last_ip: '' });
      return J({ id: nid });
    }
    if (m === 'POST' && act === 'reset') {
      const u = await getUser(env, id); if (!u) return J({ error: 'not found' }, 404);
      u.used = 0; await saveUser(env, u); return J({ ok: 1 });
    }
    if (m === 'PUT' && id) {
      const u = await getUser(env, id);
      if (!u) return J({ error: 'not found' }, 404);
      if (b.name != null) u.name = String(b.name).slice(0, 60);
      if (b.quotaGB != null && b.quotaGB !== '') u.quota = Math.round(+b.quotaGB * 1073741824);
      if (b.days != null && b.days !== '') u.expire = (+b.days > 0 ? now + b.days * 86400000 : 0);
      if (b.active != null) u.active = b.active ? 1 : 0;
      await saveUser(env, u); return J({ ok: 1 });
    }
    if (m === 'DELETE' && id) { await env.PANEL.delete('u:' + id); cache.delete(id); return J({ ok: 1 }); }
  }
  if (r === 'locations') {
    if (m === 'GET') return J(await listLocs(env));
    if (m === 'POST') {
      const nid = crypto.randomUUID().slice(0, 6);
      await env.PANEL.put('l:' + nid, JSON.stringify({ id: nid, name: String(b.name || 'loc').slice(0, 60), address: String(b.address || '').trim(), proxy_ip: String(b.proxy_ip || '').trim(), enabled: 1 }));
      return J({ id: nid });
    }
    if (m === 'PUT' && id) {
      const raw = await env.PANEL.get('l:' + id); if (!raw) return J({ error: 'not found' }, 404);
      const l = JSON.parse(raw); l.enabled = b.enabled ? 1 : 0;
      await env.PANEL.put('l:' + id, JSON.stringify(l)); return J({ ok: 1 });
    }
    if (m === 'DELETE' && id && id !== 'main') { await env.PANEL.delete('l:' + id); return J({ ok: 1 }); }
  }
  if (r === 'backup') {
    if (m === 'GET') return J({ users: await listUsers(env), locations: await listLocs(env) });
    if (m === 'POST') {
      const old = await listUsers(env); for (const u of old) await env.PANEL.delete('u:' + u.id);
      const oldL = await listLocs(env); for (const l of oldL) await env.PANEL.delete('l:' + l.id);
      for (const u of (b.users || [])) await env.PANEL.put('u:' + String(u.id), JSON.stringify({ id: String(u.id), name: String(u.name || ''), quota: +u.quota || 0, used: +u.used || 0, expire: +u.expire || 0, active: u.active ? 1 : 0, created: +u.created || now, last_seen: +u.last_seen || 0, last_ip: u.last_ip || '' }));
      for (const l of (b.locations || [])) await env.PANEL.put('l:' + String(l.id), JSON.stringify({ id: String(l.id), name: String(l.name || ''), address: String(l.address || ''), proxy_ip: String(l.proxy_ip || ''), enabled: l.enabled ? 1 : 0 }));
      await ensureMainLoc(env); cache.clear(); return J({ ok: 1 });
    }
  }
  return J({ error: 'not found' }, 404);
}
export default {
  async fetch(req, env, ctx) {
    try {
      const url = new URL(req.url);
      const ip = req.headers.get('cf-connecting-ip') || 'unknown';
      if (url.pathname === '/health') return J({ ok: 1, hasKV: !!env.PANEL, hasPw: !!env.ADMIN_PASSWORD });
      await ensureMainLoc(env);
      if ((req.headers.get('upgrade') || '').toLowerCase() === 'websocket') return await vless(req, env, ctx, url);
      const p = url.pathname;
      if (p === '/') return new Response(HTML, { headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'no-store' } });
      if (p.startsWith('/sub/')) return await sub(env, req, url, p.slice(5));
      if (p.startsWith('/api/')) return await api(req, env, url, ip);
      return new Response('Not found', { status: 404 });
    } catch (e) { return J({ error: String((e && e.message) || e), stack: String((e && e.stack) || '').slice(0, 600) }, 500); }
  }
};
