import fetch from "node-fetch";

const basePath = "https://finnhub.io/api/v1";
const api_key = "cbms83qad3i7vqvd195g";
const sixMonths = 24 * 60 * 60 * 365;

const stockLookup = async (ticker) => {
  const currentTime = Date.now();
  const endTime = Math.floor(parseInt(currentTime) / 1000);
  const startTime = endTime - sixMonths;

  const priceHistory = `${basePath}/stock/candle?symbol=${ticker}&resolution=M&from=${startTime}&to=${endTime}&token=${api_key}`;
  const recentQuote = `${basePath}/quote?symbol=${ticker}&token=${api_key}`;

  const historyResponse = await fetch(priceHistory);
  if (!historyResponse.ok) {
    const message = `An error has occured: ${historyResponse.status}`;
    throw new Error(message);
  }
  const quoteResponse = await fetch(recentQuote);
  if (!quoteResponse.ok) {
    const message = `An error has occured: ${quoteResponse.status}`;
    throw new Error(message);
  }
  const historyData = await historyResponse.json();
  const quoteData = await quoteResponse.json();
  return [historyData, quoteData];
};

const newStock = await stockLookup("AAPL");
console.log(newStock);
