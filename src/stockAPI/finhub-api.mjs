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
  return {
    "12mosPrice": historyData["c"][0],
    "6mosPrice": historyData["c"][6],
    "3mosPrice": historyData["c"][9],
  };
};

const stockQuoteLookup = async (ticker) => {
  const recentQuote = `${basePath}/quote?symbol=${ticker}&token=${API_KEY}`;

  const quoteResponse = await fetch(recentQuote);
  if (!quoteResponse.ok) {
    const message = `An error has occured: ${quoteResponse.status}`;
    throw new Error(message);
  }
  const quoteData = await quoteResponse.json();
  return quoteData.c;
};

const stockPercentChange = async (ticker) => {
  const stockHistory = await stockHistoryLookup("AAPL");
  const stockQuote = await stockQuoteLookup("AAPL");

  const threeMonthChange =
    ((stockQuote - stockHistory["3mosPrice"]) / stockHistory["3mosPrice"]) *
    100;
  const sixMonthChange =
    ((stockQuote - stockHistory["6mosPrice"]) / stockHistory["6mosPrice"]) *
    100;
  const twelveMonthChange =
    ((stockQuote - stockHistory["12mosPrice"]) / stockHistory["12mosPrice"]) *
    100;

  return {
    twelve: `${twelveMonthChange.toFixed(1)}%`,
    six: `${sixMonthChange.toFixed(1)}%`,
    three: `${threeMonthChange.toFixed(1)}%`,
  };
};

const result = await stockPercentChange("AAPL");
console.log(result);
