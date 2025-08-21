import fetchData from "./fetchData";
import { District, ProsArea, Zone } from "@/interfaces";

export default async (refreshToken: string): Promise<{ zone: Zone; areas: ProsArea[] }[]> => {
  const missionId = process.env.NEXT_PUBLIC_MISSION_ID;
  const url = `https://referralmanager.churchofjesuschrist.org/services/mission/${missionId}`;
  const data = await fetchData(url, refreshToken);
  if (!data) return [];

  const zonesArr = data.mission.children || [];
  return zonesArr.map((zone: Zone) => ({
    zone: { name: zone.name, id: zone.id },
    areas: zone.children.flatMap((district: District) => district.children),
  }));
};
