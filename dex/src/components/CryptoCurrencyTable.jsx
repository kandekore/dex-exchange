import React, {useState, useEffect} from "react"
import Percentage from "./Percentage.jsx"
import "../css/crypto-currency-table.css"
import Chart from "./Chart.jsx"

function CryptoCurrencyTable() {
  //Set up state
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    //Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        //URL for fetching price data from CoinGecko API
        const priceUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
        //Fetch data from the specified URL
        const response = await fetch(priceUrl)
        //Convert the response to an array
        const data = await response.json()
        //Update the state with the retrieved data
        setCurrencies(data)
      } catch (error) {
        //Log an error message if data retrieval fails
        console.log("Failed to retrieve data:" + error)
      }
    }
    // Call the fetchData function when the component mounts
    fetchData()
  }, [])
  
  //Function for formatting number to USD currency
  function formatToUSD(val) {
    //Format the parameter to currency and add it to a new variable
    const formattedValue = val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    //Trim the ending zeros from the currency
    const trimmedValue = formattedValue.replace(".00", "")
    //Return the final formatted value
    return trimmedValue
  }

  return (
    <div className="crypto-prices">
     <div className="title">
       <h1>Top 100 Cryptocurrency Prices by Market Cap</h1>
       
     </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>24 Volume</th>
            <th>Market Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(coin => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <div className="coin">
                  <img src={coin.image} alt={coin.symbol}/>
                  <h4>{coin.name}</h4>
                  <small>{coin.symbol}</small>
                </div>
              </td>
              <td>{formatToUSD(coin.current_price)}</td>
              <Percentage coin={coin.price_change_percentage_1h_in_currency}/>
              <Percentage coin={coin.price_change_percentage_24h_in_currency}/>
              <Percentage coin={coin.price_change_percentage_7d_in_currency}/>
              <td>{formatToUSD(coin.total_volume)}</td>
              <td>{formatToUSD(coin.market_cap)}</td>
              <td>
                <Chart sparkline={coin.sparkline_in_7d} priceChange={coin.price_change_percentage_7d_in_currency}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoCurrencyTable