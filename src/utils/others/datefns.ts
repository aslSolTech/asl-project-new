import { format } from "date-fns";

export const formatISODate = (date: Date | string | number = new Date()): string => {
  return format(new Date(date), "EEEE, dd MMMM yyyy, hh:mm:ss a");
};