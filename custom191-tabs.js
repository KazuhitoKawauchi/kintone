// === 【コード版 v1.3.15：完全版】 ===
(function () {
  'use strict';

  const chartJsScript = document.createElement('script');
  chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  chartJsScript.onload = init;
  document.head.appendChild(chartJsScript);

  function init() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const formatNumber = (num) => num.toLocaleString();

    const demoData = [
      { '担当者名': '佐藤', '売上金額': 950000, '売上予算': 1000000, '加工高': 500000, '加工高予算': 500000, '加工高率': '52.6%', '加工高達成率': '100%' },
      { '担当者名': '鈴木', '売上金額': 640000, '売上予算': 800000, '加工高': 340000, '加工高予算': 400000, '加工高率': '53.1%', '加工高達成率': '85%' },
      { '担当者名': '田中', '売上金額': 1150000, '売上予算': 1200000, '加工高': 570000, '加工高予算': 600000, '加工高率': '49.6%', '加工高達成率': '95%' }
    ];

    const customerData = [
      { '得意先名': 'A商事', '売上金額': 1000000, '外注費': 300000, '用紙費': 100000 },
      { '得意先名': 'B工業', '売上金額': 800000, '外注費': 250000, '用紙費': 80000 },
      { '得意先名': 'C販売', '売上金額': 600000, '外注費': 200000, '用紙費': 70000 }
    ];

    const createTable = (data) => {
      const container = document.createElement('div');
      container.style.width = '100%';
      container.style.overflowX = 'auto';
      container.style.marginTop = '6px';

      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';

      const headers = ['担当者名', '売上予算', '売上金額', '加工高予算', '加工高', '加工高率', '加工高達成率'];
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      headers.forEach(key => {
        const th = document.createElement('th');
        th.innerText = key;
        th.style.border = '1px solid #ccc';
        th.style.textAlign = 'center';
        th.style.padding = '6px';
        th.style.backgroundColor = ['加工高予算', '加工高', '加工高率', '加工高達成率'].includes(key) ? '#ffcc66' : '#3399ff';
        th.style.color = ['加工高予算', '加工高', '加工高率', '加工高達成率'].includes(key) ? '#000' : '#fff';
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      data.forEach((row, idx) => {
        const tr = document.createElement('tr');
        const isOdd = idx % 2 === 1;
        headers.forEach(key => {
          const td = document.createElement('td');
          const val = row[key];
          const showVal = typeof val === 'number' ? formatNumber(val) : val;
          td.innerText = showVal;
          td.style.border = '1px solid #ccc';
          td.style.textAlign = 'center';
          td.style.padding = '6px';
          td.style.backgroundColor = ['加工高予算', '加工高', '加工高率', '加工高達成率'].includes(key)
            ? (isOdd ? '#ffe0b3' : '#fff')
            : (isOdd ? '#e6f3ff' : '#fff');
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      container.appendChild(table);
      return container;
    };

    const createCustomerTable = (data) => {
      const container = document.createElement('div');
      container.style.width = '100%';
      container.style.overflowX = 'auto';
      container.style.marginTop = '6px';

      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';

      const headers = ['得意先名', '売上金額', '外注費', '用紙費', '原価合計', '利益合計', '利益率'];
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      headers.forEach(key => {
        const th = document.createElement('th');
        th.innerText = key;
        th.style.border = '1px solid #ccc';
        th.style.textAlign = 'center';
        th.style.padding = '6px';
        th.style.backgroundColor = ['外注費', '用紙費', '原価合計', '利益合計', '利益率'].includes(key) ? '#ffcc66' : '#3399ff';
        th.style.color = ['外注費', '用紙費', '原価合計', '利益合計', '利益率'].includes(key) ? '#000' : '#fff';
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      data.forEach((row, idx) => {
        const tr = document.createElement('tr');
        const isOdd = idx % 2 === 1;
        const cost = row['外注費'] + row['用紙費'];
        const profit = row['売上金額'] - cost;
        const rate = row['売上金額'] ? ((profit / row['売上金額']) * 100).toFixed(1) + '%' : '0%';
        const values = {
          '得意先名': row['得意先名'],
          '売上金額': row['売上金額'],
          '外注費': row['外注費'],
          '用紙費': row['用紙費'],
          '原価合計': cost,
          '利益合計': profit,
          '利益率': rate
        };
        headers.forEach(key => {
          const td = document.createElement('td');
          const val = values[key];
          const showVal = typeof val === 'number' ? formatNumber(val) : val;
          td.innerText = showVal;
          td.style.border = '1px solid #ccc';
          td.style.textAlign = 'center';
          td.style.padding = '6px';
          td.style.backgroundColor = ['外注費', '用紙費', '原価合計', '利益合計', '利益率'].includes(key)
            ? (isOdd ? '#ffe0b3' : '#fff')
            : (isOdd ? '#e6f3ff' : '#fff');
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      container.appendChild(table);
      return container;
    };

    const createSelector = (tabId, color) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'ym-select';
      wrapper.style.backgroundColor = color;
      wrapper.style.padding = '6px';
      wrapper.style.marginBottom = '8px';

      let yearOptions = '', monthOptions = '';
      for (let i = 0; i < 5; i++) {
        const year = 2024 + i;
        yearOptions += `<option value="${year}"${year === currentYear ? ' selected' : ''}>${year}年</option>`;
      }
      for (let m = 1; m <= 12; m++) {
        monthOptions += `<option value="${m}"${m === currentMonth ? ' selected' : ''}>${m}月</option>`;
      }

      wrapper.innerHTML = `
        <label style="margin-right:8px;">表示年月：</label>
        <select id="year-select-${tabId}">${yearOptions}</select>
        <select id="month-select-${tabId}">${monthOptions}</select>
        <button id="refresh-btn-${tabId}" style="margin-left:8px;">再表示</button>
      `;
      return wrapper;
    };

    const tabColors = {
      staff: '#e0f0ff',
      dummy1: '#e0f9e6',
      dummy2: '#f9e0ed',
      month: '#ffe8d9'
    };

    const renderTabs = () => {
      const header = kintone.app.getHeaderSpaceElement();
      const wrap = document.createElement('div');
      wrap.id = 'custom-tab-wrap';
      wrap.innerHTML = `
        <style>
          .tab-buttons { margin-left: 8px; margin-top: 4px; }
          .tab-buttons button {
            margin-right: 6px; padding: 6px 12px; border-radius: 4px; border: none;
            color: #fff; font-weight: bold;
          }
          .tab-buttons button[data-tab="staff"] { background-color: #3399ff; }
          .tab-buttons button[data-tab="dummy1"] { background-color: #33aa66; }
          .tab-buttons button[data-tab="dummy2"] { background-color: #cc6699; }
          .tab-buttons button[data-tab="month"] { background-color: #ff6600; }
          .tab-content { display: none; margin-top: 10px; }
          .tab-content.active { display: block; }
          .chart-wrapper { display: flex; justify-content: center; gap: 40px; margin-top: 12px; }
          canvas { background: #fff; border: 1px solid #ccc; }
        </style>
        <div class="tab-buttons">
          <button data-tab="staff">担当者別</button>
          <button data-tab="dummy1">得意先別</button>
          <button data-tab="dummy2">品名別</button>
          <button data-tab="month">年月別</button>
        </div>
        <div id="tab-staff" class="tab-content"></div>
        <div id="tab-dummy1" class="tab-content"></div>
        <div id="tab-dummy2" class="tab-content"><p>品名別：今後対応</p></div>
        <div id="tab-month" class="tab-content"><p>年月別：今後対応</p></div>
      `;
      header.appendChild(wrap);

      const buttons = wrap.querySelectorAll('.tab-buttons button');
      const contents = wrap.querySelectorAll('.tab-content');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.dataset.tab;
          buttons.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          const content = document.getElementById(`tab-${tabId}`);
          content.classList.add('active');

          content.innerHTML = '';
          const selector = createSelector(tabId, tabColors[tabId]);
          content.appendChild(selector);

          if (tabId === 'staff') {
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'chart-wrapper';
            chartWrapper.innerHTML = `
              <div>
                <h4 style="text-align:center;margin:4px 0;">売上グラフ</h4>
                <canvas id="sales-chart" width="400" height="260"></canvas>
              </div>
              <div>
                <h4 style="text-align:center;margin:4px 0;">粗利グラフ</h4>
                <canvas id="profit-chart" width="400" height="260"></canvas>
              </div>
            `;
            content.appendChild(chartWrapper);
            content.appendChild(createTable(demoData));

            const labels = demoData.map(d => d['担当者名']);
            new Chart(document.getElementById('sales-chart').getContext('2d'), {
              type: 'bar',
              data: {
                labels,
                datasets: [
                  { label: '売上予算', data: demoData.map(d => d['売上予算'] / 1000), backgroundColor: '#66ccff' },
                  { label: '売上金額', data: demoData.map(d => d['売上金額'] / 1000), backgroundColor: '#3399ff' }
                ]
              },
              options: { responsive: false, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top' } }, animation: false }
            });

            new Chart(document.getElementById('profit-chart').getContext('2d'), {
              type: 'bar',
              data: {
                labels,
                datasets: [
                  { label: '加工高予算', data: demoData.map(d => d['加工高予算'] / 1000), backgroundColor: '#ffcc66' },
                  { label: '加工高', data: demoData.map(d => d['加工高'] / 1000), backgroundColor: '#ff9966' }
                ]
              },
              options: { responsive: false, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top' } }, animation: false }
            });
          } else if (tabId === 'dummy1') {
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'chart-wrapper';
            chartWrapper.innerHTML = `
              <div>
                <h4 style="text-align:center;margin:4px 0;">得意先別売上・加工高</h4>
                <canvas id="customer-chart" width="400" height="260"></canvas>
              </div>
            `;
            content.appendChild(chartWrapper);
            content.appendChild(createCustomerTable(customerData));

            const labels = customerData.map(d => d['得意先名']);
            new Chart(document.getElementById('customer-chart').getContext('2d'), {
              type: 'bar',
              data: {
                labels,
                datasets: [
                  { label: '売上金額', data: customerData.map(d => d['売上金額'] / 1000), backgroundColor: '#3399ff' },
                  { label: '加工高', data: customerData.map(d => (d['外注費'] + d['用紙費']) / 1000), backgroundColor: '#ff9966' }
                ]
              },
              options: { responsive: false, maintainAspectRatio: false, indexAxis: 'y', scales: { x: { beginAtZero: true } }, plugins: { legend: { position: 'top' } }, animation: false }
            });
          }

          const refreshBtn = document.getElementById(`refresh-btn-${tabId}`);
          refreshBtn.addEventListener('click', () => {
            const year = document.getElementById(`year-select-${tabId}`).value;
            const month = document.getElementById(`month-select-${tabId}`).value;
            alert(`${year}年 ${month}月 のデータを表示（※ダミー）`);
          });

          if (!document.getElementById('custom-hide-kintone-list')) {
            const style = document.createElement('style');
            style.id = 'custom-hide-kintone-list';
            style.innerHTML = `
              .gaia-argoui-app-index-table,
              .gaia-argoui-app-index-list,
              .gaia-argoui-app-index-pane,
              .gaia-argoui-app-index-content,
              .gaia-argoui-app-index-no-record,
              .recordlist-gaia,
              .gaia-argoui-app-index-pager {
                display: none !important;
              }
            `;
            document.head.appendChild(style);
          }
        });
      });
    }

    kintone.events.on('app.record.index.show', () => {
      if (!document.getElementById('custom-tab-wrap')) renderTabs();
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-buttons button').forEach(el => el.classList.remove('active'));
    });
  }
})();
