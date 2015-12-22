// Quick n' dirty news feed
try {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4
        && this.status == 200) {
      var body = document.getElementById("w3c_content_body");
      var feed = this.responseXML;
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
      };
    }
  };

  xhr.open("GET", "//www.w3.org/blog/news/feed", true);
  xhr.withCredentials = false;
  xhr.send(null);
} catch (e) {
}
