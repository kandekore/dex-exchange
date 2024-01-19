const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const path = require('path');
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT ||  3001;

app.use(cors());
app.use(express.json());


app.get("/tokenPrice", async (req, res) => {

  const {query} = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  })

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  })
 console.log("response 1" + {responseOne});
 console.log("response 2" + {responseTwo});
  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice/responseTwo.raw.usdPrice
  }
  

  return res.status(200).json(usdPrices);
});

app.get("/api/approve/allowance", async (req, res) => {
  try {
    const { tokenAddress, walletAddress } = req.query;
    const response = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from 1inch API', details: error.message });
  }
});

app.get("/api/swap", async (req, res) => {
  try {
    const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query;
    const swapUrl = `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}&fromAddress=${fromAddress}&slippage=${slippage}`;
    const response = await axios.get(swapUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error performing swap on 1inch API', details: error.message });
  }
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dex/build')));

// Handles any requests that don't match the ones above /
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dex/build/index.html'));
});


Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
