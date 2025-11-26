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

export interface Referral {
  offersTopic: TopicData | null;
  personOffer: PersonOffer | null;
  offerItem: OfferItem | null;
  contactInfo: ContactInfo | null;
  areaInfo: AreaInfo | null;
  contactAttempts: Event[] | [];
  personGuid: string;
  householdGuid: string;
  firstName: string;
  lastName: string | null;
  gender: string | null;
  ageCategoryId: number | null;
  referralStatusName: string | null;
  referralStatusId: number;
  personStatusId: number;
  stewardCmisId: string | null;
  cmisId: string | null;
  followerCmisIdString: string | null;
  missionName: string;
  missionId: number;
  zoneId: number;
  zoneName: string;
  districtId: number;
  districtName: string;
  areaId: number;
  areaName: string;
  orgId: number;
  orgNum: number;
  orgName: string;
  address: string;
  phone: string | null;
  phoneHome: string | null;
  phoneMobile: string | null;
  phoneWork: string | null;
  phoneOther: string | null;
  email: string | null;
  preferredLanguageId: number;
  referralAssignedDate: number;
  localTimeZone: string | null;
  findId: number;
  offerId: number | null;
  lastLessonDate: number | null;
  statusDate: number | null;
  baptismDate: number | null;
  baptismGoalDate: number | null;
  lastSacramentDate: number | null;
  lastTaughtByLocalDate: number | null;
  locId: number;
  stewardCmisFirstName: string | null;
  stewardCmisLastName: string | null;
  privacyNoticeStatusId: number;
  privacyExpirationDate: number | null;
  privacyNoticeDueDate: number | null;
  affirmedInterestDate: number | null;
  createDate: number;
  areaPhones: string | null;
  missionaryContactList: string | null;
  memberHideProgressDate: number | null;
  doNotContactDate: number | null;
  lastStewardChangeDate: number | null;
  deleted: boolean;
  convert: boolean;
  phoneMobileTextable: boolean;
  phoneTextable: boolean;
  phoneOtherTextable: boolean;
  phoneWorkTextable: boolean;
  phoneHomeTextable: boolean;
  sentStatus: boolean;
  offerText?: string;
  phoneMatches: { id: string; phone: string; name: string; area_name: string; other: string }[] | null;
}

export interface ContactInfo {
  phoneNumbers: {
    modDate: string | null;
    createDate: string | null;
    deleted: boolean;
    type: string;
    number: string;
    textable: boolean;
    whatsAppEnabled: boolean;
  }[];
  emailAddresses: string[] | null;
  socialMediaAccounts: string[] | null;
}

export interface ReferralComplete {
  contactAttempts: Event[];
  areaInfo: AreaInfo;
  person: {
    id: string;
    householdId: string;
    ageCatId: number | null;
    serverId: number;
    status: number;
    contactSource: number;
    preferredLangId: number;
    preferredContactType: string | null;
    preferredPhoneType: string | null;
    preferredEmailType: string | null;
    cmisId: string | null;
    prosAreaId: string | null;
    firstName: string;
    lastName: string | null;
    gender: string | null;
    memberPhotoPrivacyLevel: number;
    modDate: string;
    createDate: string;
    note: string | null;
    contactInfo: ContactInfo;
    fellowshipInfo: string | null;
    dropNotes: string | null;
    commitments: string | null;
    principleSummary: string | null;
    cmisServicesMember: string | null;
    membershipCreationDate: string | null;
    lastStewardChangeDate: string | null;
    deleted: boolean;

    convert: boolean;
    member: boolean;
    dataPrivacyConsent: boolean;
    pendingAnonymizationDate: number;
    followerCmisIds: string[] | null;
    tags: string[] | null;

    scheduledBaptism: string | null;
    confirmationDate: string | null;
    baptismDate: string | null;
    memberHideProgressDate: string | null;
    showOnDigitalProgressRecord: boolean;
    doNotContactDate: string | null;
    cmisMemberIsPrivate: boolean;
    priesthoodConferred: boolean;
    foundByPersonGuid: string | null;
    suggestedArea: string | null;
  };
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

export interface OfferItem {
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

export interface TopicData {
  id: string;
  topic: string;
  isDefault: boolean;
  attributes: {
    thingsToConsider: string[];
  };
}

export interface Area {
  id: number;
  name: string;
  zone_id: number;
}

export enum TitleOption {
  OPTION_1 = "People Not Assigned",
  OPTION_2 = "UBA",
  OPTION_3 = "More Than Two Events",
  OPTION_4 = "No Events In Three Days",
  OPTION_5 = TitleOption.OPTION_1,
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
