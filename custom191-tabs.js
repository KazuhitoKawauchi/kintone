(function () {
  "use strict";
  kintone.events.on("app.record.index.show", function (event) {
    alert("✅ custom191-tabs.js is running!");
    return event;
  });
})();
