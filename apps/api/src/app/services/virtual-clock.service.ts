import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
} from "date-fns";

type AdvanceOptions = {
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
};

let currentTimestamp = Date.now();

function now(): Date {
  return new Date(currentTimestamp);
}

function set(date: Date): Date {
  currentTimestamp = date.getTime();
  return now();
}

function advance({
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0,
}: AdvanceOptions): Date {
  let nextDate = new Date(currentTimestamp);

  nextDate = addMinutes(nextDate, minutes);
  nextDate = addHours(nextDate, hours);
  nextDate = addDays(nextDate, days);
  nextDate = addWeeks(nextDate, weeks);
  nextDate = addMonths(nextDate, months);
  nextDate = addYears(nextDate, years);

  currentTimestamp = nextDate.getTime();

  return now();
}

function reset(): Date {
  currentTimestamp = Date.now();
  return now();
}

export const virtualClockService = {
  now,
  set,
  advance,
  reset,
};
