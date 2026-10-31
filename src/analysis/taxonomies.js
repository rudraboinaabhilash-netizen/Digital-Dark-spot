// Key points to look for, by topic type. p = priority (3 is highest), t = n (numbers), d (dates), b (yes/no wording).
function A(id,label,re,p,hint,t){return{id:id,label:label,re:new RegExp(re,"i"),p:p,hint:hint,t:t||"b"}}
var CATS={
scholarship:{n:"Scholarship",a:[
A("elig","Eligibility rules","eligib|qualif|criteria|open to|must be",3,"Confirm who can apply on the official notice.","b"),
A("inc","Income limit","income|family earn|annual earn",3,"Check the current income ceiling and which certificate proves it.","n"),
A("dl","Application deadline","deadline|last date|apply by|closes|due date|closing",3,"Find the current deadline on the official portal.","d"),
A("docs","Documents required","document|certificate|marksheet|proof|upload|submit",3,"Get the official document list, including formats and validity.","b"),
A("amt","Award amount","award|amount|stipend|worth|grant|receive|₹|rs\\.|\\$",2,"Confirm the exact amount and how often it is paid.","n"),
A("how","How to apply","portal|apply (?:online|through|at|via)|application form|website|link",3,"Locate the official application channel.","b"),
A("ren","Renewal conditions","renew|continuation|next year|retain|maintain",3,"Ask what marks or attendance you must keep to continue.","b"),
A("sel","Selection process","selection|shortlist|merit|interview|rank",2,"Find how winners are chosen and when results appear.","b"),
A("pay","Payment method and timing","disburs|credited|paid|direct benefit|bank account",2,"Check when and how money reaches you.","b"),
A("con","Official contact","helpline|contact|email|phone|grievance",1,"Note a helpline or email for questions.","b")]},
job:{n:"Job or internship",a:[
A("role","Role and duties","responsib|role|duties|you will|work on",2,"Confirm day-to-day work.","b"),
A("elig","Eligibility","eligib|qualif|degree|graduat|batch|required skills|must have",3,"Check degree, year, and skill requirements.","b"),
A("dl","Application deadline","deadline|last date|apply by|closes|closing",3,"Find the current closing date.","d"),
A("pay","Pay or stipend","salary|stipend|ctc|compensation|paid|lpa|per month",3,"Confirm the amount and any conditions.","n"),
A("sel","Selection process","interview|assessment|round|test|shortlist",2,"Learn the stages and timeline.","b"),
A("loc","Location and mode","location|remote|hybrid|on-site|onsite|office",2,"Confirm where you must work.","b"),
A("dur","Duration","duration|months|weeks|tenure",2,"Check length and start date.","n"),
A("docs","Documents","document|resume|transcript|certificate|proof",1,"List what to upload or bring.","b"),
A("conv","Conversion or next steps","full-time|conversion|ppo|offer",1,"Ask what happens after.","b"),
A("con","Official contact","contact|email|recruit|helpline",1,"Find a recruiter contact.","b")]},
course:{n:"Course or admission",a:[
A("elig","Eligibility","eligib|qualif|minimum|criteria",3,"Check entry requirements.","b"),
A("fee","Fees","fee|tuition|cost|₹|rs\\.|\\$",3,"Confirm the full cost including hidden fees.","n"),
A("dl","Deadline","deadline|last date|apply by|closes|closing",3,"Find the current deadline.","d"),
A("dur","Duration","duration|years|semester|months",2,"Check length and schedule.","n"),
A("docs","Documents","document|transcript|certificate|proof",2,"Get the official document list.","b"),
A("acc","Accreditation","accredit|recogni|approved|naac|aicte|ugc",3,"Verify recognition with the regulator.","b"),
A("sel","Selection process","entrance|merit|interview|cutoff|rank",2,"Learn how seats are filled.","b"),
A("aid","Scholarships and aid","scholarship|financial aid|waiver",1,"Ask about aid.","b"),
A("con","Official contact","contact|helpline|email|admission office",1,"Find the admissions contact.","b")]},
service:{n:"Public service",a:[
A("elig","Who can apply","eligib|entitled|eligible|citizen|resident",3,"Confirm eligibility.","b"),
A("docs","Documents required","document|proof|id|certificate|aadhaar|passport",3,"Get the official list.","b"),
A("fee","Fees","fee|charge|free of cost|₹|rs\\.|\\$",2,"Confirm the fee.","n"),
A("time","Processing time","processing|within \\d+|working days|takes",3,"Check expected time.","n"),
A("how","Where to apply","portal|office|counter|online|apply at",3,"Find the official channel.","b"),
A("dl","Deadline or validity","deadline|valid|validity|expires|renew",2,"Check validity and renewal.","d"),
A("grv","Grievance contact","grievance|helpline|complaint|contact|email",2,"Note where to escalate.","b")]},
research:{n:"Research or claim",a:[
A("meth","Method","method|study design|experiment|survey|trial",3,"Check how the evidence was gathered.","b"),
A("size","Sample size","sample|participants|n\\s?=|respondents",3,"Check how many were studied.","n"),
A("per","Time period","between|during|period|from \\d{4}|in \\d{4}",2,"Check when data was collected.","d"),
A("fund","Funding and conflicts","funded|funding|sponsor|conflict of interest",3,"Check who paid for it.","b"),
A("lim","Limitations","limitation|caveat|bias|cannot|however",2,"Look for stated limits.","b"),
A("peer","Peer review","peer-review|peer review|journal|published in|preprint",3,"Check whether it was reviewed.","b"),
A("rep","Replication","replicat|reproduc|confirmed by|independent",2,"Search for independent results.","b")]},
business:{n:"Business or vendor",a:[
A("price","Pricing","price|pricing|cost|per month|₹|rs\\.|\\$|fee",3,"Get a written quote.","n"),
A("terms","Contract terms","contract|terms|agreement|lock-in|minimum term",3,"Read the full terms.","b"),
A("can","Cancellation and refunds","cancel|refund|return",3,"Check exit costs.","b"),
A("lic","Licences and compliance","licen|registered|compliance|certified|gst",3,"Verify registration.","b"),
A("sup","Support","support|helpline|sla|response time",2,"Check support hours.","b"),
A("sec","Data and security","privacy|security|data|encrypt",2,"Ask how data is handled.","b"),
A("ref","Independent reviews","review|rating|testimonial|customer",2,"Find reviews outside their site.","b")]},
general:{n:"Something else",a:[
A("who","Who is involved","who|organi[sz]ation|authority|department|company",2,"Identify the responsible party.","b"),
A("when","Dates and timing","deadline|date|by|until|valid",3,"Find current dates.","d"),
A("cost","Cost","cost|fee|price|free|₹|rs\\.|\\$",2,"Confirm costs.","n"),
A("how","How to proceed","apply|steps|process|register|contact",3,"Find the official process.","b"),
A("lim","Conditions and exceptions","except|unless|only if|conditions|limit",3,"Look for fine print.","b"),
A("off","Official source","official|government|\\.gov|\\.edu|\\.ac\\.",3,"Find the primary source.","b")]}};

export { CATS };
