import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/util/db";
import fetchData from "@/util/api/fetchData";
import { Referral } from "@/interfaces";

const SERVICO = 500622165;
const BOA_VISTA_COLOMBO = 500387154;
const PONTA_GROSSA_CAMPOS_GERAIS = 500427238;
const TARUMÃ_PINHAIS = 500427239;
const IGUAÇU_CAMPO_COMPRIDO = 500483702;
const SÃO_LOURENÇO_CURITIBA = 500393700;
const PONTA_GROSSA_NORTE = 500251576;
const APS = 500625797;

const checkValidZone = function (zoneId: number) {
  return (
    zoneId === BOA_VISTA_COLOMBO ||
    zoneId === PONTA_GROSSA_CAMPOS_GERAIS ||
    zoneId === TARUMÃ_PINHAIS ||
    zoneId === IGUAÇU_CAMPO_COMPRIDO ||
    zoneId === SÃO_LOURENÇO_CURITIBA ||
    zoneId === PONTA_GROSSA_NORTE ||
    zoneId === APS ||
    zoneId === SERVICO
  );
};

function isTimestampAfterReference(reference: string, timestamp: number | string | Date): boolean {
  const referenceDate = new Date(reference);

  const inputDate = new Date(timestamp);
  return inputDate.getTime() > referenceDate.getTime();
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const MISSION_ID = Number(process.env.NEXT_PUBLIC_MISSION_ID);
  const UBA_AREA_ID = Number(process.env.NEXT_PUBLIC_UBA_AREA_ID);
  const url = `https://referralmanager.churchofjesuschrist.org/services/people/mission/${MISSION_ID}?includeDroppedPersons=true`;
  const { refreshToken, date, save } = req.query;

  const data = await fetchData(url, String(refreshToken));
  const rawReferrals: Referral[] = data.persons;

  if (!refreshToken) {
    res.status(400).send("provide a refreshToken");
  }

  if (!date) {
    res.status(400).send("provide a date");
  }

  const referrals = await prisma.reference.findMany();

  const filtered = rawReferrals.filter(
    (raw) =>
      !referrals.some((ref) => ref.id === raw.personGuid) &&
      checkValidZone(raw.zoneId) &&
      isTimestampAfterReference(String(date), raw.createDate) &&
      !raw.personGuid.includes("-")
  );

  if (save === "true" && filtered.length > 0) {
    const data = filtered.map((ref) => {
      return {
        id: ref.personGuid,
        name: ref.lastName ? `${ref.firstName} ${ref.lastName}` : `${ref.firstName}`,
        area_id: checkValidZone(ref.zoneId) ? (ref.areaId === UBA_AREA_ID ? 0 : ref.areaId) : 1,
        who_sent: "Python",
      };
    });
    try {
      await prisma.reference.createMany({
        data,
      });
      res.status(201).send("Multiple values created!");
    } catch (error) {
      res.status(500).send("INTERNAL_SERVER_ERROR");
    }
  }

  res.status(200).send(filtered);
}
