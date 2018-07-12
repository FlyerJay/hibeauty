/**
 * @author flyerjay
 * @since 2018-06-20
 * @desc 日期
 */

// 判断年份是否为闰年
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// 根据年月计算当月天数
function calculateDay(year, month) {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    months[1] = 29;
  }
  return months[month - 1];
}

// 一个月的第一天是星期几
function getDay4Month(year, month) {
  const month1Day = new Date(); // 这个月的第一天
  month1Day.setFullYear(year);
  month1Day.setMonth(month - 1);
  month1Day.setDate(1);
  return month1Day.getDay();
}

// 一个月每一天的信息
function getDate4Month(year, month, gutter) {
  const now = new Date();
  year = year || now.getFullYear();
  month = month || now.getMonth() + 1;
  gutter = gutter || '-';
  const days = calculateDay(year, month);
  let week4Day = getDay4Month(year, month) - 1 + 7;
  const daySet = [];
  for (let i = 1; i <= days; i++) {
    daySet.push({
      week: week4Day % 7 + 1,
      date: i,
      year,
      month,
      formatDate: year + gutter + (month > 9 ? month : ('0' + month)) + gutter + (i > 9 ? i : ('0' + i)),
      isGutter: false
    });
    week4Day++;
  }
  return daySet;
}

// 以周格式化日期
function formatDateByWeek(year, month) {
  const now = new Date();
  year = year || now.getFullYear();
  month = month || now.getMonth() + 1;
  const daySet = getDate4Month(year, month);
  const firstDaysWeek = daySet[0].week;
  const lastDayWeek = daySet[daySet.length - 1].week;
  const weekSet = [];
  const gutterDay = {
    week: '',
    date: '',
    year: '',
    month: '',
    formatDate: 'none',
    isGutter: true
  };
  const unshiftDays = firstDaysWeek - 1;
  const pushDays = 7 - lastDayWeek;
  for (let i = 0; i < unshiftDays; i++) {
    daySet.unshift(gutterDay);
  }
  for (let i = 0; i < pushDays; i++) {
    daySet.push(gutterDay);
  }
  let startDay = 0;
  let endDay = 7;
  while (endDay <= daySet.length) {
    weekSet.push(daySet.slice(startDay, endDay));
    startDay += 7;
    endDay += 7;
  }
  return weekSet;
}

// 获取当前日期
function getCurrentDate(gutter) {
  return formatDate(new Date(), gutter);
}

// 日期格式化
function formatDate(time, gutter = '-') {
  time = new Date(time);
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  month = month > 9 ? month : ('0' + month);
  let date = time.getDate();
  date = date > 9 ? date : ('0' + date);
  return `${year}${gutter}${month}${gutter}${date}`;
}

export default {
  formatDateByWeek,
  getDate4Month,
  formatDate,
  getCurrentDate
};