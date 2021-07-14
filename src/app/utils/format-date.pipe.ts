import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from "dayjs";

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

@Pipe({
  name: "formatDate",
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date | number, dateFormat: string): unknown {
    if (value == null) {
      return "";
    }
    if (dateFormat == undefined || dateFormat == null) {
      dateFormat = "dd-MM-yyyy";
    }


    dateFormat = dateFormat.toUpperCase();
    if (value instanceof Date || isNumber(value)) {
      return dayjs(value).format(dateFormat) 
    } else {
      return "";
    }
  }
}
