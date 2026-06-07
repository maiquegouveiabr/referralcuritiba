/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/Select";
import { Area, Offer, StopTeachingReason, UbaArea, User } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";
import { Interaction } from "@/hooks/interfaces";

const specialAreaLabels: Record<number, string> = {
  0: "UBA Area",
  1: "Mission Name",
  2: "Reason To Stop Teaching",
};

type Props = {
  offers: Offer[];
  users: User[];
  areas: Area[];
  uba: UbaArea[];
  reasons: StopTeachingReason[];
  interaction: Interaction | null;
  setOpen: (open: boolean) => void;
  open: boolean;
  postSent: (interaction: Interaction, offer: string, areaName: string) => void;
};

export default function DialogComponent({ users, areas, offers, uba, reasons, interaction, open, setOpen, postSent }: Props) {
  const MISSION_ID = Number(process.env.NEXT_PUBLIC_MISSION_ID);
  const UBA_AREA_ID = Number(process.env.NEXT_PUBLIC_UBA_AREA_ID);
  const [ubaId, setUbaId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [offerId, setOfferId] = useState<number | null>(null);
  const [reasonId, setReasonId] = useState<number | null>(null);
  const [offer, setOffer] = useState("");
  const [other, setOther] = useState("");
  const [sending, setSending] = useState(false);
  const [disabledOffer, setDisabledOffer] = useState(true);
  const [disabledReason, setDisabledReason] = useState(true);

  if (!interaction) return null;

  const selectData = {
    users: useMemo(() => users.map(({ user_id, name }) => ({ id: user_id, name })), [users]),
    areas: useMemo(() => areas.map(({ id, name }) => ({ id, name })), [areas]),
    uba: useMemo(() => uba.map(({ id, name }) => ({ id, name })), [uba]),
    offers: useMemo(() => offers.map(({ id, name }) => ({ id, name })), [offers]),
    reasons: useMemo(() => reasons.map(({ id, name }) => ({ id, name })), [reasons]),
  };

  const handleSend = async () => {
    try {
      const trimmedOffer = offer.trim();
      let finalOffer = trimmedOffer;
      let finalOther = "";

      const OfferItemProps = offers.find((item) => item.id === offerId);
      if (!OfferItemProps) {
        alert("Please select an offer.");
        return;
      }

      // Use offer name unless it's "Other"
      if (OfferItemProps.id !== 1) {
        finalOffer = OfferItemProps.name;
      }

      // Validate base fields
      if (areaId === null || !userId || !finalOffer) {
        alert("Please, don't forget any fields!");
        return;
      }

      // Determine finalOther depending on areaId
      if (areaId === 0) {
        const ubaArea = uba.find((u) => u.id === ubaId);
        if (!ubaArea) {
          alert("Please select a UBA area.");
          return;
        }
        finalOther = ubaArea.name;
      } else if (areaId === 1) {
        if (!other.trim()) {
          alert("Please enter the mission name.");
          return;
        }
        finalOther = other.trim();
      } else if (areaId === 2) {
        const reasonItem = reasons.find((r) => r.id === reasonId);
        if (!reasonItem) {
          alert("Please select a reason to stop teaching.");
          return;
        }
        finalOther = reasonItem.id === 1 ? other.trim() : reasonItem.name;

        if (!finalOther) {
          alert("Please enter or select a reason to stop teaching.");
          return;
        }
      }

      const user = users.find((u) => u.user_id === userId);
      if (!user) {
        alert("Please select a missionary.");
        return;
      }

      setSending(true);

      const payload = {
        id: interaction.requestConfirmation.personGuid,
        name: interaction.requestConfirmation.name,
        who_sent: user.name,
        offer: finalOffer,
        phone: interaction.requestConfirmation.phoneNumber,
        area_id: areaId,
        other: finalOther,
      };

      const response = await fetch("/api/db/references", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 409) throw new Error("This referral was sent by someone else!");
        throw new Error("INTERNAL_SERVER_ERROR");
      }
      let areaName = "";
      if (areaId === 0) {
        const ubaName = uba?.find((area) => area.id === ubaId)?.name || "";
        areaName = ubaName;
      } else {
        const name = areas?.find((area) => area.id === areaId)?.name || "";
        areaName = name;
      }

      postSent(interaction, finalOffer.toUpperCase(), areaName);
      setOpen(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      console.error(error);
    } finally {
      setSending(false);
      setOpen(false);
    }
  };

  const handleResetForm = () => {
    setUserId(null);
    setUbaId(null);
    setAreaId(null);
    setOfferId(null);
    setReasonId(null);
    setOffer("");
    setOther("");
    setSending(false);
    setDisabledOffer(true);
    setDisabledReason(true);
  };

  useEffect(() => {
    if (!open) handleResetForm();
  }, [open]);

  useEffect(() => {
    setDisabledOffer(offerId === 1 ? false : true);
  }, [offerId]);

  useEffect(() => {
    setDisabledReason(reasonId === 1 ? false : true);
  }, [reasonId]);

  useEffect(() => {
    if (interaction.suggestedArea && interaction.suggestedArea.bestProsAreaId) {
      if (interaction.suggestedArea.missions && interaction.suggestedArea.missions[0].id !== MISSION_ID) {
        setAreaId(1);
        setOther(interaction.suggestedArea.missions[0].name);
      } else if (interaction.suggestedArea.bestProsAreaId === UBA_AREA_ID) setAreaId(0);
      else setAreaId(interaction.suggestedArea.bestProsAreaId);
    }
  }, [interaction, MISSION_ID, UBA_AREA_ID]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Save Referral</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm mt-1">Complete the form with the referral&apos;s information to save it.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-6">
          {/* Referral Name - Read Only */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Referral Name</Label>
            <Input disabled value={interaction.requestConfirmation.name} className="bg-gray-50 border-gray-200 text-gray-900" />
          </div>

          {/* Offer */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Offer *</Label>
            <Select
              {...(offerId != null ? { defaultValue: String(offerId) } : {})}
              onChange={setOfferId}
              placeholder="Select an offer"
              selectLabel="Offer"
              data={selectData.offers}
            />
            {!disabledOffer && (
              <Input
                type="text"
                placeholder="Enter custom offer"
                value={offer}
                onChange={(event) => setOffer(event.target.value)}
                className="border-gray-300"
              />
            )}
          </div>

          {/* Missionary */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Missionary *</Label>
            <Select
              {...(userId != null ? { defaultValue: String(userId) } : {})}
              onChange={setUserId}
              placeholder="Select a missionary"
              selectLabel="Missionaries"
              data={selectData.users}
            />
          </div>

          {/* Teaching Area */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Teaching Area *</Label>
            <Select
              {...(areaId != null ? { defaultValue: String(areaId) } : {})}
              onChange={setAreaId}
              placeholder="Select teaching area"
              selectLabel="Teaching Area"
              data={selectData.areas}
            />
          </div>

          {/* Conditional Fields */}
          {areaId === 1 && (
            <div className="space-y-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Label className="text-sm font-semibold text-gray-700">{specialAreaLabels[areaId]} *</Label>
              <Input
                type="text"
                placeholder="Enter mission name"
                value={other}
                onChange={(event) => setOther(event.target.value)}
                className="border-blue-300 bg-white"
              />
            </div>
          )}

          {areaId === 2 && (
            <div className="space-y-2 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <Label className="text-sm font-semibold text-gray-700">Reason To Stop Teaching *</Label>
              <Select
                {...(reasonId != null ? { defaultValue: String(reasonId) } : {})}
                onChange={setReasonId}
                placeholder="Select a reason"
                selectLabel="Reason To Stop Teaching"
                data={selectData.reasons}
              />
              {!disabledReason && (
                <Input
                  type="text"
                  placeholder="Enter additional details"
                  value={other}
                  onChange={(event) => setOther(event.target.value)}
                  className="border-purple-300 bg-white"
                />
              )}
            </div>
          )}

          {areaId === 0 && (
            <div className="space-y-2 bg-green-50 border border-green-200 rounded-lg p-4">
              <Label className="text-sm font-semibold text-gray-700">UBA Area *</Label>
              <Select
                {...(ubaId != null ? { defaultValue: String(ubaId) } : {})}
                onChange={setUbaId}
                placeholder="Select UBA area"
                selectLabel="UBA Area"
                data={selectData.uba}
              />
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="text-gray-700 border-gray-300 hover:bg-gray-50">
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
            {sending ? "Saving..." : "Save Referral"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
