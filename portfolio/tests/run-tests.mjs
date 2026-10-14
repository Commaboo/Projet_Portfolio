/* =========================================================
   TESTS AUTOMATISÉS DU PORTFOLIO
   Lancement : npm install --save-dev puppeteer  puis  npm test
   Vérifie : erreurs console, 404, IDs uniques, titres, SEO (title,
   description, Open Graph, favicon), navigation, thème, menu mobile,
   responsive, scénario complet de la page Projets, formulaire et liens.
   ========================================================= */
import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.pdf':'application/pdf', '.xml':'application/xml', '.txt':'text/plain', '.svg':'image/svg+xml' };
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(8099);
const BASE='http://localhost:8099/';
const pages = ['index.html','src/pages/about.html','src/pages/projects.html','src/pages/wip.html','src/pages/contact.html','src/projet/resume/resume.html'];
const browser = await puppeteer.launch({ headless: true });
const results=[]; const R=(page,test,ok,info='')=>{results.push({page,test,ok,info}); console.log(ok?'PASS':'FAIL', page,'|',test, info?'| '+info:'');};

async function open(p, vw={width:1280,height:900}) {
  const page = await browser.newPage(); await page.setViewport(vw);
  const errors=[]; const bad=[];
  page.on('pageerror', e=>errors.push(e.message));
  page.on('console', m=>{ if(m.type()==='error') errors.push(m.text()); });
  page.on('response', r=>{ if(r.status()>=400) bad.push(r.status()+' '+r.url()); });
  await page.goto(BASE+p,{waitUntil:'networkidle0'});
  return {page, errors, bad};
}
const vis = (page, sel) => page.$eval(sel, el => { const s=getComputedStyle(el); const r=el.getBoundingClientRect(); return s.display!=='none' && s.visibility!=='hidden' && r.width>0 && r.height>0; }).catch(()=>false);

// --- Per-page generic checks
for (const p of pages) {
  const {page, errors, bad} = await open(p);
  R(p,'Aucune erreur JS console au chargement', errors.length===0, errors.join(' ; '));
  R(p,'Aucune ressource en 404', bad.length===0, bad.join(' ; '));
  const ids = await page.$$eval('[id]', els=>{const c={};els.forEach(e=>c[e.id]=(c[e.id]||0)+1);return Object.entries(c).filter(([k,v])=>v>1).map(([k])=>k);});
  R(p,'IDs uniques', ids.length===0, ids.join(','));
  const h1 = await page.$$eval('h1', e=>e.length);
  R(p,'Exactement un <h1>', h1===1, 'h1='+h1);
  const skips = await page.$$eval('h1,h2,h3,h4,h5,h6', els=>{let prev=0,out=[];els.forEach(e=>{const l=+e.tagName[1]; if(prev && l>prev+1) out.push(e.tagName+':'+e.textContent.trim().slice(0,30)); prev=l;}); return out;});
  R(p,'Hiérarchie des titres sans saut', skips.length===0, skips.join(' ; '));
  const meta = await page.evaluate(()=>({d:document.querySelector('meta[name=description]')?.content||'', t:document.title, og:!!document.querySelector('meta[property="og:title"]'), fav:!!document.querySelector('link[rel~=icon]'), canon:!!document.querySelector('link[rel=canonical]')}));
  R(p,'Meta description présente', !!meta.d, meta.d.slice(0,60));
  R(p,'Title descriptif (≥ 15 caractères)', meta.t.length>=15, meta.t);
  R(p,'Open Graph', meta.og); R(p,'Favicon', meta.fav); R(p,'URL canonique', meta.canon);
  // desktop nav visible
  if (!p.includes('resume')) R(p,'Navigation desktop visible (1280px)', (await vis(page,'#nav-links')) || (await vis(page,'.site-nav div.md\\:flex')));
  // theme button
  const tb = await page.$('[data-theme-toggle], #theme-button');
  if (tb) {
    const before = await page.evaluate(()=>document.documentElement.className+'|'+document.body.className);
    const btns = await page.$$('[data-theme-toggle], #theme-button'); let clicked=false;
    for (const b of btns) { if (await b.isIntersectingViewport().catch(()=>false) && await b.evaluate(e=>e.offsetParent!==null)) { await b.click(); clicked=true; break; } }
    await new Promise(r=>setTimeout(r,200));
    const after = await page.evaluate(()=>document.documentElement.className+'|'+document.body.className);
    R(p,'Bouton thème change le thème (desktop)', clicked && before!==after, before+' -> '+after);
  } else R(p,'Bouton thème présent', false, 'absent');
  // keyboard focus visible on first link
  await page.keyboard.press('Tab');
  const focus = await page.evaluate(()=>{const e=document.activeElement; const s=getComputedStyle(e); return {tag:e.tagName, outline:s.outlineStyle+' '+s.outlineWidth, shadow:s.boxShadow};});
  R(p,'Focus clavier visible (1er Tab)', focus.outline!=='none 0px' || focus.shadow!=='none', JSON.stringify(focus));
  await page.close();

  // mobile
  const m = await open(p,{width:375,height:812,isMobile:true,hasTouch:true});
  const mb = await m.page.$('#menu-button');
  if (mb) {
    await mb.tap(); await new Promise(r=>setTimeout(r,300));
    const menuSel = p.includes('resume') ? '#nav-links' : '#mobile-menu';
    R(p,'Menu mobile s\'ouvre au toucher (375px)', await vis(m.page, menuSel));
  }
  const overflow = await m.page.evaluate(()=>document.documentElement.scrollWidth > window.innerWidth+1);
  R(p,'Pas de défilement horizontal (375px)', !overflow);
  await m.page.close();
}

