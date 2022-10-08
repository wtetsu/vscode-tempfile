/* eslint-disable @typescript-eslint/naming-convention */
import * as os from "os";

export const makeDateParameters = (dateTime: Date): { [key: string]: string } => {
  const year = dateTime.getFullYear().toString();
  const month = dateTime.getMonth().toString().padStart(2, "0");
  const date = dateTime.getDate().toString().padStart(2, "0");

  const hour = dateTime.getHours().toString().padStart(2, "0");
  const minute = dateTime.getMinutes().toString().padStart(2, "0");
  const second = dateTime.getSeconds().toString().padStart(2, "0");
  const millisecond = dateTime.getMilliseconds().toString().padStart(3, "0");

  return {
    tmpdir: os.tmpdir(),
    YYYY: year,
    MM: month,
    DD: date,
    HH: hour,
    mm: minute,
    ss: second,
    SSS: millisecond,
  };
};
