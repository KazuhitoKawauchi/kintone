(function () {
  "use strict";

  console.log("✅ custom191-tabs.js が読み込まれました");

  kintone.events.on("app.record.index.show", function (event) {
    console.log("✅ kintone.events.on('app.record.index.show') が発火しました");

    const header = kintone.app.getHeaderSpaceElement();
    if (!header) {
      console.warn("⚠ ヘッダースペースが取得できませんでした");
    } else {
      console.log("✅ kintone.app.getHeaderSpaceElement() 取得成功");
      const msg = document.createElement('div');
      msg.innerHTML = `<div style="padding:12px; border:1px solid #ccc;">📌 JSは一覧画面で正常に動作中です</div>`;
      header.appendChild(msg);
    }

    return event;
  });
})();
