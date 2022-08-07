import "./App.css";
import { stocks } from "./stockAPI/stocks.js";

function App() {
  const stockList = stocks.map((stock, i) => (
    <tr key={i}>
      <td>{stock.Ticker}</td>
      <td>{stock.Company}</td>
      <td>$35.56</td>
      <td>20.0%</td>
      <td>20.0%</td>
    </tr>
  ));

  return (
    <div className="page-container">
      <h1>Nasdaq-100 Stocks</h1>
      <div className="stock-table">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Last Close Price</th>
              <th>3-Month % Change</th>
              <th>6-Month % Change</th>
            </tr>
          </thead>
          <tbody>{stockList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
