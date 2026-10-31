// Core analysis: coverage, conflicts, recency, gaps, prioritized checklist.
import { CATS } from "./taxonomies.js";
import { sents, nums, dates, fmt, docs } from "./extract.js";
import { TODAY, srcDate, cycleOf } from "./recency.js";

var NEG=/\b(not (?:required|mandatory|needed|necessary)|no need|optional|waived|exempt)\b/i,POS=/\b(required|mandatory|must|compulsory|need to)\b/i;

// "not required" contains "required", so strip negations before looking for requirement wording.
function posOnly(t){return POS.test(t.replace(new RegExp(NEG.source,"gi"),""))}

export function analyse(catKey,src){
var C=CATS[catKey],S=[];src.forEach(function(x){var t=x.t.trim();if(!t)return;S.push({i:S.length,l:x.l.trim()||("Source "+(S.length+1)),d:x.d,t:t,ss:sents(t)})});
S.forEach(function(s){s.cyc=cycleOf(s.t);s.dt=srcDate(s);s.age=s.dt?(TODAY-s.dt.d)/(30.4*864e5):null});
var cov=C.a.map(function(a){return{a:a,h:S.map(function(s){var m=s.ss.filter(function(x){return a.re.test(x)});return m})}});
var cf=[],exp=[];
cov.forEach(function(r){var a=r.a,hit=[];r.h.forEach(function(m,i){if(m.length)hit.push(i)});
if(hit.length>1){for(var x=0;x<hit.length;x++)for(var y=x+1;y<hit.length;y++){var i=hit[x],j=hit[y],mi=r.h[i],mj=r.h[j],why=null;
if(a.t==="n"||a.t==="d"){var f=a.t==="n"?nums:function(q){return dates(q).map(function(z){return z.key})};
var si=f(mi.join(" ")),sj=f(mj.join(" "));
if(si.length&&sj.length&&!si.some(function(v){return sj.indexOf(v)>-1}))why="Different values: "+si.slice(0,3).join(", ")+" vs "+sj.slice(0,3).join(", ")}
if(!why&&a.id==="docs"){var di=docs(mi.join(" ")),dj=docs(mj.join(" ")),ui=di.filter(function(v){return dj.indexOf(v)<0}),uj=dj.filter(function(v){return di.indexOf(v)<0});if(ui.length&&uj.length)why="Different documents listed: "+di.join(", ")+" vs "+dj.join(", ")}
if(!why){var ni=NEG.test(mi.join(" ")),pi=posOnly(mi.join(" ")),nj=NEG.test(mj.join(" ")),pj=posOnly(mj.join(" "));
if((ni&&!pi&&pj&&!nj)||(nj&&!pj&&pi&&!ni))why="One source says it is required, the other says it is not"}
if(why)cf.push({a:a,i:i,j:j,qi:mi[0],qj:mj[0],why:why})}}
if(a.t==="d")r.h.forEach(function(m,i){m.forEach(function(q){dates(q).forEach(function(z){if(z.t&&z.t<TODAY&&!exp.some(function(v){return v.i===i&&v.k===z.key}))exp.push({i:i,k:z.key,txt:z.txt,q:q,t:z.t})})})})});
var gaps=cov.filter(function(r){return!r.h.some(function(m){return m.length})}),single=cov.filter(function(r){return r.h.filter(function(m){return m.length}).length===1});
var off=S.some(function(s){return/\.gov|\.edu|\.ac\.|official|portal|\.nic\./i.test(s.l)});
var items=[];
if(!off&&S.length)items.push({p:85,t:"Find the official source",w:"None of your sources looks official from its name or link. Locate the organisation’s own page before relying on any of them."});
exp.forEach(function(x){items.push({p:100,t:"Replace the expired date “"+x.txt+"”",w:S[x.i].l+" mentions a date that has already passed. Find the current date on the official page."})});
cf.forEach(function(c){items.push({p:90+c.a.p,t:"Resolve conflict on: "+c.a.label.toLowerCase(),w:S[c.i].l+" and "+S[c.j].l+" disagree. "+c.a.hint})});
gaps.forEach(function(r){items.push({p:r.a.p===3?80:r.a.p===2?60:40,t:"Find out: "+r.a.label.toLowerCase(),w:"No source mentions this. "+r.a.hint})});
single.forEach(function(r){var i=r.h.findIndex(function(m){return m.length});items.push({p:45+r.a.p*3,t:"Confirm "+r.a.label.toLowerCase()+" with a second source",w:"Only "+S[i].l+" covers this."})});
S.forEach(function(s){if(!s.dt)items.push({p:50,t:"Check when “"+s.l+"” was written",w:"It has no date, so its details could be out of date."});else if(s.age>12)items.push({p:55,t:"Treat “"+s.l+"” as possibly outdated",w:"Dated "+fmt(s.dt.d)+" ("+Math.round(s.age)+" months ago). Re-check anything time-sensitive."})});
S.forEach(function(s){if(s.cyc&&s.cyc.old)items.push({p:70,t:"Check whether “"+s.l+"” is about an earlier cycle",w:"It refers to “"+s.cyc.txt+"”. Make sure its details apply to the current cycle."})});
items.sort(function(a,b){return b.p-a.p});
return{C:C,S:S,cov:cov,cf:cf,exp:exp,gaps:gaps,single:single,items:items,off:off}}
