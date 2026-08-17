# Web Performance Working Group Charter

## Motivation and Background

Web developers are building sophisticated applications where application performance is a critical feature. Web developers want the ability to observe the performance characteristics of their applications, and they want the ability to write more efficient applications, using well-defined interoperable methods. Their methods must be both secure and privacy-enabling by design, using well-defined interoperable methods that conform to the current Web browser security model.

## Scope

The Web Performance Working Group's scope of work includes user agent features and APIs to observe and improve various aspects of application performance:

* _Measurement_
The WG will deliver APIs to measure network and rendering performance, responsiveness and interactivity, memory and CPU use, application failures, and other aspects of the user’s experience, from the perspectives of both application loading and continuous user interaction. In particular, the group will deliver means to measure user experience metrics in popular web architectures, such as single-page apps, as well as means to collect those measurements.
* _Scheduling_
The WG will deliver APIs to enable developers to improve scheduling of application work as well as use of network resources, to minimize loading times and ensure ideal user experience.
* _Adaptation_
The WG will deliver APIs to enable developers to deliver resources adapted to the user’s device, preferences, conditions, or other circumstances.

Such deliverables will apply to desktop and mobile browsers and other non-browser environments where appropriate, and will be consistent with Web technologies designed in other working groups including HTML, CSS, Web Application Security, Web Apps, Device and Sensors, and SVG. The Group will strive for its deliverables to be well-integrated with other specifications where appropriate.

In addition to developing Recommendation Track documents, the Web Performance Working Group may provide specification review to other Groups, and will collaborate with relevant incubations. Such collaboration can be around web platform specifications, but can also include relevant developer or industry conventions, potentially applied in non-browser environments, as long as it's aligned with the Working Group's scope and mission.

### Out of Scope

The following features are out of scope, and will not be addressed by this working group.

* performance data analysis techniques or algorithms.

## Deliverables

