/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/Select";
import { Area, Offer, Referral, StopTeachingReason, UbaArea, User } from "@/interfaces";
import { useEffect, useMemo, useState } from "react";

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
  ref: Referral | null;
  setOpen: (open: boolean) => void;
  open: boolean;
  postSent: (ref: Referral, offer: string, areaName: string) => void;
};

export default function DialogComponent({ users, areas, offers, uba, reasons, ref, open, setOpen, postSent }: Props) {
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

  if (!ref) return null;

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

      const offerItem = offers.find((item) => item.id === offerId);
      if (!offerItem) {
        alert("Please select an offer.");
        return;
      }

      // Use offer name unless it's "Other"
      if (offerItem.id !== 1) {
        finalOffer = offerItem.name;
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
        id: ref.personGuid,
        name: ref.firstName,
        who_sent: user.name,
        offer: finalOffer,
        phone: ref.contactInfo?.phoneNumbers?.[0]?.number || "",
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

      postSent(ref, finalOffer.toUpperCase(), areaName);
      setOpen(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    setDisabledOffer(offerId === 1 ? false : true);
  }, [offerId]);

  useEffect(() => {
    setDisabledReason(reasonId === 1 ? false : true);
  }, [reasonId]);

  useEffect(() => {
    if (ref.areaInfo && ref.areaInfo.bestProsAreaId) {
      if (ref.areaInfo.missions && ref.areaInfo.missions[0].id !== MISSION_ID) {
        setAreaId(1);
        setOther(ref.areaInfo.missions[0].name);
      } else if (ref.areaInfo.bestProsAreaId === UBA_AREA_ID) setAreaId(0);
      else setAreaId(ref.areaInfo.bestProsAreaId);
    }
  }, [ref, MISSION_ID, UBA_AREA_ID]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[var(--header-button)] ">Save Referral</DialogTitle>
          <DialogDescription className="text-[var(--header-button)] ">
            Fill out the form with the referral&apos;s information and hit the save button.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left text-[var(--header-button)] ">
              Referral Name
            </Label>
            <Input disabled value={ref?.firstName} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="offer" className="text-left text-[var(--header-button)] ">
              Offer
            </Label>
            <div className="grid gap-2">
              <Select
                {...(offerId != null ? { defaultValue: String(offerId) } : {})}
                onChange={setOfferId}
                placeholder="Select Offer"
                selectLabel="Offer"
                data={selectData.offers}
              />
              {!disabledOffer && <Input type="text" value={offer} onChange={(event) => setOffer(event.target.value)} />}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="who" className="text-left text-[var(--header-button)] ">
              Who Are You
            </Label>
            <Select
              {...(userId != null ? { defaultValue: String(userId) } : {})}
              onChange={setUserId}
              placeholder="Select Missionary"
              selectLabel="Missionaries"
              data={selectData.users}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="who" className="text-left text-[var(--header-button)] ">
              Teaching Area
            </Label>
            <Select
              {...(areaId != null ? { defaultValue: String(areaId) } : {})}
              onChange={setAreaId}
              placeholder="Select Teaching Area"
              selectLabel="Teaching Area"
              data={selectData.areas}
            />
          </div>
          {areaId === 1 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="other" className="text-left text-[var(--header-button)] ">
                {specialAreaLabels[areaId]}
              </Label>
              <Input type="text" value={other} className="col-span-3" onChange={(event) => setOther(event.target.value)} />
            </div>
          )}
          {areaId === 2 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="who" className="text-left text-[var(--header-button)] ">
                Reason To Stop Teaching
              </Label>
              <div className="grid gap-2">
                <Select
                  {...(ubaId != null ? { defaultValue: String(reasonId) } : {})}
                  onChange={setReasonId}
                  placeholder="Select Reason To Stop Teaching"
                  selectLabel="Reason To Stop Teaching"
                  data={selectData.reasons}
                />
                {!disabledReason && <Input type="text" value={other} onChange={(event) => setOther(event.target.value)} />}
              </div>
            </div>
          )}
          {areaId === 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="who" className="text-left text-[var(--header-button)] ">
                UBA Area
              </Label>
              <Select
                {...(ubaId != null ? { defaultValue: String(ubaId) } : {})}
                onChange={setUbaId}
                placeholder="Select UBA Area"
                selectLabel="UBA Area"
                data={selectData.uba}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="cursor-pointer bg-[var(--header-button)] hover:bg-[var(--header-button)]" disabled={sending} onClick={handleSend}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
