const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (ms: number) => {
  await sleep(ms);
};
