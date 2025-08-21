/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function (
  url: string,
  refreshToken: string,
  maxRetries = 3,
  delay = 1000 // initial delay in ms
): Promise<any | null> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Cookie: `oauth-abw_church_account_id=3619012236345409;oauth-abw_refresh_token=${refreshToken}`,
    },
    redirect: "follow",
  };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Fetch failed: ${url}, Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt < maxRetries) {
        await new Promise((res) => setTimeout(res, delay * Math.pow(2, attempt))); // exponential backoff
      } else {
        console.error("All retry attempts failed.");
        return null;
      }
    }
  }
}
