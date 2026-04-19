import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { AgentProfile } from "./interfaces";

async function getUserSettings(refreshToken: string, churchId: string): Promise<AgentProfile | null> {
  try {
    const url = "https://referralmanager.churchofjesuschrist.org/services/interactions/user/settings";
    const userSettings = (await fetchChurchServer(url, refreshToken, churchId)) as AgentProfile;

    if (!userSettings) {
      throw new Error("Failed fetching userSettings from church server.");
    } else {
      return userSettings;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getUserSettings;
