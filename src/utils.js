import dayjs from "dayjs";
import { TOTAL_HOURS } from "./constants";

export const getAnyWeek = (weekDay) => {
  const days = [];
  const weekStart = dayjs(weekDay).startOf("week");

  let currentDay = weekStart;
  let i = 0;
  while (i < 7) {
    days.push(currentDay);
    i++;
    currentDay = weekStart.add(i, "day");
  }
  return days;
};

export const getCurrentWeek = () => {
  return getAnyWeek();
};

export const getNextWeek = (activeWeek) => {
  const activeWeekDay = activeWeek[0];
  const nextWeekDay = dayjs(activeWeekDay).add(7, "day");
  return getAnyWeek(nextWeekDay);
};

export const getPreviousWeek = (activeWeek) => {
  const activeWeekDay = activeWeek[0];
  const previousWeekDay = dayjs(activeWeekDay).subtract(7, "day");
  return getAnyWeek(previousWeekDay);
};

export const getActiveMonthFromWeek = (week) => {
  const firstDate = dayjs(week[0]);

  let res = [firstDate];
  for (let i = 1; i < week.length; i++) {
    const date = week[i];
    const hasSameMonth = dayjs(date).isSame(week[i - 1], "month");

    if (!hasSameMonth) {
      res.push(date);
      break;
    }
  }

  const formattedMonths = res
    .map((item) => dayjs(item).format("MMM YYYY"))
    .join("-");
  return formattedMonths;
};

export const getHourSlices = () => {
  const hourSlices = [];
  for (let i = 0; i < TOTAL_HOURS; i++) {
    const slice = [i, i + 1];
    hourSlices.push(slice);
  }
  return hourSlices;
};

export const getTimeSlots = () => {
  const timeSlots = [];
  for (let i = 1; i < TOTAL_HOURS; i++) {
    const formatted = dayjs().hour(i).format("hh A");
    timeSlots.push(formatted);
  }
  return timeSlots;
};

export const isDateExistInWeek = (week, date) => {
  return week.find((day) => dayjs(day).isSame(date, "day"));
};
