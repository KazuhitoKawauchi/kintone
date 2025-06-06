(function () {
  "use strict";
  console.log("✅ custom191-tabs.js が読み込まれました");
})();

(function () {
  "use strict";

  console.log("✅ custom191-tabs.js が読み込まれました");

  const chartScript = document.createElement("script");
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
  chartScript.onload = init;
  document.head.appendChild(chartScript);

  function init() {
    kintone.events.on("app.record.detail.show", function (event) {
      console.log("✅ kintone.events.on('app.record.detail.show') が発火しました");

      const container = kintone.app.record.getSpaceElement("custom_tabs_container");
      if (!container) {
        console.warn("⚠ スペースフィールド 'custom_tabs_container' が見つかりません");
        return event;
      }

      container.innerHTML = "";

      const tabWrap = document.createElement("div");
      const btn = document.createElement("button");
      btn.textContent = "Customer-based";
      btn.style.marginBottom = "8px";
      const tab = document.createElement("div");
      tab.id = "customer-tab";
      tabWrap.appendChild(btn);
      tabWrap.appendChild(tab);
      container.appendChild(tabWrap);

      btn.addEventListener("click", () => renderCustomer(tab));

      renderCustomer(tab);

      return event;
    });
  }

  function renderCustomer(target) {
    const data = [
      {
        "Customer name": "Alpha Ltd",
        "Sales amount": 1200000,
        "Outsourcing cost": 200000,
        "Paper cost": 50000,
      },
      {
        "Customer name": "Beta Inc",
        "Sales amount": 800000,
        "Outsourcing cost": 150000,
        "Paper cost": 30000,
      },
      {
        "Customer name": "Gamma Co",
        "Sales amount": 500000,
        "Outsourcing cost": 100000,
        "Paper cost": 20000,
      },
    ];

    data.forEach((d) => {
      d["Total cost"] = d["Outsourcing cost"] + d["Paper cost"];
      d["Total profit"] = d["Sales amount"] - d["Total cost"];
      d["Profit margin"] = ((d["Total profit"] / d["Sales amount"]) * 100).toFixed(1) + "%";
      d["Processing Revenue"] = d["Sales amount"] - d["Outsourcing cost"] - d["Paper cost"];
    });

    target.innerHTML = "";

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 260;
    target.appendChild(canvas);

    new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: data.map((d) => d["Customer name"]),
        datasets: [
          {
            label: "Sales",
            data: data.map((d) => d["Sales amount"] / 1000),
            backgroundColor: "#3399ff",
          },
          {
            label: "Processing Revenue",
            data: data.map((d) => d["Processing Revenue"] / 1000),
            backgroundColor: "#66cc66",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: false,
        scales: { x: { beginAtZero: true } },
      },
    });

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "12px";

    const headers = [
      "Customer name",
      "Sales amount",
      "Outsourcing cost",
      "Paper cost",
      "Total cost",
      "Total profit",
      "Profit margin",
    ];

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    headers.forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      th.style.border = "1px solid #ccc";
      th.style.padding = "4px";
      th.style.backgroundColor = "#f0f0f0";
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach((row) => {
      const tr = document.createElement("tr");
      headers.forEach((h) => {
        const td = document.createElement("td");
        td.textContent = row[h];
        td.style.border = "1px solid #ccc";
        td.style.padding = "4px";
        td.style.textAlign = "center";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    target.appendChild(table);
  }
})();
