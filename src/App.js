import ReactEcharts from "echarts-for-react";
import { winedata } from "./data/winedata";
import { useEffect, useState } from "react";

function App() {
  const [magnesium, setMagnesium] = useState([]);

  // function to find the mininum Magnesium of each alcohols
  const getData = () => {
    const mininumMagnesium = {};
    for (const d of winedata) {
      const alcohol = d["Alcohol"];
      const magnesium = d["Magnesium"];

      if (
        !(alcohol in mininumMagnesium) ||
        magnesium < mininumMagnesium[alcohol]
      ) {
        mininumMagnesium[alcohol] = magnesium;
      }
    }
    const tempmagnesium = [];
    for (const key in mininumMagnesium) {
      tempmagnesium.push(mininumMagnesium[key]);
    }
    setMagnesium(tempmagnesium);
    console.log(magnesium);
  };
  // options for line graph of Flavanoids vs Ash
  const options1 = {
    xAxis: {
      type: "category",
      data: winedata.map((item) => item.Flavanoids),
      name: "Flavanoids",
      nameLocation: "middle",
      nameGap: 25,
    },
    yAxis: {
      type: "value",
      name: "Ash",
    },
    series: [
      {
        data: winedata.map((item) => item.Ash),
        type: "line",
      },
    ],
  };
  // options for bar graph of Alcohol vs Magnesium
  const options2 = {
    xAxis: {
      type: "category",
      data: [...new Set(winedata.map((item) => item.Alcohol))],
      name: "Alcohols",
      nameLocation: "middle",
      nameGap: 25,
    },

    yAxis: {
      type: "value",
      name: "Magnesium",
    },
    series: [
      {
        data: magnesium,
        type: "bar",
      },
    ],
  };
  // useEffect to call the getData once while component initialization
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <h1>E-Charts</h1>
      <div className="chart-title">
        <p>Flavanoids vs Ash</p>
      </div>
      <ReactEcharts
        option={options1}
        style={{ height: "80%", width: "100%" }}
      />
      <div className="chart-title">
        <p>Alcohol vs Magnesium</p>
      </div>
      <ReactEcharts
        option={options2}
        style={{ height: "80%", width: "100%" }}
      />
    </div>
  );
}

export default App;
