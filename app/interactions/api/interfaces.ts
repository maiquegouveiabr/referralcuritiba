export interface FastifyFirebaseConnection {
  apiKey: string;
  authDomain: string;
  databaseUrl: string;
  authToken: string;
}

export interface AgentProfile {
  cmisId: number;
  missionId: number;
  alias: string;
  chatDisplayName: string;
  voiceGreetingName: string;
  useExternalPhone: boolean;
  receiveOfflineNotice: boolean;
  offlineVoicemailNotification: boolean;
  offlineChatNotification: boolean;
  offlineFacebookNotification: boolean;
  offlineWhatsAppNotification: boolean;
  offlineCallForward: boolean;
  offlineSmsNotification: boolean;
  preferredLangId: number;
}
