// async sleep function
export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
