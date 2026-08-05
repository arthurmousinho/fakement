import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
} from "date-fns";
import type {
  AdvanceVirtualClockInput,
  SetVirtualClockInput,
} from "../schemas/virtual-clock.schema.ts";

let currentTimestamp = Date.now();

function now(): Date {
  return new Date(currentTimestamp);
}

function set(input: SetVirtualClockInput): Date {
  currentTimestamp = input.currentDateTime.getTime();
  return now();
}

function advance({
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0,
}: AdvanceVirtualClockInput): Date {
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
