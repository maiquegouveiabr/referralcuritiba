import { Cookie } from "puppeteer";

export const fetchCookies = async (username: string, password: string) => {
  try {
    const res = await fetch("https://cookies-api-9ptk.onrender.com/api/cookies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("FETCH_COOKIES");

    const cookies: Cookie[] = await res.json();

    const refreshToken = cookies.find((cookie) => cookie.name === "oauth-abw_refresh_token")?.value || "";
    const churchId = cookies.find((cookie) => cookie.name === "oauth-abw_church_account_id")?.value || "";

    return { refreshToken, churchId };
  } catch (error) {
    throw new Error("FETCH_COOKIES");
  }
};
