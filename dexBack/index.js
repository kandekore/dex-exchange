const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT ||  3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dex/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dex/build/index.html'));
});

app.get("/tokenPrice", async (req, res) => {

  const {query} = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  })

  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }
  

  return res.status(200).json(usdPrices);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
