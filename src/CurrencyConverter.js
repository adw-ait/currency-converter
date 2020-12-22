import React, { useEffect, useState } from "react";
import loading from "./resources/loading.gif";
function CurrencyConverter() {
  const [fetchedData, setfetchedData] = useState([]);
  const [isFetched, setisFetched] = useState(false);

  const [baseCurrency, setbaseCurrency] = useState("CAD");
  const [targetCurrency, settargetCurrency] = useState("CAD");
  const [input, setinput] = useState(0);
  const [convertedValue, setconvertedValue] = useState(0);
  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
      .then((res) => res.json())
      .then((result) => {
        setfetchedData(result);
        setisFetched(true);
        setinput(0);
        setconvertedValue(0);
        settargetCurrency(baseCurrency);
      });
  }, [baseCurrency]);

  const valueChange = (e) => {
    const targetVal = fetchedData.rates[targetCurrency];
    setinput(e.target.value);
    setconvertedValue(e.target.value * targetVal);
  };

  const selectChange = (e) => {
    const whichSelect = e.target.name;
    const selectVal = e.target.value;
    if (whichSelect === "baseSelect") {
      setbaseCurrency(selectVal);
    } else if (whichSelect === "targetSelect") {
      settargetCurrency(selectVal);
      setconvertedValue(input * fetchedData.rates[selectVal]);
    }
  };
  return (
    <div>
      <h1>Currency Converter</h1>
      <hr />
      <h2>
        {isFetched ? convertedValue : <img src={loading} alt="Loading..." />}
      </h2>
      <hr />
      <input type="number" value={input} onChange={valueChange} />
      <hr />
      <select name="baseSelect" onChange={selectChange}>
        {isFetched &&
          Object.entries(fetchedData.rates).map(([key, value]) => {
            return (
              <option key={value} value={key}>
                {key}
              </option>
            );
          })}
      </select>{" "}
      <select name="targetSelect" onChange={selectChange}>
        {isFetched &&
          Object.entries(fetchedData.rates).map(([key, value]) => {
            return (
              <option key={value} value={key}>
                {key}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default CurrencyConverter;
