import React, { useEffect, useState } from "react";

import arrow from "./resources/arrow.png";
import "./style.css";
function CurrencyConverter() {
  const [fetchedData, setfetchedData] = useState([]);
  const [isFetched, setisFetched] = useState(false);
  const [baseCurrency, setbaseCurrency] = useState("CAD");
  const [targetCurrency, settargetCurrency] = useState("CAD");
  const [input, setinput] = useState(1);
  const [convertedValue, setconvertedValue] = useState(1);
  const [valueExtended, setvalueExtended] = useState(false);
  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
      .then((res) => res.json())
      .then((result) => {
        setfetchedData(result);
        setisFetched(true);
        setinput(1);
        setconvertedValue(1);
        settargetCurrency(baseCurrency);
        setvalueExtended(false);
      });
  }, [baseCurrency]);

  const valueChange = (e) => {
    if (e.target.value > 9999999) {
      setvalueExtended(true);
    } else {
      setvalueExtended(false);
      const targetVal = fetchedData.rates[targetCurrency];
      setinput(e.target.value);
      setconvertedValue(e.target.value * targetVal);
    }
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
      <h1 className="heading">Currency Converter</h1>
      <div className="flex-container-Card ">
        <div className="flex-container-value">
          {isFetched ? (
            <h2>
              {targetCurrency} : {convertedValue.toFixed(2)}
            </h2>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
        <div className="flex-container-input">
          <input
            className="flex-container-input"
            type="number"
            value={input}
            onChange={valueChange}
          />
        </div>
        <div className="flex-container-select">
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
          <img className="arrow" src={arrow} alt="" />
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
      </div>
      {valueExtended && <Error />}
    </div>
  );
}
const Error = () => {
  return <h2 className="error-ValueMore">Max length reached!!!</h2>;
};

export default CurrencyConverter;
