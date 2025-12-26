export interface Event {
  timelineItemType: string; // Possible enumeration value
  contactTypeCode: string | null; // Nullable string
  eventStatus: boolean | null; // Nullable string
  lessonReview: string | null; // Nullable string
  lessonPlan: string | null; // Nullable string
  itemDate: number; // Unix timestamp (milliseconds)
  createdByUserName: string; // User who created the entry
  eventGuid: string; // Unique identifier for the event
  dropStatusId: number; // Status ID indicating "drop" reason
  personOfferGuid: string | null; // Nullable unique identifier for the person offer
  offerItemId: string | null; // Nullable unique identifier for the offer item
  subscriptionStatus: number; // Numeric value indicating subscription status
  emailCampaignId: number; // Numeric value for email campaign ID
}

export interface AreaInfo {
  missions:
    | {
        id: number;
        name: string;
        children: unknown | null;
        leadership: {
          id: number;
          roleName: string;
        }[];
        cdolId: number;
        orgId: number;
        langId: number;
        msnTypeId: number;
        msnStatusId: number;
        missionPresident: {
          phoneNumber: string;
          presidentName: string;
          presidentEmail: string;
        };
        type: string;
        emailAddress: string;
        mailingAddress: string;
        streetAddress: string;
        timeZone: string;
        phoneNumbers: string[];
        eccAreaName: string;
        parentId: number;
      }[]
    | null;
  proselytingAreas:
    | {
        id: number;
        name: string;
        children:
          | {
              id: number;
              name: string;
              children: null; // Assuming children are always `null` in this case
              type: string; // e.g., "ORGANIZATION"
              subType: string; // e.g., "Ward"
              mapLayerUnitType: string | null;
              unitNumber: number | null;
              wmlFullName: string | null;
              wmlHomePhone: string | null;
              wmlEmailAddress: string | null;
              orgProperties: string | null;
              meetingHouseAddress: string | null;
              areaIds: number[];
            }[]
          | null;
        email: string;
        type: string; // e.g., "PROS_AREA"

        areaNumbers: string[];
        isActive: boolean;
        doesReceiveReferrals: boolean;
        afabEnabled: boolean;
        assignmentOrgs: number[];
        address: string;
        city: string;
        stateProvince: string;
        postalCode: string;
        locId: number;
        referralTextEnabled: boolean;
        hasKiAccess: boolean;
      }[]
    | null;
  organizations:
    | {
        id: number;
        name: string;
        children: unknown | null;
        type: string;
        subType: string;
        mapLayerUnitType: string;
        unitNumber: number;
        wmlFullName: string | null;
        wmlHomePhone: string | null;
        wmlEmailAddress: string | null;
        orgProperties: {
          LanguageCode: string;
          WorshipService: string | null;
          Contact: string | null;
          Language: string;
          TimeZone: string;
        };
        meetingHouseAddress: {
          street: string;
          street2: string;
          city: string;
          county: string | null;
          state: string;
          postalCode: string;
          country: string;
          countryCode: string;
          countryId: number;
          formattedAddress: string;
        };
        areaIds: number[];
      }[]
    | null;
  bestOrgId: number | null;
  bestProsAreaId: number | null;
  missionRatio: number;
  locId: number | null;
  definedMatchTypeThreshold: string;
  definedMatchConfidenceThreshold: string;
  actualMatchType: string | null;
  actualConfidence: string | null;
  actualMatchAccuracy: string;
  actualExtentDistance: number | null;
  prosAreaLookupDecision: string;
  prosAreaLookupSuccess: boolean;
  prosAreaLookupResult: string;
  coordinates: [number, number] | null;
  geocodedRequestorCountryLocId: number | null;
  requestedAreaLangNotFound: boolean | null;
  actualMatchSource: string | null;
  extentCoordinates: [number, number, number, number] | null;
  countryExtentThresholdMeters: number;

  formattedAddress: string | null;
  areaIdRejectionReasons: unknown | null;
  isBestWardLanguageMatch: boolean;
}

export interface OfferItemProps {
  vendor_name: string;
  vendor_ad_id: string;
  ad_name: string;
  ad_headline: string;
  ad_text: string;
  ad_preview_link: string;
  country_id: number;
  ad_topic: string;
  ad_video_name: string;
  campaign_name: string;
  ad_concept: string | null;
  agency_campaign: string | null;
  display_url: string | null;
  landing_page: string | null;
  search_line1: string | null;
  search_line2: string | null;
  video_distribution_url: string | null;
  video_hls_distribution_url: string | null;
  video_mime_type: string | null;
  video_thumbnail_url: string | null;
  video_cover_image_url: string | null;
  dynamic_descriptions: string | null;
  ad_type: string;
  ad_destination_type: string;
  agency_id: number;
  agency_name: string;
  ad_group: string;
  adset_name: string;
  media_type: string;
  ad_language: string;
  ad_site_url: string;
  ad_destination_url: string;
  call_to_action_type: string;
}

export interface PersonOffer {
  personOfferItemId: number;
  personGuid: string | null;
  offerItemId: number;
  deliveryMethodId: number;
  addr: null;
  city: null;
  state: null;
  postalCode: null;
  country: null;
  fulfillmentTime: null;
  fulfillmentLocation: null;
  fulfillmentDuration: null;
  commerceOrderId: number;
  sqsMessageGuid: null;
  createDate: string;
  modDate: string;
  offerDetails: [];
  personOfferGuid: string;
  tealiumId: null;
  adobeId: string;
  facebookTransactionId: null;
  boncomCampaignId: string;
  boncomTransactionId: string;
  offerUrl: string;
  referralId: number;
  claimLeaderCmisId: null;
  claimLeaderDate: null;
  appId: number;
  formTopicId: string;
  submittingURL: string;
  pageTitle: string;
  findTypeId: null;
}

export interface Area {
  id: number;
  name: string;
  zone_id: number;
}

export interface User {
  user_id: number;
  name: string;
  is_active: boolean | null;
  create_date: Date;
}

export interface UbaArea {
  id: number;
  name: string;
}

export interface Offer {
  id: number;
  name: string;
}

export interface StopTeachingReason {
  id: number;
  name: string;
}
