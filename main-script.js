function nav_timing() {
  if (!!window.performance) {
    var t = window.performance.timing; // nav timing 1
    if (!!window.performance.getEntriesByType) {
      var nt = window.performance.getEntriesByType('navigation');
      if (nt !== undefined && nt !== null && nt.length > 0) {
        // we support nav-timing 2
        t = nt[0];
        document.getElementById('nav_timing_link').href = "http://www.w3.org/TR/navigation-timing-2/";
      }
    }
    document.getElementById("js_navigation_timing_redirect").textContent=""+(t.redirectEnd-t.redirectStart);
    document.getElementById("js_navigation_timing_app_cache").textContent=""+(t.domainLookupStart-t.fetchStart);
    document.getElementById("js_navigation_timing_dns_lookup").textContent=""+(t.domainLookupEnd-t.domainLookupStart);
    document.getElementById("js_navigation_timing_connect").textContent=""+(t.connectEnd-t.connectStart);
    document.getElementById("js_navigation_timing_request").textContent=""+(t.responseEnd-t.requestStart);
    document.getElementById("js_navigation_timing_processing").textContent=""+(t.domComplete-t.responseEnd);
    document.getElementById("js_navigation_timing").textContent=""+(t.domComplete-t.navigationStart);
  } else {
    var e = document.getElementById("timings");
    e.style.display = "none";
    e.parentNode.appendChild(document.createElement("p").appendChild(document.createTextNode("... does not support timing information.")));
  }
}
function res_timing() {
  if (!!window.performance && !!window.performance.getEntriesByType) {
    var resourceList = window.performance.getEntriesByType('resource');
    var resCounter = {};
    for (i = 0; i < resourceList.length; i++) {
      var type = resourceList[i].initiatorType;
      if (resCounter[type] === undefined) {
        var obj = {};
        obj.count = 0;
        obj.total = 0;
        resCounter[type] = obj;
      }
      resCounter[type].total += (resourceList[i].responseEnd - resourceList[i].startTime);
      resCounter[type].count += 1;
    }
    for (var key in resCounter) {
      var span = document.getElementById("js_resource_timing_" + key);
      if (span !== undefined && span !== null) {
        var measure = resCounter[key];
        span.textContent = ""+(measure.total / measure.count);
        span.parentNode.parentNode.firstElementChild.textContent = " "+measure.count+" ";
      }
    }
  } else {
  var e = document.getElementById("res_timings");
  e.style.display = "none";
  e.parentNode.appendChild(document.createElement("p").appendChild(document.createTextNode("... does not support resource timing information.")));
  }
}
window.addEventListener("load", nav_timing, false);
window.addEventListener("load", res_timing, false);
