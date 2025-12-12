"use client";

// Global imports
import "@/app/globals.css";

// Styles
import styles from "@/app/mission/unassigned/unassigned.module.css";

// Types and interfaces
import { Area, Event, Offer, Referral, StopTeachingReason, TitleOption, UbaArea, User } from "@/interfaces";

// Constants
import { FILTERS } from "@/constants/filters";

// Components
import Title from "@/components/Title";

import DatePicker from "@/components/DatePicker";
import HeaderButtonGroup from "@/components/HeaderButtonGroup";
import Dialog from "@/components/Dialog";

// External libraries
import { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FastifyFirebaseConnection } from "./api/interfaces";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import filterAssignedToday from "@/util/filterAssignedToday";
import { Interaction } from "@/hooks/interfaces";
import InteractionItemClaimed from "./components/Interactions/InteractionItemClaimed";
import InteractionItem from "./components/Interactions/InteractionItem";
import InteractionsList from "./components/Interactions/InteractionsList";
import InteractionsClaimedList from "./components/Interactions/InteractionsClaimedList";

type Props = {
  refreshToken: string;

  users: User[];
  areas: Area[];
  uba: UbaArea[];
  offers: Offer[];
  stopTeachingReasons: StopTeachingReason[];
  firebaseConnection: FastifyFirebaseConnection | null;
};

export default function PageClient({ areas, offers, stopTeachingReasons, uba, users, firebaseConnection, refreshToken }: Props) {
  const { data, setData } = useFirebaseData(firebaseConnection, "/new-queue-interactions/8959", (id) => `/interactions/${id}/info`);

  const { data: claimedData, setData: setClaimedDate } = useFirebaseData(
    firebaseConnection,
    "/current-interactions/14721139641",
    (id) => `/interactions/${id}/info`
  );

  console.log(data);

  const [activeFilter, setActiveFilter] = useState(0);
  const [isDescendingDateOrder, setIsDescendingDateOrder] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentReferral] = useState<Referral | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleSetDateOrder = () => {
    setIsDescendingDateOrder((prev) => !prev);
  };

  const handlePostSentReferral = useCallback((referral: Referral, offer?: string, areaName?: string) => {
    // Function to update a referral
    const updateReferral = (item: Referral) =>
      item.personGuid === referral.personGuid ? { ...item, sentStatus: true, offerText: offer, areaName: areaName || "" } : item;

    // Update state efficiently
    setDialogOpen(false);
  }, []);

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    setActiveFilter(FILTERS.DATE_FILTER);
  };

  const handleClearDateFilter = () => {
    setActiveFilter(0);
    setDate(null);
  };

  const filtered = useMemo(() => {
    if (date) {
      return data
        .filter((item) => item !== null && item !== undefined)
        .filter((item) => {
          const itemDate = new Date(item.assignment.assignedTimestamp);
          itemDate.setHours(0, 0, 0);
          return date.isSame(dayjs(itemDate), "day");
        })
        .sort((a, b) => {
          const dateA = dayjs(a.assignment.assignedTimestamp);
          const dateB = dayjs(b.assignment.assignedTimestamp);
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
    return claimedData
      .filter((item) => item !== null && item !== undefined)
      .sort((a, b) => {
        const dateA = dayjs(a.startTimestamp);
        const dateB = dayjs(b.startTimestamp);
        return isDescendingDateOrder ? dateB.valueOf() - dateA.valueOf() : dateA.valueOf() - dateB.valueOf();
      });
  }, [claimedData, isDescendingDateOrder]);

  const title = useMemo(() => {
    return `Interactions Assigned to Mission (${filtered.length})`;
  }, [filtered]);

  const interactionsClaimedLength = claimedData.length;

  const handleFetchEvent = async (id: string) => {
    const res = await fetch(`/api/interactions/events?id=${id}&refreshToken=${refreshToken}`);
    const events = (await res.json()) as Event[];
    setClaimedDate((prev) => prev.map((item) => (item.requestConfirmation.personGuid === id ? { ...item, events } : item)));
  };

  const handleClaimInteraction = async (item: Interaction) => {
    await fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        queueId: item.assignment.queueId,
        userId: "14721139641",
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
        userId: "14721139641",
        firebaseConnection: firebaseConnection,
      }),
    });
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
          postSent={handlePostSentReferral}
        />
      )}

      <div>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <Title title={title} />
            <h3 className="text-white">Interactions Claimed ({interactionsClaimedLength})</h3>
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
            <span className="text-black-500">Claimed</span>
            {filteredClaimed.map((item, index) => (
              <InteractionItemClaimed
                key={index}
                data={item}
                handleDiscardInteraction={() => handleDiscardInteraction(item)}
                handleEventBtn={() => handleFetchEvent(item.requestConfirmation.personGuid)}
              />
            ))}
          </InteractionsClaimedList>
        </div>
      </div>
    </>
  );
}
