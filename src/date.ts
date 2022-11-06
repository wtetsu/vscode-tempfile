/* eslint-disable @typescript-eslint/naming-convention */
import * as os from "os";

type DateParams = { [key: string]: string };

const Days = [
  { name: "Sun", value: 0 },
  { name: "Mon", value: 1 },
  // { name: "Tue", value: 2 },
  // { name: "Wed", value: 3 },
  // { name: "Thu", value: 4 },
  // { name: "Fri", value: 5 },
  // { name: "Sat", value: 6 },
];

export const makeDateParameters = (dateTime: Date): { [key: string]: string | DateParams } => {
  const params: { [key: string]: string | DateParams } = {
    tmpdir: os.tmpdir(),
    ...makeDateParams(dateTime),
  };

  for (const d of Days) {
    params[d.name] = makeDateParams(getLastDay(dateTime, d.value));
  }

  return params;
};

export const makeDateParams = (dateTime: Date): DateParams => {
  const year = dateTime.getFullYear().toString();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const date = dateTime.getDate().toString().padStart(2, "0");

  const hour = dateTime.getHours().toString().padStart(2, "0");
  const minute = dateTime.getMinutes().toString().padStart(2, "0");
  const second = dateTime.getSeconds().toString().padStart(2, "0");
  const millisecond = dateTime.getMilliseconds().toString().padStart(3, "0");

  return {
    YYYY: year,
    MM: month,
    DD: date,
    HH: hour,
    mm: minute,
    ss: second,
    SSS: millisecond,
  };
};

const getLastDay = (date: Date, day: number): Date => {
  for (let i = 0; i < 7; i++) {
    const d = new Date(date.getTime() - 86400 * 1000 * i);
    if (d.getDay() === day) {
      return d;
    }
  }
  return date;
};
