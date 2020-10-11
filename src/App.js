import React from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const { response, error, loading } = useFetch(
    "http://localhost:5000/api/players",
    {
      query: {
        page: 1,
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
      {response.map((data) => {
        return (
          <div className="datapoint" key={data.summonerID}>
            <h3>{data.summoner}</h3>
            {data.team} VS. {data.opponent}
          </div>
        );
      })}
    </div>
  );
}

export default App;