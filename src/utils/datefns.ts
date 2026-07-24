import { format } from "date-fns";

export const formatISODate = (date: string) => format(new Date(date), "EEEE, dd MMMM yyyy, hh:mm:ss a");

// console.log(formatISODate("2026-07-24T12:39:14+05:30"));