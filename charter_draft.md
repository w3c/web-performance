# W3C Web Performance Working Group


# 2023 Charter Comments

2021 Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

Expires: 28 February 2023



* Specs Changes
    * Page Visibility
        * Discontinue (in 2023 charter)
        * Moved to HTML
        * Repo archived (but doesn't mention why)
        * Spec says discontinued [https://github.com/w3c/page-visibility/](https://github.com/w3c/page-visibility/) 
        * Spec should redirect?
    * Beacon
        * Don't finalize to Rec, could incorporate Unload/Pending beacon into it
    * Cooperative Scheduling of Background Tasks (rIC)
        * Don't finalize to Rec, could incorporate Scheduling APIs
    * PaintTiming
    * EventTiming
    * LCP
        * Could incorporate ElementTiming?
    * Timing Names Entry Registry
        * New process for registries from W3C
* Incubations
    * ElementTiming [https://github.com/WICG/element-timing](https://github.com/WICG/element-timing) 
        * Move into LCP? Or at least bring into WG as LCP already is.
        * Merge parts into LCP, parts into PaintTiming
    * isInputPending [https://github.com/WICG/is-input-pending](https://github.com/WICG/is-input-pending) 
        * Any recent updates?
    * Layout Instability [https://github.com/WICG/layout-instability](https://github.com/WICG/layout-instability) 
        * Discussion in early 2022 around lessons from implementation
        * Barriers to adoption?
            * Mozilla: Neutral (implementation, performance concerns)
            * Apple: Opposed (circa 2019) (concerns on bookkeeping, cost at runtime, implementation, animations/scrolling not handled well)
    * Memory Measurement [https://github.com/WICG/performance-measure-memory](https://github.com/WICG/performance-measure-memory) 
    * Network Info [https://github.com/WICG/netinfo/](https://github.com/WICG/netinfo/) 
    * Unload Beacon [https://github.com/WICG/unload-beacon](https://github.com/WICG/unload-beacon) 
        * Incorporate into Beacon?
    * Scheduling APIs [https://github.com/WICG/scheduling-apis](https://github.com/WICG/scheduling-apis) 
        * Incorporate into Cooperative Scheduling of Background Tasks?
        * Consider a move to HTML spec (same as rIC?)
    * JS self profiling [https://wicg.github.io/js-self-profiling/](https://wicg.github.io/js-self-profiling/) 
        * Any recent updates?
    * Page Lifecycle [https://github.com/WICG/page-lifecycle](https://github.com/WICG/page-lifecycle) 
    * Intervention/Deprecation/Crash Reporting
        * [https://github.com/WICG/deprecation-reporting](https://github.com/WICG/deprecation-reporting)
        * [https://github.com/WICG/intervention-reporting](https://github.com/WICG/intervention-reporting)
        * [https://github.com/WICG/crash-reporting](https://github.com/WICG/crash-reporting) 


## TPAC 22 discussions



* Sustainability - should it be covered in scope? No direct deliverables just yet
* Lab tooling related browser interop - should it go back to being in scope?


## Other questions



* HR-Time is not just about high resolution timers, but defines time in general. Should we rename it?
* We should call out[ open privacy issues](https://github.com/w3c/resource-timing/issues?q=is%3Aissue+is%3Aopen+label%3Aprivacy-needs-resolution) and say that we strive to resolve them


# <span style="text-decoration:underline;">CHARTER DRAFT</span>


## Scope

Web developers are building sophisticated applications where application performance is a critical feature. Web developers want the ability to observe the performance characteristics of their applications, and they want the ability to write more efficient applications, using well-defined interoperable methods. Their methods must be both secure and privacy-enabling by design, using well-defined interoperable methods that conform to the current Web browser security model.

The Web Performance Working Group's scope of work includes user agent features and APIs to observe and improve various aspects of application performance:



* _Measurement_
The WG will deliver APIs to measure network and rendering performance, responsiveness and interactivity, memory and CPU use, application failures, and other aspects of the user’s experience, from the perspectives of both application loading and continuous user interaction. In particular, the group will deliver means to measure user experience metrics in popular web architectures, such as single-page apps, as well as means to collect those measurements. Where possible, privacy-preserving measurement techniques will be explored.
* _Scheduling_
The WG will deliver APIs to enable developers to improve scheduling of application work as well as use of network resources, to minimize loading times and ensure ideal user experience.
* _Adaptation_
The WG will deliver APIs to enable developers to deliver resources adapted to the user’s device, preferences, conditions, or other circumstances.

Such deliverables will apply to desktop and mobile browsers and other non-browser environments where appropriate, and will be consistent with Web technologies designed in other working groups including HTML, CSS, Web Application Security, Web Apps, Device and Sensors, and SVG. The Group will strive for its deliverables to be well-integrated with other specifications where appropriate.

In addition to developing Recommendation Track documents, the Web Performance Working Group may provide specification review to other Groups, and will collaborate with relevant incubations. Such collaboration can be around web platform specifications, but can also include relevant developer or industry conventions, potentially applied in non-browser environments, as long as it's aligned with the Working Group's scope and mission.


### Out of Scope

The following features are out of scope, and will not be addressed by this working group.



* performance data analysis techniques or algorithms.


### Success Criteria

In order to advance to [Proposed Recommendation](https://www.w3.org/2020/Process-20200915/#RecsPR), each specification is expected to have at least two independent implementations of each feature defined in the specification.

Each specification should contain a section detailing any [known security](https://www.w3.org/TR/security-privacy-questionnaire/), fingerprinting, and privacy implications, and suggested [mitigation strategies](https://w3c.github.io/perf-security-privacy/) for implementers, Web authors, and end users. The group should not publish a specification if acceptable mitigation strategies cannot be found.

Normative specification changes are generally expected to have a corresponding set of tests, either in the form of new tests or modifications to existing tests, or must include the rationale for why test updates are not required for the proposed update.


## Deliverables

The WG expects to gradually move all of its deliverables to a Living Standard CR model. 
Beyond that, the WG expects to converge at least some of its deliverables into a smaller number of specifications.


### Normative Specifications

The working group will deliver incremental revisions of the following W3C normative specifications:

#### [High Resolution Time](https://w3c.github.io/hr-time/)

This document defines an API that provides the current time in sub-millisecond resolution such that it is not subject to system clock skew or adjustments.

**Draft state:** [Working Draft](https://www.w3.org/TR/hr-time/)

**Next Recommendation expected completion:**

Latest publication: [25 April 2023](https://www.w3.org/TR/2023/WD-hr-time-3-20230425/)

Patent Review Draft (level 3): [https://www.w3.org/TR/2020/WD-hr-time-3-20201001/](https://www.w3.org/TR/2020/WD-hr-time-3-20201001/)

Reference Draft (level 2): [https://www.w3.org/TR/2018/CR-hr-time-2-20180301/](https://www.w3.org/TR/2018/CR-hr-time-2-20180301/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2018Mar/0000.html) on 01 March 2018 ended on 30 April 2018

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

Planned work: The specification defines time-related concepts beyond just high-resolution timers. It should be renamed to reflect that.

#### [Performance Timeline](https://w3c.github.io/performance-timeline/)

This specification defines a unified interface to store and retrieve performance metric data.

**Draft state:** [Candidate Recommendation Draft](https://www.w3.org/TR/performance-timeline/)

**Next Recommendation expected completion:** Living Standard

Latest publication: [15 November 2022](https://www.w3.org/TR/2022/CRD-performance-timeline-20221115/)

Reference Draft: [https://www.w3.org/TR/2016/CR-performance-timeline-2-20161208/](https://www.w3.org/TR/2016/CR-performance-timeline-2-20161208/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2016Dec/0001.html) on 08 December 2016 ended on 06 February 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

#### [Resource Timing](https://w3c.github.io/resource-timing/)

This specification defines an interface for web applications to access the complete timing information for resources in a document or in a worker.

**Level 1 Draft state:** [Candidate Recommendation](https://www.w3.org/TR/resource-timing-1/)

Latest publication: [30 March 2017](https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/)

Reference Draft: [https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/](https://www.w3.org/TR/2017/CR-resource-timing-1-20170330/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Mar/0005.html) on 30 March 2017 ended on 29 May 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

**Level 2 Draft state:** [Candidate Recommendation Draft](https://www.w3.org/TR/resource-timing/)

**Next Recommendation expected completion:** Living Standard

Latest publication: [11 May 2023](https://www.w3.org/TR/2023/CRD-resource-timing-20230511/)

Reference Draft: [https://www.w3.org/TR/2016/WD-resource-timing-2-20161103/](https://www.w3.org/TR/2016/WD-resource-timing-2-20161103/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2016Nov/0005.html) on 03 November 2016 ended on 02 April 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

#### [Navigation Timing](https://w3c.github.io/navigation-timing/)

This specification defines an interface for web applications to access the complete timing information for navigation of a document.

**Draft state:** [Working Draft](https://www.w3.org/TR/navigation-timing-2/)

**Next Recommendation expected completion:** Living Standard

Note: after Level 2 of Navigation Timing is ratified, future development of new Navigation Timing features will be done within Resource Timing; Navigation Timing will be merged with Resource Timing.

Latest publication: [07 June 2023](https://www.w3.org/TR/2023/WD-navigation-timing-2-20230607/)

Reference Draft: [https://www.w3.org/TR/2015/WD-navigation-timing-2-20150120/](https://www.w3.org/TR/2015/WD-navigation-timing-2-20150120/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2013Jan/0014.html) on 31 January 2013 ended on 30 June 2013

Produced under Working Group Charter: [https://www.w3.org/2013/01/webperf](https://www.w3.org/2013/01/webperf).

Planned work: The specification should be folded into the Resource Timing specification, on which it relies.

#### [User Timing](https://w3c.github.io/user-timing/)

An interoperable means for site developers to capture timing information with a developer supplied name. The user agent captures the time stamp at the point and time specified in the code executing in the user agent.

**Draft state:** [Candidate Recommendation Draft](https://www.w3.org/TR/user-timing/)

**Next Recommendation expected completion:** Living Standard

Latest publication: [26 April 2023](https://www.w3.org/TR/2023/CRD-user-timing-20230426/)

Reference Draft: [https://www.w3.org/TR/2019/WD-user-timing-3-20190305/](https://www.w3.org/TR/2019/WD-user-timing-3-20190305/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2019Mar/0000.html) on 05 March 2019 ended on 02 August 2019

Produced under Working Group Charter: [https://www.w3.org/2018/09/webperf](https://www.w3.org/2018/09/webperf)

#### [Beacon](https://w3c.github.io/beacon/)

An interoperable API for site developers to asynchronously transfer data from the user agent to a web server, with a guarantee from the user agent that the data will be eventually sent.

**Draft state:** [Candidate Recommendation Draft](https://www.w3.org/TR/beacon/)

**Next Recommendation expected completion:** Living Standard

Latest publication: [03 August 2022](https://www.w3.org/TR/2022/CRD-beacon-20220803/)

Reference Draft: [https://www.w3.org/TR/2017/CR-beacon-20170413/](https://www.w3.org/TR/2017/CR-beacon-20170413/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Apr/0004.html) on 13 April 2017 ended on 12 June 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

#### [Cooperative Scheduling of Background Tasks](https://w3c.github.io/requestidlecallback/)

An API that web page authors can use to cooperatively schedule background tasks such that they do not introduce delays to other high priority tasks that share the same event loop, such as input processing, animations and frame compositing.

**Draft state:** [Working Draft](https://www.w3.org/TR/requestidlecallback/)

**Next Recommendation expected completion:** Expected to move to Living Standard

Latest publication: [28 June 2022](https://www.w3.org/TR/2022/WD-requestidlecallback-20220628/)

Reference Draft: [https://www.w3.org/TR/2017/CR-requestidlecallback-20170131/](https://www.w3.org/TR/2017/CR-requestidlecallback-20170131/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Feb/0000.html) on 02 February 2017 ended on 01 April 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

Planned work: The specification should be unified with other [Scheduling APIs](https://github.com/wicg/scheduling-apis), once they mature.

#### [Long Task](https://w3c.github.io/longtasks/)

This specification defines an API that web page authors can use to detect presence of "long tasks" that monopolize the UI thread for extended periods of time and block other critical tasks from being executed - e.g. reacting to user input.

**Draft state:** [Working Draft](https://www.w3.org/TR/longtasks-1/)

**Next Recommendation expected completion:** 

Latest publication: [07 September 2017](https://www.w3.org/TR/2017/WD-longtasks-1-20170907/)

Reference Draft: [https://www.w3.org/TR/2017/WD-longtasks-1-20170907/](https://www.w3.org/TR/2017/WD-longtasks-1-20170907/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Dec/0001.html) on 07 December 2017 ended on 04 February 2018

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

Planned work: Expanding the API to include [long animation frames](https://github.com/w3c/longtasks/blob/main/loaf-explainer.md).

#### [Paint Timing](https://w3c.github.io/paint-timing/)

An interoperable API for site developers to capture the set of key moments during pageload - e.g. first paint and first contentful paint.

**Draft state:** [Working Draft](https://www.w3.org/TR/paint-timing/)

**Next Recommendation expected completion:**

Latest publication: [07 September 2017](https://www.w3.org/TR/2017/WD-paint-timing-20170907/)

Reference Draft: [https://www.w3.org/TR/2017/WD-paint-timing-20170907/](https://www.w3.org/TR/2017/WD-paint-timing-20170907/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Dec/0001.html) on 07 December 2017 ended on 04 February 2018

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

#### [Server Timing](https://w3c.github.io/server-timing/)

This specification enables a server to communicate performance metrics about the request-response cycle to the user agent. It also standardizes a JavaScript interface to enable applications to collect, process, and act on these metrics to optimize application delivery.

**Draft state:** [Working Draft](https://www.w3.org/TR/server-timing/)

**Next Recommendation expected completion:** 

Latest publication: [11 April 2023](https://www.w3.org/TR/2023/WD-server-timing-20230411/)

Reference Draft: [https://www.w3.org/TR/2017/WD-server-timing-20170713/](https://www.w3.org/TR/2017/WD-server-timing-20170713/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Jul/0005.html) on 13 July 2017 ended on 10 December 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

#### [Device Memory](https://w3c.github.io/device-memory/)

This specification defines a JavaScript API and HTTP Client Hint header to surface device capability for memory — i.e. device RAM, in order to enable web apps to customize content depending on device memory constraints.

**Draft state:** [Working Draft](https://www.w3.org/TR/device-memory/)

**Next Recommendation expected completion:**

Latest publication: [22 July 2022](https://www.w3.org/TR/2022/WD-device-memory-1-20220722/)

Reference Draft: [https://www.w3.org/TR/2018/WD-device-memory-1-20180925/](https://www.w3.org/TR/2018/WD-device-memory-1-20180925/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2018Sep/0003.html) on 25-Sep-2018 ended on 22-Feb-2019

Produced under Working Group Charter: [https://www.w3.org/2018/09/webperf/](https://www.w3.org/2018/09/webperf/)

#### [Reporting](https://w3c.github.io/reporting/)

This specification defines a generic reporting framework which allows web developers to associate a set of named reporting endpoints with an origin. Various platform features (like Content Security Policy, Network Error Reporting, and others) will use these endpoints to deliver feature-specific reports in a consistent manner.

**Draft state:** [Working Draft](https://www.w3.org/TR/reporting/)

**Next Recommendation expected completion:**

Latest publication: [12 May 2023](https://www.w3.org/TR/2023/WD-reporting-1-20230512/)

Reference Draft: [https://www.w3.org/TR/2016/WD-reporting-1-20160407/](https://www.w3.org/TR/2016/WD-reporting-1-20160407/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2016Apr/0001.html) on 7 April 2016 ended on 4 September 2016

Produced under Working Group Charter: [https://www.w3.org/2015/06/webperf](https://www.w3.org/2015/06/webperf).

#### [Network Error Logging](https://w3c.github.io/network-error-logging)

This specification defines a mechanism that enables developers to declare a network error reporting policy for a web application. A user agent can use this policy to report encountered network errors that prevented it from successfully fetching requested resource.

**Draft state:** [Working Draft](https://www.w3.org/TR/network-error-logging/)

**Next Recommendation expected completion:**

Latest publication: [25-Sep-2018](https://www.w3.org/TR/2018/WD-network-error-logging-1-20180925/)

Reference Draft: [https://www.w3.org/TR/2014/WD-navigation-error-logging-20140211/](https://www.w3.org/TR/2014/WD-navigation-error-logging-20140211/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2014Feb/0008.html) on 12-Feb-2014 ended on 12-Jul-2014

Produced under Working Group Charter: [https://www.w3.org/2013/01/webperf](https://www.w3.org/2013/01/webperf)

#### [Event Timing](https://www.w3.org/TR/event-timing/)

This specification defines an API that provides web page authors with insights into the latency of certain events triggered by user interactions.

**Draft state:** [First Public Working Draft](https://www.w3.org/TR/event-timing/)

**Next Recommendation expected completion:**

Latest publication: [24 May 2022](https://www.w3.org/TR/2022/WD-event-timing-20220524/)

Reference Draft: [https://www.w3.org/TR/2022/WD-event-timing-20220524/](https://www.w3.org/TR/2022/WD-event-timing-20220524/)

Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Largest Contentful Paint](https://www.w3.org/TR/largest-contentful-paint/)

This specification defines an API that enables monitoring the largest paint an element triggered on screen.

**Draft state:** [First Public Working Draft](https://www.w3.org/TR/largest-contentful-paint/)

**Next Recommendation expected completion:**

Latest publication: [24 May 2022](https://www.w3.org/TR/2022/WD-largest-contentful-paint-20220524/)

Reference Draft: [https://www.w3.org/TR/2022/WD-event-timing-20220524/)](https://www.w3.org/TR/2022/WD-event-timing-20220524/))

Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

Planned work: Should be folded into Paint Timing, alongside [Element Timing](https://wicg.github.io/element-timing/).

### Past Deliverables

The Group plans to transition the contents of the following past-deliverables to the WHATWG and publish them as a Note.

#### [Resource Hints](https://w3c.github.io/resource-hints/)

This specification defines the dns-prefetch, preconnect, prefetch, and prerender relationships of the HTML Link Element (&lt;link>).

**Draft state:** [Working Draft](https://www.w3.org/TR/resource-hints/)

Latest publication: [02 July 2019](https://www.w3.org/TR/2019/WD-resource-hints-20190702/)

Reference Draft: [https://www.w3.org/TR/2014/WD-resource-hints-20141021/](https://www.w3.org/TR/2014/WD-resource-hints-20141021/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2014Oct/0006.html) on 23 October 2014 ended on 20 March 2015

Produced under Working Group Charter: [https://www.w3.org/2013/01/webperf](https://www.w3.org/2013/01/webperf)

Moved to the [HTML spec](https://html.spec.whatwg.org//multipage/links.html#linkTypes).

#### [Preload](https://w3c.github.io/preload/)

This specification defines the link relation type preload, a declarative fetch primitive that initiates an early fetch and separates fetching from resource execution.

**Draft state:** [Candidate Recommendation](https://www.w3.org/TR/preload/)

Latest publication: [26 June 2019](https://www.w3.org/TR/2019/CR-preload-20190626/)

Reference Draft: [https://www.w3.org/TR/2017/CR-preload-20171026/](https://www.w3.org/TR/2017/CR-preload-20171026/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Oct/0007.html) on 26 October 2017 ended on 25 December 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf).

Moved to the [HTML spec](https://html.spec.whatwg.org/multipage/links.html#link-type-preload).

#### [Page Visibility](https://w3c.github.io/page-visibility/)

An interoperable means for site developers to programmatically determine the current visibility of a document and be notified of visibility changes.

**Draft state:** [Proposed Recommendation](https://www.w3.org/TR/page-visibility-2/)

Latest publication: [17 October 2017](https://www.w3.org/TR/2017/PR-page-visibility-2-20171017/)

Reference Draft: [https://www.w3.org/TR/2017/CR-page-visibility-2-20170328/](https://www.w3.org/TR/2017/CR-page-visibility-2-20170328/)

Associated [Call for Exclusion](https://lists.w3.org/Archives/Member/member-cfe/2017Mar/0003.html) on 29 March 2017 ended on 27 May 2017

Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

Moved to the [HTML spec](https://html.spec.whatwg.org/multipage/interaction.html#page-visibility).


### Other Deliverables

The Group maintains two non-normative documents:

* A [Primer for Web Performance Timing APIs](https://w3c.github.io/perf-timing-primer/) document to facilitate the understanding of the interrelationships between its deliverables.
    * Planned work: Updating it to [include new specs](https://github.com/w3c/web-performance/issues/54), remove deprecated ones and more.
* A [Performance APIs, Security and Privacy](https://w3c.github.io/perf-security-privacy/) document
    * Planned work: [Reviewing and updating the content](https://github.com/w3c/web-performance/issues/46), and adding a section on the principals and value of performance measurements.

Other non-normative documents may be created such as:

* Test suites for each specification;
* Use cases documents to support development and exploration of performance-critical web platform features and APIs;
* Primer or Best Practice documents to support web developers when designing applications with performance in mind;
* Developer and user guides for its normative specifications;
* Best practice document explaining how data is commonly gathered between the client and the server.


## Coordination

For all specifications, this Working Group will seek [horizontal review](https://www.w3.org/Guide/Charter.html#horizontal-review) for accessibility, internationalization, performance, privacy, and security with the relevant Working and Interest Groups, and with the [TAG](https://www.w3.org/2001/tag/). Invitation for review must be issued during each major standards-track document transition, including [FPWD](https://www.w3.org/2020/Process-20200915/#RecsWD) and [CR](https://www.w3.org/2020/Process-20200915/#RecsCR), and should be issued when major changes occur in a specification.

Additional technical coordination with the following Groups will be made, per the [W3C Process Document](https://www.w3.org/2020/Process-20200915/#WGCharter):


### W3C Groups

[Technical Architecture Group (TAG)](https://www.w3.org/2001/tag/)

The WG may ask the Technical Architecture Group to review some of its specifications.

[Web Applications Working Group](https://www.w3.org/2019/webapps/)

This Working Group develops APIs for client-side development and for markup vocabularies for describing and controlling client-side application behavior.

[Web Application Security Working Group](https://www.w3.org/2011/webappsec/)

This Working Group develops security and policy mechanisms to improve the security of Web Applications, and enable secure cross-site communication.

[CSS Working Group](https://www.w3.org/Style/CSS/members)

The group develops and maintains CSS, which is relevant for specifications such as page visibility.

[Privacy Interest Group](https://www.w3.org/Privacy/IG/)

This group monitors ongoing privacy issues that affect the Web, investigates potential areas for new privacy work, and provides guidelines and advice for addressing privacy in standards development.

[Web Platform Incubator Community Group](https://www.w3.org/community/wicg/)

This group provides a lightweight venue for proposing, incubating and discussing new web platform features. The Web Performance Working group will incubate and review new proposals that are within scope of our charter within the WICG. Once such WICG-incubated proposal is implemented and available in at least one major browser, and has support from one more, it may be adopted by the Web Performance Working group.


### External Organizations

[ECMA Technical Committee 39 (TC39)](https://www.ecma-international.org/memento/tc39.htm)

This is the group responsible for ECMAScript standardization, and related ECMAScript features like E4X. As the Web Performance Working Group will be developing ECMAScript APIs, it should collaborate with TC39.

[Internet Engineering Task Force](https://www.ietf.org/)

The IETF is responsible for defining robust and secure protocols for Internet functionality, in particular HTTP. The Working Group should coordinate protocol-related work (e.g. HTTP, Privacy-Preserving Measurement) with the appropriate IETF WGs.

[Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)

The Web Hypertext Application Technology Working Group (WHATWG) is a community of people interested in evolving the web through standards and tests.


## Participation

To be successful, this Working Group is expected to have 5 or more active participants for its duration, including representatives from the key implementors of this specification, and active Editors and Test Leads for each specification. The Chairs, specification Editors, and Test Leads are expected to contribute half of a day per week towards the Working Group. There is no minimum requirement for other Participants.

The group encourages questions, comments and issues on its public mailing lists and document repositories, as described in [Communication](https://www.w3.org/2021/02/webperf.html#communication).

The group also welcomes non-Members to contribute technical submissions for consideration upon their agreement to the terms of the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy/).

Participants in the group are required (by the [W3C Process](https://www.w3.org/Consortium/Process/#ParticipationCriteria)) to follow the W3C [Code of Ethics and Professional Conduct](https://www.w3.org/Consortium/cepc/).


## Open privacy issues

The following WG deliverables currently have a few open issues related to privacy - [Resource Timing](https://github.com/w3c/resource-timing/issues?q=is%3Aissue+is%3Aopen+label%3Aprivacy-needs-resolution), [High Resolution time](https://github.com/w3c/hr-time/issues/79), and [Reporting](https://github.com/w3c/reporting/issues?q=is%3Aissue+is%3Aopen+label%3Aprivacy-tracker).

The WG will work with the relevant stake holders and strive to resolve those issues.

## Communication

Technical discussions for this Working Group are conducted in [public](https://www.w3.org/2020/Process-20200915/#confidentiality-levels). Meeting minutes from teleconference and face-to-face meetings will be archived for public review, and technical discussions and issue tracking will be conducted in a manner that can be both read and written to by the general public. Working Drafts and Editor's Drafts of specifications will be developed on a public repository, and may permit direct public contribution requests.

Information about the group (including details about deliverables, issues, actions, status, participants, and meetings) will be available from the [Web Performance Working Group home page.](https://www.w3.org/2010/webperf/)

Most Web Performance Working Group teleconferences will focus on discussion of particular specifications, and will be conducted on an as-needed basis.

This group primarily conducts its technical work in its [public repositories](https://github.com/orgs/w3c/teams/web-performance/repositories). There is also a public mailing list public-web-perf@w3.org ([archive](https://lists.w3.org/Archives/Public/public-web-perf/)). The public is invited to contribute to the github repositories and post messages to the list. Regular activity summaries around the github repositories will be provided.


## Decision Policy

This group will seek to make decisions through consensus and due process, per the [W3C Process Document (section 3.3](https://www.w3.org/2020/Process-20200915/#Consensus)). Typically, an editor or other participant makes an initial proposal, which is then refined in discussion with members of the group and other reviewers, and consensus emerges with little formal voting being required.

However, if a decision is necessary for timely progress, but consensus is not achieved after careful consideration of the range of views presented, the Chairs may call for a group vote, and record a decision along with any objections.

To afford asynchronous decisions and organizational deliberation, any resolution (including publication decisions) taken in a face-to-face meeting or teleconference will be considered provisional until 10 working days after the publication of the resolution in draft minutes sent, which will be published within 5 working days of the meeting to the working group's mailing list with a 'call for consensus' in the subject line. If no objections are raised on the mailing list by the end of the response period, the resolution will be considered to have consensus as a resolution of the Working Group.

All decisions made by the group should be considered resolved unless and until new information becomes available, or unless reopened at the discretion of the Chairs or the Director.

This charter is written in accordance with the [W3C Process Document (Section 3.4, Votes)](https://www.w3.org/Consortium/Process/policies#Votes), and includes no voting procedures beyond what the Process Document requires.


## Patent Policy

This Working Group operates under the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy-20200915/) 15 September 2020. To promote the widest adoption of Web standards, W3C seeks to issue Recommendations that can be implemented, according to this policy, on a Royalty-Free basis. For more information about disclosure obligations for this group, please see the [W3C Patent Policy Implementation](https://www.w3.org/2004/01/pp-impl/45211/status).


## Licensing

This Working Group will use the [W3C Software and Document license](https://www.w3.org/Consortium/Legal/copyright-software) for all its deliverables.


## About this Charter

This charter has been created according to [section 5.2](https://www.w3.org/Consortium/Process/groups#GAGeneral) of the [Process Document](https://www.w3.org/Consortium/Process). In the event of a conflict between this document or the provisions of any charter and the W3C Process, the W3C Process shall take precedence.
