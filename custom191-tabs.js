(function() {
  "use strict";
  kintone.events.on("app.record.index.show", function(event) {
    console.log("\u2705 Connected to Kintone index view");
    var messageDiv = document.createElement("div");
    messageDiv.textContent = "\u2705 Script is working";
    var listArea = document.querySelector("#records-table, .recordlist-gaia, #record-gaia");
    if (listArea && listArea.parentNode) {
      listArea.parentNode.insertBefore(messageDiv, listArea.nextSibling);
    } else {
      document.body.appendChild(messageDiv);
    }
    return event;
  });
})();
