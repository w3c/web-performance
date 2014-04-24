function runTests(event) {
  var tests = event.data;
  var results = [];
  for (var i = 0; i < tests.length; i++) {
    try {
      results.push(eval(tests[i]));
    } catch(e) {
      results.push(str(e));
    }
  }
  return results;
}

self.onmessage = function(event) {
  var results = runTests(event);
  postMessage(results);
  self.close();
};

self.addEventListener("connect", function(event) {
  var port = event.ports[0];
  port.onmessage = function(event) {
    var results = runTests(event);
    port.postMessage(results);
  };
});
