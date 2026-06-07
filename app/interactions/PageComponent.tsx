"use client";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { useInteractionsPageState } from "./hooks/useInteractionsPageState";
import { useFilteredInteractions } from "./hooks/useFilteredInteractions";
import { useInteractionActions } from "./hooks/useInteractionActions";
import HeaderSection from "./components/HeaderSection";
import InteractionsList from "./components/Interactions/InteractionsList";
import InteractionItem from "./components/Interactions/InteractionItem";
import InteractionsClaimedList from "./components/Interactions/InteractionsClaimedList";
import InteractionItemClaimed from "./components/Interactions/InteractionItemClaimed";
import { AgentProfile, FastifyFirebaseConnection } from "./api/interfaces";
import { Area, Offer, StopTeachingReason, UbaArea, User } from "@/interfaces";

import DialogComponent from "@/components/DialogComponent";

type Props = {
  refreshToken: string;
  userSettings: AgentProfile;
  users: User[];
  areas: Area[];
  uba: UbaArea[];
  offers: Offer[];
  stopTeachingReasons: StopTeachingReason[];
  firebaseConnection: FastifyFirebaseConnection;
};

export default function PageComponent(props: Props) {
  const state = useInteractionsPageState();

  const { data: unassigned } = useFirebaseData(props.firebaseConnection, "/new-queue-interactions/8959", (id) => `/interactions/${id}/info`);
  const { data: claimed, setData } = useFirebaseData(
    props.firebaseConnection,
    `/current-interactions/${props.userSettings.cmisId}`,
    (id) => `/interactions/${id}/info`,
  );

  const filteredUnassigned = useFilteredInteractions(unassigned, state.date, state.isDescending, "assigned");
  const filteredClaimed = useFilteredInteractions(claimed, state.date, state.isDescending);
  const actions = useInteractionActions({
    ...props,
    state,
    setClaimedInteractions: setData,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {state.dialogInteraction && (
        <DialogComponent
          interaction={state.dialogInteraction}
          postSent={actions.handlePostSent}
          areas={props.areas}
          offers={props.offers}
          reasons={props.stopTeachingReasons}
          users={props.users}
          uba={props.uba}
          open={state.dialogOpen}
          setOpen={state.setDialogOpen}
        />
      )}

      <HeaderSection filteredCount={filteredUnassigned.length} claimedCount={filteredClaimed.length} state={state} />

      <main className="flex-1 overflow-auto">
        <InteractionsList>
          {filteredUnassigned.map((item) => (
            <InteractionItem key={item.id} data={item} onClaim={() => actions.claim(item)} />
          ))}
        </InteractionsList>

        <InteractionsClaimedList>
          {filteredClaimed.map((item) => (
            <InteractionItemClaimed
              key={item.id}
              interaction={item}
              onDiscard={() => actions.discard(item)}
              onEvent={() => actions.fetchEvent(item)}
              onOffer={() => actions.fetchOffer(item)}
              onOpenDialog={() => actions.handleDialogOpen(item)}
              onFetchTeachingArea={() => actions.fetchTeachingArea(item)}
            />
          ))}
        </InteractionsClaimedList>
      </main>
    </div>
  );
}
