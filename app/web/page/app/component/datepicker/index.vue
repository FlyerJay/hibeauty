<template>
    <div :class="className">
        <div :class="`${className}-toolbar`">
            <div :class="`${className}-toolbar-prev`" @click="onPrev">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-prev"></use>
                </svg>
            </div>
            <div :class="`${className}-display-date`" @click="changeChooseType">
                <template v-if="chooseType === 2">
                    {{years[0]}}-{{years[years.length-1]}}
                </template>
                <template v-else>
                    {{setting.year}}年{{setting.month}}月
                </template>
            </div>
            <div :class="`${className}-toolbar-next`" @click="onNext">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-next"></use>
                </svg>
            </div>
        </div>
        <transition-group name="zoom">
            <div v-if="chooseType === 0" key="week" class="snowye-canlendar-content">
                <div :class="`${className}-week`">
                    <div :class="`${className}-week-cell`" v-for="(item, index) in weeks" :key="index">{{item}}</div>
                </div>
                <div :class="`${className}-date`">
                    <div :class="`${className}-date-week`" v-for="(week, index) in monthDays" :key="index">
                        <div class="snowyet-calendar-date-cell" v-for="(day, subIndex) in week" :key="subIndex" :class="{'calendar-current-date': day.formatDate === setting.currentDate, 'calendar-selected-date': day.formatDate === setting.dateTime}" @click="onDateClick(day)">
                            {{day.date}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="chooseType === 1" key="month" class="snowye-canlendar-content">
                <div :class="`${className}-month`" class="clearfix">
                    <div :class="`${className}-month-cell notyear`" v-for="(item, index) in prevMonths" :key="'prev'+index" @click="selectPrevMonth(item)">
                        {{item}}月
                    </div>
                    <div :class="`${className}-month-cell`" v-for="(item, index) in months" :key="index" @click="selectMonth(item)">
                        {{item}}月
                    </div>
                    <div :class="`${className}-month-cell notyear`" v-for="(item, index) in nextMonths" :key="'next'+index" @click="selectNextMonth(item)">
                        {{item}}月
                    </div>
                </div>
            </div>
            <div v-if="chooseType === 2" key="year" class="snowye-canlendar-content">
                <div :class="`${className}-year`" class="clearfix">
                    <div :class="`${className}-year-cell`" v-for="(item, index) in years" :key="index" @click="selectYear(item)">
                        {{item}}
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>
<script>
import dateHelper from './helper.js';

const SETTING_MONTH = 'setting.month';
const SETTING_YEAR = 'setting.year';


export default {
  name: 'calendar',
  data() {
    return {
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      prevMonths: [9, 10, 11, 12],
      nextMonths: [1, 2, 3, 4],
      monthDays: [],
      years: [],
      setting: {
        year: '',
        month: '',
        date: '',
        dateTime: '',
        currentDate: ''
      },
      className: 'snowyet-calendar',
      chooseType: 0
    };
  },
  created() {
    // 获取当前时间
    if (!this.setting.currentDate) {
      this.setting.currentDate = dateHelper.getCurrentDate();
    }
    // 如果没有初始化时间就用今天作为默认时间
    const dateTime = this.setting.dateTime || this.setting.currentDate;
    const year = (this.setting.year = this.setting.year
      ? this.setting.year
      : new Date(dateTime).getFullYear());
    const month = (this.setting.month = this.setting.month
      ? this.setting.month
      : new Date(dateTime).getMonth() + 1);
    this.setting.date = new Date(dateTime).getDate();
    this.monthDays = dateHelper.formatDateByWeek(year, month);
  },
  watch: {
    [SETTING_MONTH](val) {
      this.updateCalendar();
    },
    [SETTING_YEAR](val) {
      this.updateCalendar();
    },
    chooseType(val) {
      if (val === 2) {
        this.computeYearRange(this.setting.year);
      }
    }
  },
  methods: {
    onPrev() {
      switch (this.chooseType) {
        case 1:
          this.prevYear();
          break;
        case 2:
          this.prevYearRange();
          break;
        default:
          this.prevMont();
          break;
      }
    },

    onNext() {
      switch (this.chooseType) {
        case 1:
          this.nextYear();
          break;
        case 2:
          this.nextYearRange();
          break;
        default:
          this.nextMont();
          break;
      }
    },

    onDateClick(day) {
      if (day.formatDate === 'none') return;
      this.setting.dateTime = day.formatDate;
      this.$emit('select-date', day);
    },

    prevMont() {
      this.setting.month > 1
        ? this.setting.month--
        : (this.setting.year--, (this.setting.month = 12));
    },

    nextMont() {
      this.setting.month < 12
        ? this.setting.month++
        : (this.setting.year++, (this.setting.month = 1));
    },

    prevYear() {
      this.setting.year--;
    },

    nextYear() {
      this.setting.year++;
    },

    prevYearRange() {
      let yearStart = this.years[0];
      const yearRange = [];
      yearStart -= 20;
      for (let i = yearStart; i < yearStart + 20; i++) {
        yearRange.push(i);
      }
      this.years = yearRange;
    },

    nextYearRange() {
      let yearStart = this.years[0];
      const yearRange = [];
      yearStart += 20;
      for (let i = yearStart; i < yearStart + 20; i++) {
        yearRange.push(i);
      }
      this.years = yearRange;
    },

    updateCalendar() {
      const year = this.setting.year;
      const month = this.setting.month;
      this.monthDays = dateHelper.formatDateByWeek(year, month);
    },

    changeChooseType() {
      this.chooseType = ++this.chooseType % 3;
    },

    selectYear(year) {
      this.setting.year = year;
      this.chooseType--;
    },

    selectMonth(month) {
      this.setting.month = month;
      this.chooseType--;
    },

    selectPrevMonth(month) {
      this.setting.month = month;
      this.setting.year--;
      this.chooseType--;
    },

    selectNextMonth(month) {
      this.setting.month = month;
      this.setting.year++;
      this.chooseType--;
    },

    computeYearRange(year) {
      const yearArray = String(year).split('');
      yearArray.pop();
      yearArray.push('0');
      const yearStart = Number(yearArray.join(''));
      const yearEnd = yearStart + 20;
      const yearRange = [];
      for (let i = yearStart; i < yearEnd; i++) {
        yearRange.push(i);
      }
      this.years = yearRange;
    }
  }
};
</script>
<style lang="less" scoped>
.zoom-enter-active {
  animation: zoomIn .3s ease;
}
.zoom-leave {
  opacity: 0;
}
.zoom-leave-acitve {
  transition: all .3s ease;
  opacity: 0;
}
.snowyet-calendar {
  height: 100%;
  .px2rem(padding-left, 30);
  .px2rem(padding-right, 30);
  .px2rem(min-height, 680);
  position: relative;
  .snowyet-calendar-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    .px2rem(height, 100);
    .px2rem(line-height, 100);
    .px2rem(margin-bottom, 20);
    .snowyet-calendar-toolbar-prev,
    .snowyet-calendar-toolbar-next {
      height: 100%;
      .px2rem(width, 150);
      text-align: center;
      .icon {
        color: #41bfaa;
      }
    }
    .snowyet-calendar-display-date {
      height: 100%;
      flex-grow: 1;
      text-align: center;
      .px2rem(font-size, 26);
      color: #666;
    }
  }
  .snowye-canlendar-content{
    .px2rem(min-height, 560);
    .px2rem(left, 30);
    .px2rem(right, 30);
    .px2rem(top, 120);
    position: absolute;
  }
  .snowyet-calendar-week {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .snowyet-calendar-week-cell {
      flex-grow: 1;
      .px2rem(height, 80);
      .px2rem(line-height, 80);
      .px2rem(width, 100);
      text-align: center;
    }
  }
  .snowyet-calendar-date {
    .snowyet-calendar-date-week {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .snowyet-calendar-date-cell {
        flex-grow: 1;
        .px2rem(height, 80);
        .px2rem(line-height, 80);
        .px2rem(width, 100);
        text-align: center;
        box-sizing: border-box;
        color: #888;
        &.calendar-current-date {
          color: #41bfaa;
          font-weight: bold;
        }
        &.calendar-selected-date {
          background-color: #41bfaa;
          color: #fff;
        }
      }
    }
  }
  .snowyet-calendar-month {
    .snowyet-calendar-month-cell {
      float: left;
      width: 25%;
      .px2rem(height, 100);
      .px2rem(line-height, 100);
      text-align: center;
      color: #888;
      &.notyear {
        color: #ccc;
      }
    }
  }
  .snowyet-calendar-year {
    .snowyet-calendar-year-cell {
      float: left;
      width: 25%;
      .px2rem(height, 100);
      .px2rem(line-height, 100);
      .px2rem(font-size, 24);
      text-align: center;
      color: #888;
    }
  }
}
</style>