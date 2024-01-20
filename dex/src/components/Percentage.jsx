function Percentage({coin}) {
    /*Function to set the price changes 
    colors based on the price change percentage*/
    function percentageColor() {
      //If the price is declining
      if(coin <= 0) {
        //Return the falling class
        return "falling"
      //And if it's rising
      } else {
        //Return the rising class
        return "rising"
      }
    }
  
    return (
      <td className={percentageColor()}>{coin.toFixed(1)}%</td>
    )
  }
  
  export default Percentage
  