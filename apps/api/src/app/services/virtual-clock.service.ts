import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
} from "date-fns";
import { prismaSingleton } from "../../config/prisma.ts";
import type {
  AdvanceVirtualClockInput,
  SetVirtualClockInput,
} from "../schemas/virtual-clock.schema.ts";

const CLOCK_ID = "default";

async function initialize() {
  await prismaSingleton.virtualClock.upsert({
    where: { id: CLOCK_ID },
    update: {},
    create: {
      id: CLOCK_ID,
      currentDateTime: new Date(),
    },
  });
}

async function now(): Promise<Date> {
  const clock = await prismaSingleton.virtualClock.findUniqueOrThrow({
    where: { id: CLOCK_ID },
  });
  return clock.currentDateTime;
}

async function set(input: SetVirtualClockInput): Promise<Date> {
  const clock = await prismaSingleton.virtualClock.update({
    where: { id: CLOCK_ID },
    data: { currentDateTime: input.currentDateTime },
  });
  return clock.currentDateTime;
}

async function advance({
  minutes = 0,
  hours = 0,
  days = 0,
  weeks = 0,
  months = 0,
  years = 0,
}: AdvanceVirtualClockInput): Promise<Date> {
  const currentDateTime = await now();
  let nextDate = currentDateTime;

  nextDate = addMinutes(nextDate, minutes);
  nextDate = addHours(nextDate, hours);
  nextDate = addDays(nextDate, days);
  nextDate = addWeeks(nextDate, weeks);
  nextDate = addMonths(nextDate, months);
  nextDate = addYears(nextDate, years);

  const clock = await prismaSingleton.virtualClock.update({
    where: { id: CLOCK_ID },
    data: { currentDateTime: nextDate },
  });
  return clock.currentDateTime;
}

async function reset(): Promise<Date> {
  const clock = await prismaSingleton.virtualClock.update({
    where: { id: CLOCK_ID },
    data: { currentDateTime: new Date() },
  });
  return clock.currentDateTime;
}

export const virtualClockService = {
  initialize,
  now,
  set,
  advance,
  reset,
};
