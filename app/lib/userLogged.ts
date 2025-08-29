export default async (username: string) => {
  try {
    const url = `/api/db/userLogged?username=${username}`;
    const response = await fetch(url);
    if (response.ok) {
      const data: { userLogged: boolean; refreshToken: string } = await response.json();
      if (data.userLogged) {
        return data.refreshToken;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