// --- Projects page checklist
{
  const {page, errors} = await open('src/pages/projects.html');
  R('projects','Registre fermé au chargement', await page.$eval('#registry-toggle',e=>e.getAttribute('aria-expanded'))==='false' && !(await page.$eval('#project-list',e=>e.classList.contains('expanded'))));
  const listH = await page.$eval('#project-list', e=>({h:e.getBoundingClientRect().height, o:getComputedStyle(e).opacity}));
  R('projects','Aucune carte visible registre fermé', listH.h<1 || listH.o==='0', JSON.stringify(listH));
  R('projects','Message d\'invitation visible au chargement', await vis(page,'#project-empty'));
  R('projects','Contenu projet (CV) masqué au chargement', !(await vis(page,'#project-content')));
  await page.click('#registry-toggle'); await new Promise(r=>setTimeout(r,600));
  const n = await page.$$eval('.project-card-item', els=>els.filter(e=>e.getBoundingClientRect().height>0).length);
  R('projects','Registre ouvert : 4 projets listés', n===4, 'n='+n);
  R('projects','Aucun projet sélectionné à l\'ouverture', (await page.$$('.project-card-item.selected')).length===0);
  await page.click('.project-card-item[data-project-id="python"]'); await new Promise(r=>setTimeout(r,300));
  R('projects','Sélection « Parcours Python » affiche le bon titre', (await page.$eval('#project-title',e=>e.textContent))==='Parcours Python');
  R('projects','Registre refermé après sélection', await page.$eval('#registry-toggle',e=>e.getAttribute('aria-expanded'))==='false');
  await page.click('#registry-toggle'); await new Promise(r=>setTimeout(r,600));
  const sel = await page.$eval('.project-card-item.selected', e=>({id:e.dataset.projectId, bc:getComputedStyle(e).borderColor})).catch(()=>null);
  R('projects','Projet sélectionné toujours surligné après réouverture', sel?.id==='python', JSON.stringify(sel));
  await page.click('.project-card-item[data-project-id="role-fairies"]'); await new Promise(r=>setTimeout(r,300));
  const selIds = await page.$$eval('.project-card-item.selected', els=>els.map(e=>e.dataset.projectId));
  R('projects','Changer de projet déplace la surbrillance', JSON.stringify(selIds)==='["role-fairies"]', JSON.stringify(selIds));
  await page.click('[data-action="journey"]'); await new Promise(r=>setTimeout(r,200));
  R('projects','« Parcours » affiche l\'histoire', (await page.$eval('#detail-content',e=>e.textContent)).includes('Three.js'));
  await page.click('[data-action="skills"]'); await new Promise(r=>setTimeout(r,200));
  R('projects','« Compétences » → objectifs (projet en cours)', (await page.$eval('#detail-title',e=>e.textContent))==="Objectifs d'apprentissage");
  await page.click('[data-action="preview"]'); await new Promise(r=>setTimeout(r,200));
  R('projects','Preview indisponible → message explicite', (await page.$eval('#detail-content',e=>e.textContent)).includes('Preview indisponible'));
  await page.click('#github-cat'); await new Promise(r=>setTimeout(r,200));
  R('projects','Chat GitHub avec projet → message', (await page.$eval('#github-message',e=>!e.classList.contains('hidden') && e.textContent)).toString().includes('Rôle'));
  // drag & drop simulated
  await page.evaluate(()=>{ const card=document.querySelector('.project-card-item[data-project-id="portfolio"]'); const desk=document.querySelector('.mage-desk'); const dt=new DataTransfer(); card.dispatchEvent(new DragEvent('dragstart',{bubbles:true,dataTransfer:dt})); desk.dispatchEvent(new DragEvent('dragover',{bubbles:true,cancelable:true,dataTransfer:dt})); desk.dispatchEvent(new DragEvent('drop',{bubbles:true,cancelable:true,dataTransfer:dt})); card.dispatchEvent(new DragEvent('dragend',{bubbles:true,dataTransfer:dt}));});
  R('projects','Glisser-déposer sélectionne le projet', (await page.$eval('#project-title',e=>e.textContent))==='Portfolio personnel');
  // CV preview
  await page.click('#registry-toggle'); await new Promise(r=>setTimeout(r,600));
  await page.click('.project-card-item[data-project-id="cv"]'); await new Promise(r=>setTimeout(r,300));
  await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}).catch(()=>{}), page.click('[data-action="preview"]')]);
  const url = page.url(); const st = await page.evaluate(()=>document.title);
  R('projects','« Preview » du CV ouvre resume.html', url.endsWith('/src/projet/resume/resume.html'), url+' ('+st+')');
  R('projects','Pas d\'erreur JS pendant le scénario', errors.length===0, errors.join(' ; '));
  await page.close();
  // github without project
  const g = await open('src/pages/projects.html');
  await g.page.click('#github-cat'); await new Promise(r=>setTimeout(r,200));
  R('projects','Chat GitHub sans projet → invite à sélectionner', (await g.page.$eval('#github-message',e=>e.textContent)).includes('Sélectionne'));
  await g.page.close();
}

