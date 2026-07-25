import { format } from "date-fns";

export const dateFormats = {
  long: "EEEE, dd MMMM yyyy, hh:mm:ss a",
  short: "dd MMMM yyyy, hh:mm a",
  medium: "dd MMM yyyy, hh:mm a",
  shortDate: "dd MMM yyyy",
  longDate: "EEEE, dd MMMM yyyy",
  longTime: "hh:mm:ss a",
  shortTime: "hh:mm a",
  dateOnly: "dd MMMM yyyy",
  timeOnly: "hh:mm:ss a",
  weekDaysOnly: "EEEE",
} as const;

export type DateFormatType = keyof typeof dateFormats;

interface PayloadProps {
  date?: Date | string | number;
  formatType?: DateFormatType;
}

export const formatISODate = ({ date = new Date(), formatType = "long" }: PayloadProps = {}): string => {
  const pattern = dateFormats[formatType] || dateFormats.long;
  return format(new Date(date), pattern);
};