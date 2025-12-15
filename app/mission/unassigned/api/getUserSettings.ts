import { AgentProfile } from "./interfaces";

async function getUserSettings(refreshToken: string, churchId: string): Promise<AgentProfile | null> {
  try {
    const url = `https://fastify-referral-api.vercel.app/api/interactions/user/settings`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ refreshToken, churchId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data: AgentProfile = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

export default getUserSettings;
