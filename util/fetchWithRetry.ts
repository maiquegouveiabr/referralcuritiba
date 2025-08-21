const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error}`);
      if (i < retries - 1) await sleep(delay);
    }
  }
  throw new Error("Max retries reached");
};
