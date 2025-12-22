import { AreaInfo, Event, OfferItemProps, PersonOffer } from "@/interfaces";

export interface Interaction {
  suggestedArea: AreaInfo | null;
  personOffer: PersonOffer;
  offer: OfferItemProps;
  events: Event[];
  assignment: {
    assignedTimestamp: number;
    queueId: number;
    queueName: string;
  };

  hasNote: boolean;
  hidden: boolean;

  id: string;
  inbound: boolean;

  iterations: Array<{
    createdTimestamp: number;
  }>;

  language: {
    ianaLanguageCode: string;
    languageCode: string;
    languageId: number;
    languageIdAsString: string;
    languageName: string;
    type: string;
  };

  mediaCampaignId: string;
  missed: boolean;

  requestConfirmation: {
    address: string;
    boncomCampaignId: string;
    id: string;
    name: string;
    personGuid: string;
    phoneNumber: string;
    sourceId: number;
  };

  startTimestamp: number;
  typeName: string;

  visitors: Array<{
    type: string;
    visitorId: string;
    visitorName: string;
    visitorPersonGuid: string;
    visitorPhoneNumber: string;
  }>;
}
