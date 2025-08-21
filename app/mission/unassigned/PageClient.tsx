"use client";

// Global imports
import "@/app/globals.css";

// Styles
import styles from "@/app/mission/unassigned/unassigned.module.css";

// Types and interfaces
import { Area, Offer, Referral, StopTeachingReason, TitleOption, UbaArea, User } from "@/interfaces";

// Constants
import { FILTERS } from "@/constants/filters";

// Components
import Title from "@/components/Title";

import DatePicker from "@/components/DatePicker";
import HeaderButtonGroup from "@/components/HeaderButtonGroup";
import Dialog from "@/components/Dialog";
import ReferralList from "@/app/mission/unassigned/components/ReferralList";

// Utils
import checkTimestamp3DaysOld from "@/util/checkTimestamp3DaysOld";
import checkTimestampToday from "@/util/checkTimestampToday";

// External libraries
import { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import filterLastWeekAssigned from "@/util/filterLastWeekAssigned";

type Props = {
  refreshToken: string;
  referrals: Referral[];
  users: User[];
  areas: Area[];
  uba: UbaArea[];
  offers: Offer[];
  stopTeachingReasons: StopTeachingReason[];
};

export default function PageClient({ refreshToken, areas, offers, referrals, stopTeachingReasons, uba, users }: Props) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [referralsState, setReferralsState] = useState(referrals);
  const [activeFilter, setActiveFilter] = useState(0);
  const [isDescendingDateOrder, setIsDescendingDateOrder] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentReferral, setCurrentReferral] = useState<Referral | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleSetDateOrder = () => {
    setIsDescendingDateOrder((prev) => !prev);
    setActiveFilter(0);
    setDate(null);
  };

  const handleTwoPlusEvents = () => {
    setActiveFilter(FILTERS.TWO_PLUS);
    setDate(null);
  };

  const handlePostSentReferral = useCallback(
    (referral: Referral, offer?: string, areaName?: string) => {
      // Function to update a referral
      const updateReferral = (item: Referral) =>
        item.personGuid === referral.personGuid ? { ...item, sentStatus: true, offerText: offer, areaName: areaName || "" } : item;

      // Update state efficiently
      setReferralsState((prev) => prev.map(updateReferral));
      setDialogOpen(false);
    },
    [setReferralsState]
  );

  const handleNoEventsThreeDays = () => {
    setActiveFilter(FILTERS.NO_EVENTS_THREE_DAYS);
    setDate(null);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    setActiveFilter(FILTERS.DATE_FILTER);
  };

  const handleClearDateFilter = () => {
    setActiveFilter(0);
    setDate(null);
  };

  const filtered = useMemo(() => {
    if (!referralsState) return [];

    if (activeFilter === FILTERS.TWO_PLUS) {
      return referralsState.filter((ref) => {
        const attempts = ref.contactAttempts || [];
        return attempts.length >= 3 || (attempts.length >= 2 && !checkTimestampToday(attempts[0].itemDate));
      });
    }

    if (activeFilter === FILTERS.NO_EVENTS_THREE_DAYS) {
      return referralsState.filter((ref) => ref.contactAttempts.length === 0 && checkTimestamp3DaysOld(ref.createDate));
    }

    if (activeFilter === FILTERS.DATE_FILTER && date) {
      return referralsState.filter((ref) => date.isSame(dayjs(ref.createDate), "day"));
    }

    return [...referralsState].sort((a, b) => (isDescendingDateOrder ? b.createDate - a.createDate : a.createDate - b.createDate));
  }, [activeFilter, date, isDescendingDateOrder, referralsState]);

  const title = useMemo(() => {
    return `${Object.values(TitleOption)[activeFilter]} (${filtered.length})`;
  }, [activeFilter, filtered]);

  const lastWeekAssignedLength = useMemo(() => {
    return referralsState.filter((item) => filterLastWeekAssigned(item.createDate)).length;
  }, [referralsState]);

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
            <h3 className="text-white">In the Last Week Assigned to Mission ({lastWeekAssignedLength})</h3>
          </div>
          <div className={styles.headerFilterContainer}>
            <HeaderButtonGroup
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
              referralsState={referralsState}
              refreshToken={refreshToken}
              setReferralsState={setReferralsState}
              onSetDateOrder={handleSetDateOrder}
              onThreePlusEvents={handleTwoPlusEvents}
              onNoEventsThreeDays={handleNoEventsThreeDays}
            />
            <DatePicker onDateChange={handleDateChange} value={date} onClear={handleClearDateFilter} />
          </div>
        </div>
        <ReferralList
          refreshToken={refreshToken}
          dataLoaded={dataLoaded}
          setCurrentReferral={setCurrentReferral}
          setDialogOpen={setDialogOpen}
          stateReferrals={filtered}
          setReferralsState={setReferralsState}
        />
      </div>
    </>
  );
}
