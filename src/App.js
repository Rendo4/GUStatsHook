import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { response, error, loading } = useFetch(
    "http://localhost:5000/api/players",
    {
      query: {
        page: currentPage,
        pageSize: 10,
      },
    }
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">{JSON.stringify(error)}</div>;
  }
  return (
    <div className="App">
      <h1>Koshi Midseasonal Invetaional - Gold Under - Page {currentPage}</h1>
      {loading && <div className="loading">Loading page {currentPage}</div>}
      {!loading &&
        response.map((data) => {
          return (
            <div className="datapoint" key={data.summonerID}>
            <h3>{data.summoner}</h3>
            {data.team} VS. {data.opponent}
          </div>
        );
      })}
      <div className="pagination">
        {currentPage > 1 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            Go to page {currentPage - 1}
          </button>
        )}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Go to page {currentPage + 1}
        </button>
      </div>
    </div>
  );
}

export default App;