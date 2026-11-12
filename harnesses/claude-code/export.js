// Export the atlas page's data block to a harness-neutral JSON file.
const fs = require("fs");
const [,, htmlPath, outPath] = process.argv;
const html = fs.readFileSync(htmlPath, "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const start = script.indexOf("const SRC = {");
const end = script.indexOf("/* ---------- state + helpers");
const block = script.slice(start, end);
const d3 = new Proxy({ max:(a,f)=>Math.max(...a.map(f||(x=>x))) }, { get:(t,k)=>k in t ? t[k] : k });
const ctx = new Function("d3", block + "; return {SRC,LABS,M,TABLES,OPEN,INDEX,LADDERS,SPEED,TB4,CASES,OSW,CURSOR,AGENTS,REF};")(d3);
const {SRC,LABS,M,TABLES,OPEN,INDEX,LADDERS,SPEED,TB4,OSW,CURSOR,AGENTS,REF} = ctx;

const ID = {opus55:"claude-opus-5-5",sonnet55:"claude-sonnet-5-5",haiku55:"claude-haiku-5-5",fable51:"claude-fable-5-1",mythos51:"claude-mythos-5-1",opus5:"claude-opus-5",fable5:"claude-fable-5",
  astra:"gpt-6-astra",sol61:"gpt-6-1-sol",luna:"gpt-6-luna",astra61:"gpt-6-1-astra",gpt56sol:"gpt-5-6-sol",argon:"gemini-4-argon",flash38:"gemini-3-8-flash",
  grok47:"grok-4-7",grok46:"grok-4-6",composer25:"cursor-composer-2-5",wonderfull:"muse-wonder-full",wonder:"muse-wonder",spark13:"muse-spark-1-3",sparkopen:"muse-spark-open",
  fable52:"claude-fable-5-2",mythos52:"claude-mythos-5-2",terra:"gpt-6-1-terra",carbon:"gemini-4-carbon",hydrogen:"gemini-4-hydrogen",ember:"muse-ember"};
const missing = Object.keys(M).filter(k=>!ID[k]); if (missing.length) throw new Error("No export id for: "+missing.join(", "));
const LABNAME = {anthropic:"Anthropic",openai:"OpenAI",google:"Google",xai:"SpaceXAI (xAI) + Cursor",meta:"Meta"};
const refBy = Object.fromEntries(REF.map(r=>[r.m,r]));
const models = Object.entries(M).map(([k,m])=>{ const r=refBy[k]||{}; return {id:ID[k], name:m.n, lab:LABNAME[m.lab], released:r.rel||null, access:r.acc||null, price_in_per_mtok:r.pin??null, price_out_per_mtok:r.pout??null}; });
const scores = [];
const add = s => scores.push(Object.assign({setting:null, note:null}, s));
for (const t of Object.values(TABLES)) {
  for (const [b,unit,vals,srcNote] of t.rows) vals.forEach((v,i)=>{ if(v==null) return; const m=t.cols[i];
    add({model:ID[m], benchmark:b, value:v, unit, reporter:LABNAME[t.lab], kind: M[m].lab===t.lab ? "claim" : "rival-table", source:t.src[0], note:`${t.title}; who ran it: ${srcNote}`}); });
}
for (const d of TB4) {
  // claims already exported from a launch table are skipped; the rest come from the lab page named here
  const claimSrc = {sonnet55:"anthSonnet", haiku55:"anthHaiku", terra:"oaiTerra"};
  if (!["opus55","astra","argon","wonderfull","wonder","fable51","grok47","carbon","ember"].includes(d.m)) {
    if (!claimSrc[d.m]) throw new Error("No claim source for Terminal-Bench row "+d.m);
    add({model:ID[d.m], benchmark:"Terminal-Bench 4.0", value:d.self.v, unit:"pct", reporter:LABNAME[M[d.m].lab], kind:"claim", source:claimSrc[d.m], note:d.self.n});
  }
  if (d.m==="fable51") add({model:ID[d.m], benchmark:"Terminal-Bench 4.0", value:d.self.v, unit:"pct", reporter:"Anthropic", kind:"claim", source:"anthFable", note:d.self.n});
  if (d.aa) add({model:ID[d.m], benchmark:"Terminal-Bench 4.0", value:d.aa.v, unit:"pct", reporter:"Artificial Analysis", kind:"independent", source: d.aa.src || (d.m==="sonnet55"?"aaSonnet":"aaMuse"), note:d.aa.n});
}
// Muse Spark Open card: Meta compared it only with open-weight models outside this atlas, so only its own figures are exported
for (const [b,unit,v,rn,rv,aa] of OPEN.rows) {
  add({model:ID[OPEN.model], benchmark:b, value:v, unit, reporter:"Meta", kind:"claim", setting:OPEN.setting, source:OPEN.src[0], note:`Muse Spark Open card; best open-weight rival in Meta's table: ${rn} ${rv}`});
  if (aa!=null && b!=="AA Intelligence Index") add({model:ID[OPEN.model], benchmark:b, value:aa, unit, reporter:"Artificial Analysis", kind:"independent", setting:OPEN.setting, source:"aaBoard", note:"AA leaderboard data, read 26 Oct 2026, rounded to one decimal"});
}
add({model:ID[OPEN.model], benchmark:"Terminal-Bench 4.0", value:OPEN.tb4aa, unit:"pct", reporter:"Artificial Analysis", kind:"independent", setting:OPEN.setting, source:"aaBoard", note:"AA leaderboard data, read 26 Oct 2026; Meta's card reports Terminal-Bench 2.1 instead"});
for (const [m,ladder] of Object.entries(LADDERS)) for (const [e,v,c] of ladder)
  add({model:ID[m], benchmark:"AA Intelligence Index v5.0.1", value:v, unit:"pts", reporter:"Artificial Analysis", kind:"independent", setting:e, source:"aaBoard", note:`cost per index task USD ${c}; leaderboard read 12 Nov 2026`, cost_per_task_usd:c});
add({model:ID.wonderfull, benchmark:"AA Intelligence Index v5.0.1", value:INDEX.find(d=>d.m==="wonderfull").v, unit:"pts", reporter:"Artificial Analysis", kind:"independent", setting:"max", source:"aaBoard", note:"not priced per token; leaderboard read 12 Nov 2026"});
for (const r of OSW) for (const [variant,[v,n]] of Object.entries(r.c))
  add({model:ID[r.m], benchmark:`OSWorld ${variant}`, value:v, unit:"pct", reporter:n.split(/[,;]/)[0], kind:"variant-map", source:null, note:n});
for (const d of CURSOR) add({model:ID[d.m], benchmark:"CursorBench 4.0", value:d.v, unit:"pct", reporter:"Cursor", kind:"independent", setting:d.e||null, source:"cursorBoard", note:d.n});
for (const d of AGENTS) add({model:ID[d.m], benchmark:"AA Coding Agents Index", value:d.v, unit:"pts", reporter:"Artificial Analysis", kind:"independent", setting:d.l, source:"aaMuse", note:"model plus agent harness"});
const sources = Object.entries(SRC).map(([id,s])=>({id, title:s.t, url:s.u, type:{lab:"lab",ind:"independent",sec:"secondary"}[s.k], retrieved_directly: !/not retrievable/.test(s.t) && s.k!=="sec" ? true : s.k==="sec" ? "secondary report" : false}));
const out = {schema:"frontier-atlas/0.1",
  harness:{id:"claude-code", name:"Claude Code (desktop app)", model:"claude-opus-5-5", computer:"surface-arm", compiled:"2026-11-12", revision:4, first_compiled:"2026-10-13", first_computer:"surface-arm"},
  models, scores, sources};
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`models ${models.length} · scores ${scores.length} · sources ${sources.length}`);