Updated document status is available on the [group publication status page](https://www.w3.org/groups/wg/webperf/publications).

Draft state indicates the state of the deliverable at the time of the charter approval.

The Working Group intends to publish the latest state of their work as Candidate Recommendations, upgrading specifications with Candidate Recommendation Snapshots. Alternatively, ongoing work may be published as Recommendations to be updated further with Candidate Changes.

### Normative Specifications

The Web Performance Working Group will deliver the following W3C normative specifications:

#### [High Resolution Time](https://w3c.github.io/hr-time/)

This specification defines an API that provides the current time in sub-millisecond resolution and such that it is not subject to system clock skew or adjustments.

* **Draft state:** [Working Draft](https://www.w3.org/TR/hr-time/)
* **Expected completion:** Expected CR in 2026
* **Latest publication:** 2024-11-07
* **Exclusion Draft:** [https://www.w3.org/TR/2020/WD-hr-time-3-20201001/](https://www.w3.org/TR/2020/WD-hr-time-3-20201001/)
* Exclusion period began on 2020-10-01 and ended on 2021-02-28
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2018/09/webperf/](https://www.w3.org/2018/09/webperf/)

#### [Performance Timeline](https://w3c.github.io/performance-timeline/)

This specification defines an interface for web applications to access timing information related to navigation and elements. It is used by other specifications, like User Timing.

* **Draft state:** [CRD](https://www.w3.org/TR/performance-timeline/)
* **Expected completion:** Maintained in CR
* **Latest publication:** 2025-05-21
* **Exclusion Draft:** [https://www.w3.org/TR/2021/CR-performance-timeline-20211202/](https://www.w3.org/TR/2021/CR-performance-timeline-20211202/)
* Exclusion period began on 2021-12-02 and ended on 2022-01-31
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Resource Timing](https://w3c.github.io/resource-timing/)

This specification defines an interface for web applications to access the complete timing information for resources in a document.

* **Draft state:** [CRD](https://www.w3.org/TR/resource-timing/)
* **Expected completion:** Maintained in CR
* **Latest publication:** 2025-12-09
* **Exclusion Draft:** [https://www.w3.org/TR/2022/CR-resource-timing-20221004/](https://www.w3.org/TR/2022/CR-resource-timing-20221004/)
* Exclusion period began on 2022-10-04 and ended on 2022-12-03
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Navigation Timing](https://w3c.github.io/navigation-timing/)

This document provides an interface for web applications to access timing information related to navigation and elements.

* **Draft state:** [Working Draft](https://www.w3.org/TR/navigation-timing-2/)
* **Expected completion:** Expected CR in 2026, maintained in CR
* **Latest publication:** 2025-12-05
* **Exclusion Draft:** [https://www.w3.org/TR/2013/WD-navigation-timing-2-20130131/](https://www.w3.org/TR/2013/WD-navigation-timing-2-20130131/)
* Exclusion period began on 2013-01-31 and ended on 2013-06-30
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2013/01/webperf](https://www.w3.org/2013/01/webperf)

#### [User Timing](https://w3c.github.io/user-timing/)

This specification defines an interface to help web developers measure the performance of their applications by giving them access to high precision timestamps.

* **Draft state:** [CRD](https://www.w3.org/TR/user-timing/)
* **Expected completion:** Maintained in CR
* **Latest publication:** 2025-02-13
* **Exclusion Draft:** [https://www.w3.org/TR/2021/CR-user-timing-20211202/](https://www.w3.org/TR/2021/CR-user-timing-20211202/)
* Exclusion period began on 2021-12-02 and ended on 2022-01-31
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Beacon](https://w3c.github.io/beacon/)

This specification defines an interoperable means for site developers to asynchronously transfer data from the user agent to a web server, with the user agent taking the responsibility to eventually send the data.

* **Draft state:** [CRD](https://www.w3.org/TR/beacon/)
* **Expected completion:** Expected Recommendation in 2026
* **Latest publication:** 2022-08-03
* **Exclusion Draft:** [https://www.w3.org/TR/2017/CR-beacon-20170413/](https://www.w3.org/TR/2017/CR-beacon-20170413/)
* Exclusion period began on 2017-04-13 and ended on 2017-06-12
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

#### [Paint Timing](https://w3c.github.io/paint-timing/)

This document defines an API that can be used to capture a series of key moments (First Paint, First Contentful Paint) during pageload which developers care about.

* **Draft state:** [Working Draft](https://www.w3.org/TR/paint-timing/)
* **Expected completion:** CR in 2026
* **Latest publication:** 2026-01-07
* **Exclusion Draft:** [https://www.w3.org/TR/2017/WD-paint-timing-20170907/](https://www.w3.org/TR/2017/WD-paint-timing-20170907/)
* Exclusion period began on 2017-09-07 and ended on 2018-02-04
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2016/07/webperf](https://www.w3.org/2016/07/webperf)

#### [Server Timing](https://w3c.github.io/server-timing/)

Server Timing, part of the performance timeline metrics, provides API access to request-response cycle performance metrics communicated from the server to the user agent.

* **Draft state:** [Working Draft](https://www.w3.org/TR/server-timing/)
* **Expected completion:** CR in 2026
* **Latest publication:** 2023-04-11
* **Exclusion Draft:** [https://www.w3.org/TR/2015/WD-server-timing-20150217/](https://www.w3.org/TR/2015/WD-server-timing-20150217/)
* Exclusion period began on 2015-02-17 and ended on 2015-07-17
* **Exclusion Draft Charter:** Produced under Working Group Charter: [http://www.w3.org/2013/01/webperf](http://www.w3.org/2013/01/webperf)

#### [Reporting API](https://w3c.github.io/reporting/)

The reporting API provides a generic reporting framework which allows Web developers to associate a set of named reporting endpoints with an origin. Various platform features (like Content Security Policy, Network Error Reporting, and others) will use these endpoints to deliver feature-specific reports in a consistent manner.

* **Draft state:** [Working Draft](https://www.w3.org/TR/reporting/)
* **Expected completion:** CR by 2027
* **Latest publication:** 2025-06-11
* **Exclusion Draft:** [https://www.w3.org/TR/2016/WD-reporting-1-20160407/](https://www.w3.org/TR/2016/WD-reporting-1-20160407/)
* Exclusion period began on 2016-04-07 and ended on 2016-09-04
* **Exclusion Draft Charter:** Produced under Working Group Charter: [http://www.w3.org/2015/06/webperf](http://www.w3.org/2015/06/webperf)

#### [Network Error Logging](https://w3c.github.io/network-error-logging)

This document defines a mechanism that enables developers to declare a network error reporting policy for a web application. A user agent can use this policy to report encountered network errors that prevented it from successfully fetching requested resources.

* **Draft state:** [Working Draft](https://www.w3.org/TR/network-error-logging/)
* **Expected completion:** unknown
* **Latest publication:** 2025-05-05
* **Exclusion Draft:** [https://www.w3.org/TR/2014/WD-navigation-error-logging-20140211/](https://www.w3.org/TR/2014/WD-navigation-error-logging-20140211/)
* Exclusion period began on 2014-02-12 and ended on 2014-07-12
* **Exclusion Draft Charter:** Produced under Working Group Charter: [http://www.w3.org/2013/01/webperf](http://www.w3.org/2013/01/webperf)

#### [Event Timing API](https://www.w3.org/TR/event-timing/)

This document defines an API that provides web page authors with insights into the latency of certain events triggered by user interactions.

* **Draft state:** [Working Draft](https://www.w3.org/TR/event-timing/)
* **Expected completion:** CR by 2027
* **Latest publication:** 2025-10-17
* **Exclusion Draft:** [https://www.w3.org/TR/2022/WD-event-timing-20220524/](https://www.w3.org/TR/2022/WD-event-timing-20220524/)
* Exclusion period began on 2022-05-24 and ended on 2022-10-21
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Largest Contentful Paint](https://www.w3.org/TR/largest-contentful-paint/)

This document defines an API that enables monitoring the largest paint an element triggered on screen.

* **Draft state:** [Working Draft](https://www.w3.org/TR/largest-contentful-paint/)
* **Expected completion:** CR in 2026
* **Latest publication:** 2025-09-11
* **Exclusion Draft:** [https://www.w3.org/TR/2022/WD-largest-contentful-paint-20220524/](https://www.w3.org/TR/2022/WD-largest-contentful-paint-20220524/)
* Exclusion period began on 2022-05-24 and ended on 2022-10-21
* **Exclusion Draft Charter:** Produced under Working Group Charter: [https://www.w3.org/2021/02/webperf.html](https://www.w3.org/2021/02/webperf.html)

#### [Element Timing](https://github.com/w3c/element-timing/)

The Element Timing API enables monitoring when developer-specified image elements or groups of text nodes are displayed on screen.

* **Draft state:** [Editor's Draft](https://w3c.github.io/element-timing/)
* **Expected completion:** FPWD Q3 2026

#### [Long Animation Frames](https://github.com/w3c/long-animation-frames/)

This document defines an API that web page authors can use to detect presence of "long animation frames" that monopolize the UI thread for extended periods of time and block other critical tasks from being executed - e.g. reacting to user input.

* **Draft state:** [FPWD](https://w3c.github.io/long-animation-frames/)
* **Expected completion:** WD Q2 2026

Work on three previous deliverables will be discontinued:

* Long Tasks API is only implemented in a single browser engine, this work will transition back to WICG.
* Device Memory API is only implemented in a single browser engine, this work will transition back to WICG.
* requestIdleCallback() should be integrated to HTML/WHATWG.

### Maintenance

List of Standards produced and maintained by the Web Performance Working Group.

#### [Navigation Timing](https://w3c.github.io/navigation-timing/)

This document provides an interface for web applications to access timing information related to navigation and elements.

* **Latest publication:** 2012-12-17

#### [User Timing Level 2](https://w3c.github.io/user-timing/)

This specification defines an interface to help web developers measure the performance of their applications by giving them access to high precision timestamps.

* **Latest publication:** 2019-02-26

#### [High Resolution Time Level 2](https://w3c.github.io/hr-time/)

This specification defines a JavaScript interface that provides the current time in sub-millisecond resolution and such that it is not subject to system clock skew or adjustments.

* **Latest publication:** 2019-11-21

### Other Deliverables

The Group maintains a non-normative document:

* A [Performance APIs, Security and Privacy document](https://w3c.github.io/perf-security-privacy/)
    * Planned work: [Reviewing and updating the content](https://github.com/w3c/web-performance/issues/46), and adding a section on the principles and value of performance measurements.

Other non-normative documents may be created such as:

* Use cases documents to support development and exploration of performance-critical web platform features and APIs;
* Developer and user guides for its normative specifications;
* Best practice document explaining how data is commonly gathered between the client and the server.

### Timeline

* Next meeting: TPAC 2026 in hybrid mode.

## Success Criteria

In order to advance beyond [Candidate Recommendation](https://www.w3.org/policies/process/#RecsCR), each normative specification is expected to have [at least two independent interoperable implementations](https://www.w3.org/policies/process/#implementation-experience) of every feature defined in the specification, where interoperability can be verified by passing open test suites. In order to advance beyond Candidate Recommendation, each normative specification must have an open test suite of every feature defined in the specification.

There should be testing plans for each specification, starting from the earliest drafts.

To promote interoperability, all changes made to specifications in Candidate Recommendation or to features that have deployed implementations should have [tests](https://www.w3.org/policies/testing/). Testing efforts should be conducted via the [Web Platform Tests](https://github.com/web-platform-tests/wpt) project.

Each specification should contain separate sections detailing all known security and privacy implications for implementers, Web authors, and end users.

This group is expected to be guided by the following documents:

* [Ethical Web Principles](https://www.w3.org/TR/ethical-web-principles/),
* [Privacy Principles](https://www.w3.org/TR/privacy-principles/),
* [Web Platform Design Principles](https://www.w3.org/TR/design-principles/).

All new features should have expressions of interest from at least two implementors before being incorporated in specifications maintained as Candidate Recommendations. Features that do not have at least two expressions of interest from implementers may be incorporated into Candidate Recommendation drafts and must include an annotation of their at-risk status.

## Coordination

For all specifications, this Working Group will seek [horizontal review](https://www.w3.org/Guide/documentreview/#how_to_get_horizontal_review) for accessibility, internationalization, privacy, and security with the relevant Working and Interest Groups, and with the [TAG](https://www.w3.org/2001/tag/). Invitation for review must be issued during each major standards-track document transition, including [FPWD](https://www.w3.org/policies/process/#RecsWD). The Working Group is encouraged to engage collaboratively with the horizontal review groups throughout development of each specification. The Working Group is advised to seek a review at least 3 months before first entering [CR](https://www.w3.org/policies/process/#RecsCR) and is encouraged to proactively notify the horizontal review groups when major changes occur in a specification following a review.

Additional technical coordination with the following Groups will be made, per the [W3C Process Document](https://www.w3.org/2020/Process-20200915/#WGCharter):

### W3C Groups

#### [Web Applications Working Group](https://www.w3.org/2019/webapps/)

This Working Group develops APIs for client-side development and for markup vocabularies for describing and controlling client-side application behavior.

#### [Web Application Security Working Group](https://www.w3.org/2011/webappsec/)

This Working Group develops security and policy mechanisms to improve the security of Web Applications, and enable secure cross-site communication.

#### [Privacy Working Group](https://www.w3.org/Privacy/IG/)

This group monitors ongoing privacy issues that affect the Web, investigates potential areas for new privacy work, and provides guidelines and advice for addressing privacy in standards development.

#### [Web Platform Incubator Community Group](https://www.w3.org/community/wicg/)

This group provides a lightweight venue for proposing, incubating and discussing new web platform features. The Web Performance Working group will incubate and review new proposals that are within scope of our charter within the WICG. Once such WICG-incubated proposal is implemented and available in at least one major browser, and has support from one more, it may be adopted by the Web Performance Working group.

### External Organizations

#### [ECMA Technical Committee 39 (TC39)](https://www.ecma-international.org/memento/tc39.htm)

This is the group responsible for ECMAScript standardization, and related ECMAScript features like E4X. As the Web Performance Working Group will be developing ECMAScript APIs, it should collaborate with TC39.

#### [Internet Engineering Task Force](https://www.ietf.org/)

The IETF is responsible for defining robust and secure protocols for Internet functionality, in particular HTTP. The Working Group should coordinate protocol-related work (e.g. profiles of hybi or HTTP) with the appropriate IETF WGs.

#### [Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)

The Web Hypertext Application Technology Working Group (WHATWG) is a community of people interested in evolving the web through standards and tests.

## Participation

To be successful, this Working Group is expected to have 9 or more active participants for its duration, including representatives from the key implementors of this specification, and active Editors for each specification. The Chairs and specification Editors are expected to maintain regular contributions of their time towards the Working Group. There is no minimum requirement for other Participants.

The group encourages questions, comments and issues on its public mailing lists and document repositories, as described in [Communication](#communication).

The group also welcomes non-participants to make technical contributions for ongoing work, provided they agree to the terms of the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy/).

The Chairs should periodically look through the non-W3C-Member contributors to the Working Group and consider whether each one should be invited to participate as an Invited Expert. If a non-W3C-Member contributor would like to participate in meetings, they are encouraged to apply to be an Invited Expert.

Participants in the group are required (by the [W3C Process](https://www.w3.org/Consortium/Process/#ParticipationCriteria)) to follow the W3C [Code of Conduct](https://www.w3.org/Consortium/cepc/).

## Communication

Technical discussions for this Working Group are conducted in [public](https://www.w3.org/Consortium/Process/#confidentiality-levels): the meeting minutes from teleconference and face-to-face meetings will be archived for public review, and technical discussions and issue tracking will be conducted in a manner that can be both read and written to by the general public. Working Drafts and Editor's Drafts of specifications will be developed in public repositories and may permit direct public contribution requests.

Information about the group (including details about deliverables, issues, actions, status, participants, and meetings) will be available from the [Web Performance Working Group home page](https://www.w3.org/groups/wg/webperf).

Most Web Performance Working Group teleconferences will focus on discussion of particular specifications, and will be conducted on an as-needed basis.

This group primarily conducts its technical work on [GitHub](https://github.com/w3c/web-performance) in the relevant specifications repositories. The public is invited to review, discuss and contribute to this work.

The group may use a Member-only mailing list for administrative purposes and, at the discretion of the Chairs and members of the group, for member-only discussions in special cases when a participant requests such a discussion.

## Decision Policy

This group will seek to make decisions through consensus and due process, per the [W3C Process Document (section 5.2.1, Consensus)](https://www.w3.org/Consortium/Process/#Consensus). Typically, an editor or other participant makes an initial proposal, which is then refined in discussion with members of the group and other reviewers, and consensus emerges with little formal voting being required.

However, if a decision is necessary for timely progress and consensus is not achieved after careful consideration of the range of views presented, the Chairs may call for a group vote and record a decision along with any objections.

To afford asynchronous decisions and organizational deliberation, any resolution (including publication decisions) taken in a face-to-face meeting or teleconference will be considered provisional. A call for consensus (CfC) will be issued for all resolutions (for example, via email, GitHub issue or web-based survey), with a response period from one week to 10 working days, depending on the chair's evaluation of the group consensus on the issue. If no objections are raised by the end of the response period, the resolution will be considered to have consensus as a resolution of the Working Group.

All decisions made by the group should be considered resolved unless and until new information becomes available or unless reopened at the discretion of the Chairs.

This charter is written in accordance with the [W3C Process Document (Section 5.2.3, Deciding by Vote)](https://www.w3.org/Consortium/Process/#Votes) and includes no voting procedures beyond what the Process Document requires.

## Patent Policy

This Working Group operates under the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy/) (Version of 15 May 2025). To promote the widest adoption of Web standards, W3C seeks to issue Web specifications that can be implemented, according to this policy, on a Royalty-Free basis. For more information about disclosure obligations for this group, please see the [licensing information](https://www.w3.org/groups/wg/webperf/ipr).

## Licensing

This Working Group will use the [W3C Software and Document license](https://www.w3.org/Consortium/Legal/copyright-software) for all its deliverables.

## About this Charter

This charter has been created according to [section 3.4](https://www.w3.org/Consortium/Process/#GAGeneral) of the [Process Document](https://www.w3.org/Consortium/Process/). In the event of a conflict between this document or the provisions of any charter and the W3C Process, the W3C Process shall take precedence.
