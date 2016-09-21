For specs, see the [dashboard](http://www.w3.org/wiki/Web_Performance/Publications)

From [Google docs](http://bitly.com/webperf-tpac16)

The meeting starts at 9am and lasts until 5pm, each day.

Schedule (subject to change): https://docs.google.com/document/d/1U2DfWlToLlDoJyGvDZytM6VM2p67qisuCOfgnWIclzw/edit#heading=h.j1mdt1ve3sth


Administrative work
===================

* Move Beacon L1 to CR?
** Blocked on tests
* Move requestIdleCallback L1 to CR?
** 2nd implementation?
* Move Page Visibility L2 to CR?
* Move Performance Timeline L2 to CR?
* Blockers for moving Navigation Timing L2 to CR?
** Blocked on tests (and a 2nd implementation?)
* Blockers for moving Resource Timing L2 to CR?
* Blockers for moving User Timing L2 to CR?

Triage blocker spec issues
==========================

* HR-Time: translating timestamps between globals
* Performance Timeline: case sensitivity
* Resource Timing: inconsistent implementation of Timing-Allow-Origin
* User-Timing: SYNTAX_ERR exception
* Beacon: integration with Fetch API

New APIs and WIP proposals
==========================

Long Tasks API proposal (~1hr; panicker)

* V1 use cases, developer feedback, experimental data, security and privacy.
* V2 roadmap: attribution

First Paint / First Contentful Paint proposals (~2hr; panicker)

* Why we need a set of paint metrics
* Discuss definitions of FP and FCP

Declarative marks / “Hero Timing” (~1hr; igrigorik)

* Use cases: scanned, parsed, vs. render

Time to Interactive (TTI) (~30m; panicker)

* Use cases, experimental data, etc.

Memory API  (~30m; toddreif)

* Follow Up on the F2F discussion in June.
* Anyone able to write it up?

Chrome Reflector (~1hr; oysteine)

* Use cases, motivation, open questions, feedback.


Others

* Measuring Real Input Latency & SPA navigation timing
* Battery usage API?
* CPU usage API?
