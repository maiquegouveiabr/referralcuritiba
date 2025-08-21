import { AreaInfo, ContactAttempt, Referral } from "@/interfaces";
import fetchData from "@/util/api/fetchData";
import filterUniqueEvent from "@/util/filterUniqueEvent";
import pLimit from "p-limit";

const limit = pLimit(3);

async function fetchAreaInfo(referrals: Referral[], refreshToken: string) {
  return Promise.all(
    referrals.map(async (ref) => {
      const url = `https://referralmanager.churchofjesuschrist.org/services/mission/assignment?address=${ref.address}`;
      const areaInfo: AreaInfo = await fetchData(url, refreshToken);
      return { ...ref, areaInfo };
    })
  );
}

async function fetchEvents(referrals: Referral[], refreshToken: string) {
  return Promise.all(
    referrals.map(async (ref) => {
      const contactAttempts: ContactAttempt[] = await fetchData(
        `https://referralmanager.churchofjesuschrist.org/services/progress/timeline/${ref.personGuid}`,
        refreshToken
      );
      if (contactAttempts) {
        const filteredAttempts = filterUniqueEvent(contactAttempts.filter(({ timelineItemType }) => ["CONTACT", "TEACHING"].includes(timelineItemType)));
        return { ...ref, contactAttempts: filteredAttempts };
      }
      return { ...ref, contactAttempts: [] };
    })
  );
}

export async function loadReferralDetails(referrals: Referral[], refreshToken: string) {
  const withArea = await fetchAreaInfo(referrals, refreshToken);
  const withEvents = await fetchEvents(withArea, refreshToken);
  return withEvents;
}

export async function getReferrals(refreshToken: string) {
  const missionId = process.env.NEXT_PUBLIC_MISSION_ID;
  const url = `https://referralmanager.churchofjesuschrist.org/services/people/mission/${missionId}`;
  const data = await fetchData(url, refreshToken);
  if (!data) return [];
  const persons: Referral[] = data.persons;
  const filtered = persons.filter((ref) => !ref.areaId && ref.personStatusId === 1);
  filtered.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());

  return filtered;
}
