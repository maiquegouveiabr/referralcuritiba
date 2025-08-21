import { Referral } from "@/interfaces";

const isTimestampFromYesterday = (timestamp: number) => {
  // This function will return true if a given timestamp is between 9pm the day before yesterday - 9pm yesterday

  // Get datetime now
  const now = new Date();

  // Get given timestamp datetime
  const inputDate = new Date(timestamp);

  // Get today's 9 PM
  const ninePMToday = new Date(now);
  ninePMToday.setHours(21, 0, 0, 0);

  // Get yesterday's 9 PM
  const ninePMYesterday = new Date(ninePMToday);
  ninePMYesterday.setDate(ninePMYesterday.getDate() - 1);

  // Get before yesterday's 9 PM
  const ninePMBeforeYesterday = new Date(ninePMYesterday);
  ninePMBeforeYesterday.setDate(ninePMYesterday.getDate() - 1);

  return inputDate >= ninePMBeforeYesterday && inputDate <= ninePMYesterday;
};

export default function (referrals: Referral[]) {
  return referrals.filter((ref) => isTimestampFromYesterday(ref.createDate));
}
