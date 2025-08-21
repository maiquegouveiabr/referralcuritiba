import { Referral } from "@/interfaces";

const BOA_VISTA_COLOMBO = 500387154;
const PONTA_GROSSA_CAMPOS_GERAIS = 500427238;
const TARUMÃ_PINHAIS = 500427239;
const IGUAÇU_CAMPO_COMPRIDO = 500483702;
const SÃO_LOURENÇO_CURITIBA = 500393700;
const PONTA_GROSSA_NORTE = 500251576;
const APS = 500625797;

const checkValidZone = function ({ zoneId }: Referral) {
  return (
    zoneId === BOA_VISTA_COLOMBO ||
    zoneId === PONTA_GROSSA_CAMPOS_GERAIS ||
    zoneId === TARUMÃ_PINHAIS ||
    zoneId === IGUAÇU_CAMPO_COMPRIDO ||
    zoneId === SÃO_LOURENÇO_CURITIBA ||
    zoneId === PONTA_GROSSA_NORTE
  );
};

const checkValidArea = function (idArr: number[], areaId: number) {
  return idArr.some((id) => id === areaId);
};

interface AreaAPI {
  id: number;
  name: string;
  zone_id: number;
}

export default function (referrals: Referral[], areas: AreaAPI[]) {
  return referrals.filter(
    (ref) =>
      ref &&
      checkValidArea(
        areas.map((area) => area.id),
        ref.areaId
      ) &&
      checkValidZone(ref) &&
      (ref.referralStatusId === 20 || ref.referralStatusId === 10) &&
      ref.personStatusId !== 40
  );
}
