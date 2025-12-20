"use client";

// Global imports
import "@/app/globals.css";

// Styles
import styles from "@/app/interactions/unassigned.module.css";

// Types and interfaces
import { Area, Event, Offer, OfferItemProps, PersonOffer, Referral, StopTeachingReason, UbaArea, User } from "@/interfaces";

// Components
import Title from "@/components/Title";

import DatePicker from "@/components/DatePicker";
import HeaderButtonGroup from "@/components/HeaderButtonGroup";
import Dialog from "@/components/Dialog";

// External libraries
import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AgentProfile, FastifyFirebaseConnection } from "./api/interfaces";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { Interaction } from "@/hooks/interfaces";
import InteractionItemClaimed from "./components/Interactions/InteractionItemClaimed";
import InteractionItem from "./components/Interactions/InteractionItem";
import InteractionsList from "./components/Interactions/InteractionsList";
import InteractionsClaimedList from "./components/Interactions/InteractionsClaimedList";

type Props = {
  churchId: string;
  refreshToken: string;
  userSettings: AgentProfile;
  users: User[];
  areas: Area[];
  uba: UbaArea[];
  offers: Offer[];
  stopTeachingReasons: StopTeachingReason[];
  firebaseConnection: FastifyFirebaseConnection;
};

export default function PageClient({ areas, offers, stopTeachingReasons, uba, users, firebaseConnection, refreshToken, userSettings, churchId }: Props) {
  const { data } = useFirebaseData(firebaseConnection, "/new-queue-interactions/8959", (id) => `/interactions/${id}/info`);

  const { data: claimedData, setData: setClaimedData } = useFirebaseData(
    firebaseConnection,
    `/current-interactions/${userSettings.cmisId}`,
    (id) => `/interactions/${id}/info`
  );

  const [isDescendingDateOrder, setIsDescendingDateOrder] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentReferral] = useState<Referral | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleSetDateOrder = () => {
    setIsDescendingDateOrder((prev) => !prev);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleClearDateFilter = () => {
    setDate(null);
  };

  const filtered = useMemo(() => {
    if (date) {
      return data
        .filter((item) => item !== null && item !== undefined)
        .filter((item) => {
          const itemDate = new Date(item.startTimestamp);
          itemDate.setHours(0, 0, 0);
          return date.isSame(dayjs(itemDate), "day");
        })
        .sort((a, b) => {
          const dateA = dayjs(a.startTimestamp);
          const dateB = dayjs(b.startTimestamp);
          return isDescendingDateOrder ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
        });
    }
    return data
      .filter((item) => item !== null && item !== undefined)
      .sort((a, b) => {
        const dateA = dayjs(a.assignment.assignedTimestamp);
        const dateB = dayjs(b.assignment.assignedTimestamp);
        return isDescendingDateOrder ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
      });
  }, [data, isDescendingDateOrder, date]);

  const filteredClaimed = useMemo(() => {
    if (date) {
      return claimedData
        .filter((item) => item !== null && item !== undefined)
        .filter((item) => {
          const itemDate = new Date(item.startTimestamp);
          itemDate.setHours(0, 0, 0);
          return date.isSame(dayjs(itemDate), "day");
        })
        .sort((a, b) => {
          const dateA = dayjs(a.startTimestamp);
          const dateB = dayjs(b.startTimestamp);
          return isDescendingDateOrder ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
        });
    }
    return claimedData
      .filter((item) => item !== null && item !== undefined)
      .sort((a, b) => {
        const dateA = dayjs(a.startTimestamp);
        const dateB = dayjs(b.startTimestamp);
        return isDescendingDateOrder ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
      });
  }, [claimedData, isDescendingDateOrder, date]);

  const interactionsClaimedLength = filteredClaimed.length;

  const handleFetchEvent = async (id: string) => {
    const res = await fetch(`/api/interactions/events?id=${id}&refreshToken=${refreshToken}&churchId=${churchId}`);
    const events = (await res.json()) as Event[];
    setClaimedData((prev) => prev.map((item) => (item.requestConfirmation.personGuid === id ? { ...item, events } : item)));
  };

  const handleClaimInteraction = async (item: Interaction) => {
    await fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        queueId: item.assignment.queueId,
        userId: userSettings.cmisId,
        firebaseConnection: firebaseConnection,
      }),
    });
  };

  const handleDiscardInteraction = async (item: Interaction) => {
    await fetch("/api/discard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        queueId: item.assignment.queueId,
        userId: userSettings.cmisId,
        firebaseConnection: firebaseConnection,
      }),
    });
  };

  const handleOfferBtn = async (interaction: Interaction) => {
    const res = await fetch("/api/interactions/offer", {
      method: "POST",
      body: JSON.stringify({ churchId, refreshToken, offerId: interaction.mediaCampaignId, personId: interaction.requestConfirmation.personGuid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const offer: { offer: OfferItemProps | null; personOffer: PersonOffer | null } | null = await res.json();
    if (offer) {
      if (offer.offer) {
        const newOffer = offer.offer;
        setClaimedData((prev) => prev.map((item) => (item.id === interaction.id ? { ...interaction, offer: newOffer } : item)));
      } else if (offer.personOffer) {
        const newOffer = offer.personOffer;
        setClaimedData((prev) => prev.map((item) => (item.id === interaction.id ? { ...interaction, personOffer: newOffer } : item)));
      }
    }
  };

  return (
    <>
      {currentReferral && (
        <Dialog
          key={currentReferral.personGuid}
          setOpen={setDialogOpen}
          ref={currentReferral}
          users={users}
          areas={areas}
          offers={offers}
          reasons={stopTeachingReasons}
          uba={uba}
          open={dialogOpen}
          postSent={() => {}}
        />
      )}

      <div>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <Title title={`NÃO DESIGNADAS (${filtered.length})`} />
            <h3 className="text-white ">MINHA LISTA ({interactionsClaimedLength})</h3>
          </div>
          <div className={styles.headerFilterContainer}>
            <HeaderButtonGroup onSetDateOrder={handleSetDateOrder} />
            <DatePicker onDateChange={handleDateChange} value={date} onClear={handleClearDateFilter} />
          </div>
        </div>
        <div>
          <InteractionsList>
            {filtered.map((item, index) => (
              <InteractionItem data={item} key={index} handleClaimInteractionBtn={() => handleClaimInteraction(item)} />
            ))}
          </InteractionsList>
          <InteractionsClaimedList>
            {filteredClaimed.map((item, index) => (
              <InteractionItemClaimed
                key={index}
                data={item}
                handleDiscardInteraction={() => handleDiscardInteraction(item)}
                handleEventBtn={() => handleFetchEvent(item.requestConfirmation.personGuid)}
                handleOfferBtn={() => handleOfferBtn(item)}
              />
            ))}
          </InteractionsClaimedList>
        </div>
      </div>
    </>
  );
}
