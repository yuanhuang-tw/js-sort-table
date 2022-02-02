const sortTable = document.querySelector('.sort-table');
const allTh = sortTable.querySelectorAll('th');
const trs = sortTable.querySelectorAll('tbody tr');
let sortMethod;
let sortStatus;
let indexForSort;

allTh.forEach((th, i) => {
  th.dataset.index = i;
});

sortTable.addEventListener('click', e => {
  let ta = e.target;

  // 有 .sort-th 才會排序
  if (ta.classList.contains('sort-th')) {
    tableSort(ta.dataset.index);
  }
});

// --- function ---
function tableSort(sortThiscolumn) {
  let allTableData = getAllDataFromTable();
  let columnDataType = checkColumnDataType(allTableData, sortThiscolumn);

  // 目前點選的欄位跟上次不一樣的話，sortStatus 清空
  if (indexForSort != sortThiscolumn) {
    sortStatus = '';
  }

  if (sortStatus == '' || sortStatus == 'desc') {
    sortMethod = (columnDataType) ? sortAsc : sortNumberAsc;
    sortStatus = 'asc';
  } else {
    sortMethod = (columnDataType) ? sortDesc : sortNumberDesc;
    sortStatus = 'desc'
  }

  indexForSort = sortThiscolumn;

  allTableData.sort(sortMethod);

  showOrderIcon(sortStatus, sortThiscolumn);

  dataIntoTable(allTableData);
}

// 字串 小 -> 大
function sortAsc(a, b) {
  if (a[indexForSort].toLowerCase() < b[indexForSort].toLowerCase()) {
    return -1;
  }

  if (b[indexForSort].toLowerCase() < a[indexForSort].toLowerCase()) {
    return 1;
  }

  return 0;
}

// 字串 大 -> 小
function sortDesc(a, b) {
  if (a[indexForSort].toLowerCase() > b[indexForSort].toLowerCase()) {
    return -1;
  }

  if (b[indexForSort].toLowerCase() > a[indexForSort].toLowerCase()) {
    return 1;
  }

  return 0;
}

// 數字 小 -> 大
function sortNumberAsc(a, b) {
  return a[indexForSort] - b[indexForSort];
}

// 數字 大 -> 小
function sortNumberDesc(a, b) {
  return b[indexForSort] - a[indexForSort];
}

// 取得 table 資料並放到 array
// data 會是二維陣列
function getAllDataFromTable() {
  let data = [];

  trs.forEach(tr => {
    let tds = tr.querySelectorAll('td');
    let tdArray = [];

    tds.forEach(td => tdArray.push(td.innerHTML));

    data.push(tdArray);
  });

  return data;
}

// 確認欄位值的 data type
// 只要欄位內有一個值是 string 就回傳 true
function checkColumnDataType(allTableData, column) {
  return allTableData.some(row => isNaN(row[column]));
}

// 顯示 order icon
function showOrderIcon(sortStatus, sortThiscolumn) {
  let clickedTh = allTh[sortThiscolumn];
  const newSpan = document.createElement('span');

  // 清除每個 th 裡的 span
  for (let i = 0; i < allTh.length; i++) {
    if (allTh[i].childNodes.length > 1) {
      allTh[i].removeChild(allTh[i].childNodes[1]);
    }
  }

  clickedTh.appendChild(newSpan);

  if (sortStatus == 'asc') {
    clickedTh.childNodes[1].innerHTML = '<i class="fa fa-caret-up" aria-hidden="true"></i>';
  } else {
    clickedTh.childNodes[1].innerHTML = '<i class="fa fa-caret-down" aria-hidden="true"></i>';
  }
}

// 排序後資料放回 table
function dataIntoTable(allTableData) {
  for (let i = 0; i < allTableData.length; i++) {
    const tds = trs[i].querySelectorAll('td');

    for (let j = 0; j < tds.length; j++) {
      tds[j].innerHTML = allTableData[i][j];
    }
  }
}
// --- function ---