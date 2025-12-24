import { Button } from "@/components/ui/button";
import { Interaction } from "@/hooks/interfaces";
import timestampToDate from "@/util/timestampToDate";
import { CopyIcon } from "lucide-react";

type Props = {
  interaction: Interaction;
};

function CopyButton({ interaction }: Props) {
  const handleCopy = async () => {
    if (!interaction.pickedArea || !interaction.pickedOffer) return;

    try {
      const areaName = interaction.pickedArea;

      const phoneNumber = interaction.requestConfirmation.phoneNumber || "PHONE_PLACEHOLDER";

      const text = `@${areaName}\n*${areaName}*\nEnviamos uma referência para vocês pelo Pregar Meu Evangelho!\n*${interaction.requestConfirmation.name} - ${
        interaction.pickedOffer
      }*\nNúmero: ${phoneNumber}\n*Cadastro em: ${timestampToDate(new Date(interaction.startTimestamp).getTime(), true)}*`;

      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
      alert("There was an error copying the text!");
    }
  };

  return (
    <Button className="w-fit cursor-pointer text-yellow-600 hover:bg-yellow-600 hover:text-white" onClick={handleCopy} variant="outline">
      <CopyIcon />
    </Button>
  );
}

export default CopyButton;
