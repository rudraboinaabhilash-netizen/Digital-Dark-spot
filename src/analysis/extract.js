// Text helpers: sentences, numbers, dates, documents.
var MON="jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec";
function sents(t){return t.split(/(?<=[.!?])\s+|\n+/).map(function(s){return s.trim()}).filter(Boolean)}
function nums(s){var m=s.match(/(?:₹|rs\.?\s?|\$)?\d[\d,]*(?:\.\d+)?\s?(?:%|lakhs?|k\b|months?|years?|days?|weeks?)?/gi)||[];
return m.map(function(x){return x.toLowerCase().replace(/rs\.?|[\s,₹$]/g,"").replace(/lakhs/,"lakh")}).filter(function(x){return x&&(/[%a-z]/.test(x)||x.replace(/\D/g,"").length>=3)&&!/^(19|20)\d\d$/.test(x)})}
var DRE=new RegExp("\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:"+MON+")[a-z]*\\.?,?\\s*(?:\\d{4})?|\\b(?:"+MON+")[a-z]*\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?,?\\s*(?:\\d{4})?|\\b\\d{1,2}[\\/\\-.]\\d{1,2}[\\/\\-.]\\d{2,4}\\b","gi");
function dates(s){var m=s.match(DRE)||[];return m.map(function(x){var t=null,c=x.replace(/(\d)(st|nd|rd|th)/i,"$1").trim(),f=c.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
if(f){var y=+f[3];if(y<100)y+=2000;t=new Date(y,f[2]-1,+f[1]).getTime()}else if(/\d{4}/.test(c)){var p=Date.parse(c);if(!isNaN(p))t=p}
return{txt:x.trim(),t:t,key:t?new Date(t).toISOString().slice(0,10):c.toLowerCase().replace(/[.,]/g,"")}})}
function fmt(d){return d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}

function short(s){return s.length>170?s.slice(0,167)+"…":s}
var DT=["income certificate","caste certificate","marksheet","transcript","aadhaar","passport","photo","bank passbook","bank statement","id proof","domicile","resume","recommendation letter","admission letter","fee receipt"];
function docs(t){t=t.toLowerCase().replace(/mark[ -]sheet/g,"marksheet").replace(/aadhar\b/g,"aadhaar");return DT.filter(function(d){return t.indexOf(d)>-1})}
var quote=function(t){return"“"+short(t)+"”"};

export { sents, nums, dates, fmt, short, docs, quote };
