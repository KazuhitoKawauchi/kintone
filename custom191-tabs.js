(function () {
  "use strict";

  console.log("✅ custom191-tabs.js が読み込まれました");

  kintone.events.on("app.record.detail.show", function (event) {
    console.log("✅ kintone.events.on('app.record.detail.show') が発火しました");

    const container = kintone.app.record.getSpaceElement("custom_tabs_container");
    if (!container) {
      console.warn("⚠ スペースフィールド 'custom_tabs_container' が見つかりません");
    } else {
      console.log("✅ スペースフィールド 'custom_tabs_container' を取得しました");
      container.innerHTML = `<div style="padding:12px; border:1px solid #ccc;">📌 JavaScriptが正しく読み込まれました</div>`;
    }

    return event;
  });
})();
