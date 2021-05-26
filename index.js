const express = require('express')
const CoinGecko = require('coingecko-api');
const parse = require('csv-parse');
const yahooFinance = require('yahoo-finance');
const fs = require('fs');
const { default: axios } = require('axios');
const app = express();
const port = 8000;
const apirawdata = fs.readFileSync('api.json');
const nomics_key = JSON.parse(apirawdata)['nomics'];

// Read holdings from JSON file
let rawdata = fs.readFileSync('data.json');
let holdings_data = JSON.parse(rawdata);
// console.log(holdings_data)

app.get('/portfolio', async (req, res) => {
  // Retrieve crypto current price
  let crypto_prices_map = {};
  const CoinGeckoClient = new CoinGecko();
  const coin_holdings = {
    'bitcoin': 0.01986747,
    'ethereum': 2,
    'cardano': 513.58705
  };
  const coin_watchlist = []
  const coin_namemap = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'cardano': 'ADA',
  }
  const coin_ids = Object.keys(coin_holdings) + coin_watchlist;
  
  // Print
  let networth = 0;
  let stocks_value = 0;
  let crypto_value = 0;
  console.log("\nStocks")
  console.log("========================")
    
  // Retrieve stocks market price
  for (const [ticker, stock] of Object.entries(holdings_data)) {
    if (Object.values(coin_namemap).includes(ticker)) {
      continue;
    }
    // console.log(ticker)
    let quote = await yahooFinance.quote({ symbol: ticker, modules: ['price', 'summaryDetail'] });
    let price = quote['price']['regularMarketPrice'];
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${price}\n`);
    networth += value;
    stocks_value += value;
  } 
  stocks_value = parseFloat(stocks_value.toFixed(2))

  // Retrieve crypto prices
  console.log("\nCryptocurrencies")
  console.log("========================")
  let axios_res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${nomics_key}`, { params: { ids:"BTC,ETH,ADA" } });
  let axios_data = axios_res.data;
  for (let i = 0; i < axios_data.length; i++) {
    let ticker = axios_data[i].id;
    let price = axios_data[i].price;
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${parseFloat(price).toFixed(2)}\n`);
    networth += value;
    crypto_value += value;
  }
  crypto_value = parseFloat(crypto_value.toFixed(2));
  networth = parseFloat(networth.toFixed(2));
  
  for (const [ticker, data] of Object.entries(holdings_data)) {
    holdings_data[ticker].percentage = Math.max(0.01, parseFloat(((data.value/networth) * 100).toFixed(2)))
  }
  // console.log(holdings_data, typeof(holdings_data))
  let sorted_holdings_data = Object.values(holdings_data).sort((a, b) => b.percentage - a.percentage)
  // console.log(sorted_holdings_data)
  
  // console.log(`\nNetworth: $${networth.toFixed(2)}\nStocks Portfolio: $${stocks_value.toFixed(2)}\nCryptocurrencies: $${crypto_value.toFixed(2)}`)
  let response = {
    "holdings": sorted_holdings_data,
    "timestamp": new Date().getTime(),
    "networth": networth,
    "stocks_portfolio": stocks_value,
    "cryptocurrencies": crypto_value
  }
  console.log(response);
  res.send(response)
})

app.get('/', (req, res) => {
  console.log(req.headers)
  res.send('Hello World!')
});

const getPortfolio = async () => {
  // Retrieve crypto current price
  let crypto_prices_map = {};
  const CoinGeckoClient = new CoinGecko();
  const coin_holdings = {
    'bitcoin': 0.01986747,
    'ethereum': 2,
    'cardano': 513.58705
  };
  const coin_watchlist = []
  const coin_namemap = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'cardano': 'ADA',
  }
  const coin_ids = Object.keys(coin_holdings) + coin_watchlist;
  
  // Print
  let networth = 0;
  let stocks_value = 0;
  let crypto_value = 0;
  // console.log("\nStocks")
  // console.log("========================")
    
  // Retrieve stocks market price
  for (const [ticker, stock] of Object.entries(holdings_data)) {
    if (Object.values(coin_namemap).includes(ticker)) {
      continue;
    }
    // console.log(ticker)
    let quote = await yahooFinance.quote({ symbol: ticker, modules: ['price', 'summaryDetail'] });
    let price = quote['price']['regularMarketPrice'];
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    // console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${price}\n`);
    networth += value;
    stocks_value += value;
  } 
  stocks_value = parseFloat(stocks_value.toFixed(2))

  // Retrieve crypto prices
  // console.log("\nCryptocurrencies")
  // console.log("========================")
  let axios_res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${nomics_key}`, { params: { ids:"BTC,ETH,ADA" } });
  let axios_data = axios_res.data;
  for (let i = 0; i < axios_data.length; i++) {
    let ticker = axios_data[i].id;
    let price = axios_data[i].price;
    let value = parseFloat((price * holdings_data[ticker].total).toFixed(2));
    holdings_data[ticker].value = value;
    // console.log(`- ${ticker}: $${value}\n${holdings_data[ticker].total} x $${parseFloat(price).toFixed(2)}\n`);
    networth += value;
    crypto_value += value;
  }
  crypto_value = parseFloat(crypto_value.toFixed(2));
  networth = parseFloat(networth.toFixed(2));
  
  for (const [ticker, data] of Object.entries(holdings_data)) {
    holdings_data[ticker].percentage = Math.max(0.01, parseFloat(((data.value/networth) * 100).toFixed(2)))
  }
  // console.log(holdings_data, typeof(holdings_data))
  let sorted_holdings_data = Object.values(holdings_data).sort((a, b) => b.percentage - a.percentage)
  // console.log(sorted_holdings_data)
  
  // console.log(`\nNetworth: $${networth.toFixed(2)}\nStocks Portfolio: $${stocks_value.toFixed(2)}\nCryptocurrencies: $${crypto_value.toFixed(2)}`)
  let response = {
    "holdings": sorted_holdings_data,
    "timestamp": new Date().getTime(),
    "networth": networth,
    "stocks_portfolio": stocks_value,
    "cryptocurrencies": crypto_value
  }
  console.log(response);
}

app.listen(port, () => {
  console.log(`Starting...`)

  getPortfolio();
  setInterval(getPortfolio, 10000);
});