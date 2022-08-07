import fetch from "node-fetch";

const basePath = "https://finnhub.io/api/v1";
const API_KEY = "cbms83qad3i7vqvd195g";
const sixMonths = 24 * 60 * 60 * 365;

const stockHistoryLookup = async (ticker) => {
  const currentTime = Date.now();
  const endTime = Math.floor(parseInt(currentTime) / 1000);
  const startTime = endTime - sixMonths;

  const priceHistory = `${basePath}/stock/candle?symbol=${ticker}&resolution=M&from=${startTime}&to=${endTime}&token=${API_KEY}`;

  const historyResponse = await fetch(priceHistory);
  if (!historyResponse.ok) {
    const message = `An error has occured: ${historyResponse.status}`;
    throw new Error(message);
  }
  const historyData = await historyResponse.json();
  return historyData;
};

const stockQuoteLookup = async (ticker) => {
  const recentQuote = `${basePath}/quote?symbol=${ticker}&token=${API_KEY}`;

  const quoteResponse = await fetch(recentQuote);
  if (!quoteResponse.ok) {
    const message = `An error has occured: ${quoteResponse.status}`;
    throw new Error(message);
  }
  const quoteData = await quoteResponse.json();
  return quoteData;
};

const stockHistory = await stockHistoryLookup("AAPL");
const stockQuote = await stockQuoteLookup("AAPL");
console.log(
  "STOCKHISTORY=======",
  stockHistory,
  "STOCKQUOTE========",
  stockQuote
);
