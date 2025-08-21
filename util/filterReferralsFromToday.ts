import { Referral } from "@/interfaces";

const isTimestampFromToday = (timestamp: number) => {
  // This function will return true if a given timestamp is between 9pm yesterday - 9pm today

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

  return inputDate >= ninePMYesterday && inputDate <= ninePMToday;
};

export default function (referrals: Referral[]) {
  return referrals.filter((ref) => isTimestampFromToday(ref.createDate));
}
