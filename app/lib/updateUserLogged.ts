export default async function (username: string, refreshToken: string) {
  try {
    const url = `/api/db/updateUserLogged?username=${username}&refreshToken=${refreshToken}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.at);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
