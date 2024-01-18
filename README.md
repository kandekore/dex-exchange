# Dex Exchange README

## Overview

Dex Exchange is a cutting-edge, decentralized exchange platform designed for secure and efficient trading of ERC20 tokens across various EVM Chains. The platform integrates with MetaMask, allowing users to manage their transactions easily in a secure and familiar environment. This project represents a significant step towards innovating in the decentralized finance (DeFi) space.

Live Application: [Dex Exchange](https://dexexchange-07eb12adac18.herokuapp.com/)

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest stable version)
- npm (Node Package Manager)
- Git (for cloning the repository)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/kandekore/dex-exchange
cd dex-exchange
```

### Install Dependencies

The project consists of two main parts: the backend (`dexBack`) and the frontend (`dex`). Dependencies for both parts need to be installed.

Run the following command to install all necessary dependencies:

```bash
npm run install
```

This script will navigate to both `dexBack` and `dex` directories and install the required packages.

### Environment Setup

Create a `.env` file in the `dexBack` directory with the necessary environment variables. Example:

```env
PORT=3000
MORALIS_API_KEY=your_moralis_api_key
```

Replace `your_moralis_api_key` with your actual Moralis API key.

### Running the Application

To run the application in development mode with both the front-end and back-end services, use:

```bash
npm run develop
```

This will start the backend server and the React development server concurrently.

For production, you can build the front-end application using:

```bash
npm run build:dex
```

Then, start the server:

```bash
npm start
```

## Features

- **ERC20 Token Swapping**: Seamless exchange of various ERC20 tokens.
- **MetaMask Integration**: Secure and easy transactions through MetaMask wallet.
- **1Inch Liquidity Aggregator**: Ensures competitive rates for trades.
- **Real-time Data**: Utilizes Moralis Web3 API for up-to-date blockchain information.

## Repository Structure

- `dexBack`: Contains the backend code (Node.js, Express).
- `dex`: Contains the frontend code (React).

## Author

D Kandekore

## License

This project is licensed under the ISC License.

## Acknowledgements

A heartfelt thank you to all contributors and users of Dex Exchange for your unwavering support and feedback. Special acknowledgments to Moralis and the 1Inch Liquidity Aggregator. Their robust APIs and technologies have been instrumental in the successful development of this platform, significantly contributing to its functionality and performance.
