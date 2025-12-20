import { Button } from "@/components/ui/button";
import { Referral } from "@/interfaces";
import timestampToDate from "@/util/timestampToDate";
import { CopyIcon } from "lucide-react";

type Props = {
  referral: Referral;
};

function CopyButton({ referral }: Props) {
  const handleCopy = async (ref: Referral) => {
    if (!ref.areaInfo || !ref.contactInfo) return;

    try {
      const areaName = ref.areaName || ref.areaInfo.proselytingAreas?.[0]?.name || "AREA_PLACEHOLDER";

      const phoneNumber = ref.contactInfo.phoneNumbers?.[0]?.number || "PHONE_PLACEHOLDER";

      const text = `@${areaName}\n*${areaName}*\nEnviamos uma referência para vocês pelo Pregar Meu Evangelho!\n${
        ref.lastName ? `*${ref.firstName} ${ref.lastName}*` : `*${ref.firstName}*`
      } - ${ref.offerText ? `*${ref.offerText}*` : `*OFERTA_PLACEHOLDER*`}\nNúmero: ${phoneNumber}\n*Cadastro em: ${timestampToDate(
        new Date(ref.createDate).getTime(),
        true
      )}*`;

      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
      alert("There was an error copying the text!");
    }
  };

  return (
    <Button className="w-fit cursor-pointer text-yellow-600 hover:bg-yellow-600 hover:text-white" onClick={() => handleCopy(referral)} variant="outline">
      <CopyIcon />
    </Button>
  );
}

export default CopyButton;
