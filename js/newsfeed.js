// Quick n' dirty news feed
(function () {
try {
  var attempts = 0;

  function updateArticles(feed) {
      var body = document.getElementById("articles");

      if (body === null) {
        // just in case the network request was really fast
        attempts++;
        if (attempts < 5) {
          setTimeOut(function() { updateArticles(feed); }, 300);
        }
        return;
      }
      var items = feed.querySelectorAll("item");
      for (var i = 0; i < items.length; i++) {
        var item = items.item(i);
        var desc = item.querySelector("description").textContent;
        if (desc.indexOf("Web Performance") != -1) {
          var link =  item.querySelector("link").textContent;
          var article = document.createElement("article");
          article.appendChild(document.createElement("h3"));
          article.firstChild.textContent = item.querySelector("title").textContent;
          article.appendChild(document.createElement("p"));
          var d = new Date(item.querySelector("pubDate").textContent);
          article.lastChild.innerHTML =
            "<p class='date'><time class='dtstart' datetime='"
            + d.toISOString()
            + "''>" + d.toDateString()
            + "</time></p>"
            + item.querySelector("encoded").textContent;
          body.appendChild(article);
        }
      }
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4
        && this.status == 200) {
      updateArticles(this.responseXML);
    }
  };

  xhr.open("GET", "//www.w3.org/blog/news/feed", true);
  xhr.withCredentials = false;
  xhr.send(null);
} catch (e) {
}
})();
