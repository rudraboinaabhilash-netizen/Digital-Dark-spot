// Source dates and application cycles.
import { dates } from "./extract.js";

var TODAY=new Date();
function srcDate(s){if(s.d)return{d:new Date(s.d),how:"entered by you"};var m=s.t.match(/(?:updated|published|posted|as of|last reviewed|dated)[^.\n]{0,30}/i);
if(m){var ds=dates(m[0]);if(ds[0]&&ds[0].t)return{d:new Date(ds[0].t),how:"found in text"};var y=m[0].match(/\b(20\d\d)\b/);if(y)return{d:new Date(+y[1],6,1),how:"year only"}}return null}

function cycleOf(t){var cs=TODAY.getMonth()>=5?TODAY.getFullYear():TODAY.getFullYear()-1,re=/\b(20\d\d)\s?[-–\/]\s?(20\d\d|\d\d)\b/g,m;
while((m=re.exec(t))){if((+m[2]%100)===((+m[1]+1)%100))return{txt:m[0],old:+m[1]<cs}}
m=t.match(/\b(?:cycle|batch|session|intake|academic year)\s*(?:of\s*)?(20\d\d)\b/i)||t.match(/\b(20\d\d)\s*(?:cycle|batch|session|intake)\b/i);return m?{txt:m[0],old:+m[1]<cs}:null}

export { TODAY, srcDate, cycleOf };