// --- Contact: form validation & CV download link
{
  const {page} = await open('src/pages/contact.html');
  await page.click('#scroll-open'); await new Promise(r=>setTimeout(r,900));
  R('contact','Parchemin s\'ouvre', await vis(page,'#contact-form'));
  const valid = await page.$eval('#contact-form', f=>f.checkValidity());
  R('contact','Formulaire vide refusé (validation)', valid===false);
  const cv = await page.$eval('a[download]', a=>a.href);
  const st = await page.evaluate(async u=> (await fetch(u)).status, cv);
  const size = await page.evaluate(async u=> (await (await fetch(u)).arrayBuffer()).byteLength, cv);
  R('contact','Lien de téléchargement du CV PDF valide', st===200 && size>1000, cv+' -> '+st+', '+size+' octets');
  await page.close();
}

// --- Link checker (internal links on all pages)
{
  const page = await browser.newPage(); const checked=new Map();
  for (const p of pages) {
    await page.goto(BASE+p,{waitUntil:'domcontentloaded'});
    const links = await page.$$eval('a[href]', as=>as.map(a=>({h:a.getAttribute('href'), abs:a.href, t:a.textContent.trim().replace(/\s+/g,' ').slice(0,40)})));
    for (const l of links) {
      if (l.h.startsWith('#')) { const ok = await page.$(l.h).then(Boolean).catch(()=>false); if(!ok) R(p,'Ancre '+l.h, false); continue; }
      if (!/^https?:/.test(l.abs)) { if(!/^(mailto|tel):/.test(l.h)) R(p,'Lien protocole invalide', false, l.h+' ('+l.t+')'); continue; }
      if (!l.abs.startsWith(BASE)) continue;
      const u=l.abs.split('#')[0]; if(!checked.has(u)) checked.set(u, await page.evaluate(async u=>(await fetch(u)).status,u));
      if (checked.get(u)!==200) R(p,'Lien interne cassé', false, l.h+' -> '+checked.get(u));
    }
  }
  R('global','Liens internes vérifiés', true, checked.size+' URL uniques');
  await page.close();
}
await browser.close();
server.close();
const failed = results.filter(r => !r.ok);
console.log('\nTOTAL', (results.length - failed.length) + '/' + results.length, 'PASS');
// L'URL canonique dépend de l'adresse de déploiement : elle est signalée sans faire échouer la suite.
process.exitCode = failed.filter(r => r.test !== 'URL canonique').length ? 1 : 0;
