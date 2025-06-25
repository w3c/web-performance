## Participants

* Nic Jansma, Patrick Meenan, Yoshisato Yanagisawa, Keita Suzuki, Shunya Shishido, Guohui Deng, Jacob Groß, Bas Schouten, Michal Mocny, Dan Shappir, Abshishek Ghosh, Andy Luhrs, Benjamin De Kosnik, Carine, Dave Hunt, Nazim Can Altinova, Philip Tellis

## Admin

* Next call \- June 5th 1pm EST / 10am PST  
* Issue triage results (May 9th)  
* TPAC poll on attendance? Nov 10-14

## Minutes

### ServiceWorker Static Routing

* Keita: ServiceWorker Static Routing API in Resource Timings  
* … Running in Origin Trial (OT)  
* … Collecting OT feedback  
* … Started writing draft spec changes, starting on Service Worker side  
* … Next would be updates to ResourceTiming spec  
* … On OT, getting positive feedback on features  
* … Developers thought matching was helpful  
* … Would like to see them in Chrome fully  
* … Another feedback is developers interested in router evaluation start time  
* … We initially thought this might be negligible  
* … Typically in microsecond measured  
* … But developers are interested in seeing if it is negligible  
* … Other minor things, implementation and inconsistencies in field names  
* … Feedback that in some situations fetchStart is smaller than router evaluation start time, which it should be the other way around  
* … Probably a Chrome implementation detail  
* … Feedback was otherwise positive  
* … Plan right now for this feature is for spec changes and address OT feedback  
* … Plan to ship in Chromium  
* Yoav: For static routing evaluation  
* … Is feedback that people want this, or that people found the data useful?  
* … Did people find complex routes and simplify them given the data, or just something they want to collect because they like data  
* Keita: Former given feedback, interested in learning if it is a problem or not at all  
* … Without field they’re not sure it’s something to look into, we should ask if it’s actionable  
* Yoav: Useful as an assurance  
* Keita: Feedback is not a ton of complex rules, trying to avoid Fetch  
* … Trying to get feedback from more complex router rules  
* Yoav: Have other vendors looked into this  
* Bas: (no)  
* … link?  
* Yoav: [https://github.com/w3c/resource-timing/issues/389](https://github.com/w3c/resource-timing/issues/389)  
* Yoshisato Yanagisawa: FYI ServiceWorker spec change: [https://github.com/w3c/ServiceWorker/pull/1769](https://github.com/w3c/ServiceWorker/pull/1769)  
* … fetchStart issue: [https://issues.chromium.org/issues/407627094](https://issues.chromium.org/issues/407627094)   
* Yoav: Explainer: [https://github.com/WICG/service-worker-static-routing-api/blob/main/resource-timing-api.md](https://github.com/WICG/service-worker-static-routing-api/blob/main/resource-timing-api.md) 

### [Reporting API Decoupling from Crash/Intervention/Deprecation](https://github.com/w3c/reporting/issues/263)

* Yoav: Older issue from triage  
* … Reporting API is defined in Working Group as an infrastructure feature  
* … But when it first started out, there were a few reports attached to it by default  
* … Crash, intervention, deprecation reports  
* … Spun off, implemented to some extent in Chromium  
* … All of those features send reports to default defined endpoint in Reporting API  
* … If you send out Reporting header, with name of “default” you’ll get Crash/Intervention/Deprecation reporting by default, as well as anything else  
* … (for example CSP, COEP, reports etc)  
* … Seems that this isn’t great, would be good to give people some knobs to configure for those types of reports  
* … But this is already shipped  
* … Config for Reporting API is through other headers (Reporting-Endpoints), then CSP can use specific endpoints (same for COEP)  
* … We don’t have headers for C/I/D reports specifically  
* … What I was thinking as a simple way of moving these reports, to split them out, would those different reports have well-defined endpoints they apply to  
* … “crash” you would get crash-report (only)  
* … Similar to intervention and deprecation  
* … Alternative is a dedicated crash reporting header that will define the endpoint  
* … What do folks think about this?  
* … Which variant?  
* Nic: “default” would still send reports to all three, “crash” would only get crash reports, etc? Makes sense  
* Andy: If “crash” and “default” were defined, crash would only have crash and everything else would go to default?  
* Yoav: That would also work  
* … People running into this issue, I could chime in on thread and propose the solution  
* Philip: “fallback” rather than “default”?  
* Yoav: If we could go back in time, “default” wouldn’t happen, but for back-compat we’d need to keep it  
* Philip: Yeah “default” would be the fallback handler  
* Yoav: I would expect people who don’t want all 3 reports to just define what they do want, and not define a default  
* … If you want to collect 2 into the same endpoint, 2 endpoints pointing at the same URL  
* \[lots of thumb-ups\]  
* Tim Kadlec: there's some precedent elsewhere for default \== fallback, e.g. CSP  
   

### NEL \- where is it going?

* Yoav: As part of the issue triage, issues we have open for a long while, Network Error Logging has a lot of them  
* … Made me look at the spec itself, and it feels like it needs some love  
* … Initially worked on \~10 years ago, it was inherited between teams in Chrome  
* … Editors have moved on  
* … Feels like it was based on the former version of Reporting API, using an old header that is no longer defined  
* … JSON-based which was a necessity but we now have structured fields  
* … Generally, it re-explains a lot of concepts from Fetch, rather than aligning with Fetch concepts  
* … It has prose about what a network request is, and we can just align to Fetch  
* … Feels we could benefit from a significant cleanup, and potentially an API shape revamp  
* … Huge gap in terms of coverage  
* … Several large entities are collecting NEL and are making good use of that data in order to figure out connectivity issues  
* … Significant blind-spot for anything non-Chromium  
* … NEL is only supported in Chromium, would be great to see issues from other browsers  
* … Network level reports can be useful to resolve issues  
* Bas: We are conceptually positive, but negative on the current spec  
* … 9 issues we feel would need to be addressed to move forward  
* Andy: Can we reconcile NEL and Reporting API?  
* Yoav: That would be great, we would need API revamped, spec updated  
* … We also need to determine what we need for sampling  
* … Reporting doesn’t have sampling, maybe it should?  
* … NEL has it  
* … Modernize NEL in the process  
* Bas: Firefox has a prototype implementation of a subset of the API  
* … I suspect when the issues are resolved, the threshold to enabling it isn’t that high  
* Tim: Appetite at CloudFlare would be high for this, collect a ton of NEL data  
* … Most of our largest customers are using NEL, similar issues  
* … Giving renewed focus, so timing is good  
* … Especially if we can get another browser on board here  
* Nic: Akamai has a vested interest, both for mPulse and the larger org. Considering if we should invest our time. Probably “yes” especially if we can collaborate on it  
* Bas: Mention that some of the spec issues are not just cleanup, they are e.g. certain pieces of information that may leak.  Not just cleanup.  
* Yoav: Makes sense to re-examine past choices  
* … Some information could be removed, or optional to UA’s discretion  
* … Some of them are in the spec and are not implemented anywhere as they didn’t pass Chrome privacy team either, we could possibly drop from spec  
* Nic: May be useful to have a meeting with the interested parties, review the spec and concerns and figure out the actionable next steps?  
* … Potential folks: Nic, Yoav, Simon, Bas, Tim, Andy  
* … We’ll reach out to Apple as well