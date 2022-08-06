const basePath = "https://finnhub.io/api/v1";
const api_key = "cbms83qad3i7vqvd195g";

export const stockLookup = async (ticker) => {
  const startTime = 0;
  const endTime = 0;
  const url = `${basePath}/stock/candle?symbol=${ticker}&resolution=M&from=${startTime}&to=${endTime}&token=${api_key}`;

  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
