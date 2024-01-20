import React, {useState} from "react"
import ReactApexChart from "react-apexcharts"

function Chart({sparkline, priceChange}) {
  //Add chart options to state
  const [chartOptions] = useState({
    series: [{
      data: [...sparkline.price],
    }],
    chart: {
      type: "area",
      height: 150,
      sparkline: {enabled: true},
      animations: {enabled: false},
    },
    tooltip: {enabled: false},
    stroke: {width: 1},
    colors: [chartColor()],
  })

  /*Function to change chart color 
  based on the price change in 7 days*/
  function chartColor() {
    //If the price has declined
    if(priceChange <= 0) {
      //Return a red color
      return "#ff3131"
    //And if it's rising
    } else {
      //Return a green color
      return "#25df3e"
    }
  }

  return (
    <ReactApexChart options={chartOptions} series={chartOptions.series} className="chart"/>
  )
}

export default Chart