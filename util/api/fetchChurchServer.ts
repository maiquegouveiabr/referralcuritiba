export async function fetchChurchServer<T>(url: string, refreshToken: string, churchId: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `oauth-abw_church_account_id=${churchId};oauth-abw_refresh_token=${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${url}, Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
