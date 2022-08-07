import fetch from "node-fetch";

const basePath = "https://finnhub.io/api/v1";
const api_key = "cbms83qad3i7vqvd195g";
const sixMonths = 24 * 60 * 60 * 182.5;

const stockLookup = async (ticker) => {
  const currentTime = Date.now();
  const endTime = Math.floor(parseInt(currentTime) / 1000);
  const startTime = endTime - sixMonths;

  const url = `${basePath}/stock/candle?symbol=${ticker}&resolution=M&from=${startTime}&to=${endTime}&token=${api_key}`;

  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

const newStock = await stockLookup("AAPL");
console.log(newStock);
