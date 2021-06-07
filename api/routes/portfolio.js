var express = require('express');
var router = express.Router();
const holdings_data = require('./data.json');
const apirawdata = require('../api.json');
const nomics_key = apirawdata['nomics'];
const yahooFinance = require('yahoo-finance');
const ETF_TICKERS = ["SPY", "ARKK"];
const axios = require('axios');

/* GET portfolio values. */
router.get('/', async function(req, res, next) {
  let response = await getPortfolio();
  res.send(response);
});

const getPortfolio = async () => {
  const coin_namemap = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'cardano': 'ADA',
  }
  
  // Print
  let networth = 0;
  let stocks_value = 0;
  let crypto_value = 0;
  let etf_value = 0;
  for (const [ticker, stock] of Object.entries(holdings_data)) {
    if (Object.values(coin_namemap).includes(ticker)) {
      continue;
    }
    let quote = await yahooFinance.quote({ symbol: ticker, modules: ['price', 'summaryDetail'] });
    let price = quote['price']['regularMarketPrice'];
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    holdings_data[ticker].price = price;
    // console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${price}\n`);
    networth += value;
    stocks_value += value;

    if (isETF(ticker)) {
      etf_value += value;
    }
  } 
  stocks_value = parseFloat(stocks_value.toFixed(2))
  
  // Retrieve crypto prices
  // console.log("\nCryptocurrencies")
  // console.log("========================")
  axios_res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${nomics_key}`, { params: { ids:"BTC,ETH,ADA" } });
  axios_data = axios_res.data;
  for (let i = 0; i < axios_data.length; i++) {
    let ticker = axios_data[i].id;
    let price = parseFloat(axios_data[i].price).toFixed(2);
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    holdings_data[ticker].ticker = ticker;
    holdings_data[ticker].price = price;
    // console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${parseFloat(price).toFixed(2)}\n`);
    networth += value;
    crypto_value += value;
  }
  crypto_value = parseFloat(crypto_value.toFixed(2));
  networth = parseFloat(networth.toFixed(2));
  
  for (const [ticker, data] of Object.entries(holdings_data)) {
    holdings_data[ticker].percentage = Math.max(0.01, parseFloat(((data.value/networth) * 100).toFixed(2)))
  }
  let sorted_holdings_data = Object.values(holdings_data).sort((a, b) => b.percentage - a.percentage)
  
  // console.log(`\nNetworth: $${networth.toFixed(2)}\nStocks Portfolio: $${stocks_value.toFixed(2)}\nCryptocurrencies: $${crypto_value.toFixed(2)}`)
  let response = {
    "holdings": sorted_holdings_data,
    "timestamp": new Date().getTime(),
    "networth": networth,
    "stocks_portfolio": stocks_value,
    "cryptocurrencies": crypto_value,
    "etf": etf_value
  }
  // console.log(response);
  return response;
}

const isETF = (ticker) => {
  return ETF_TICKERS.includes(ticker);
}

module.exports = router;
