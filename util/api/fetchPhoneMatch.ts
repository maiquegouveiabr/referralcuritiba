type Props = {
  phone: string;
  id: string;
  name: string;
  area_name: string;
  other: string;
};

export default async (phone: string): Promise<Props[] | []> => {
  try {
    const url = `/api/db/phoneMatch?phone=${phone}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
