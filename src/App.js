import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="page-container">
      <div className="stock-table">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
              <th>Volume</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AAPL</td>
              <td>Apple Inc.</td>
              <td>$AAPL</td>
              <td>$AAPL</td>
              <td>$AAPL</td>
              <td>$AAPL</td>
              <td>$AAPL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
