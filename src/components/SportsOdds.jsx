import { useEffect, useState } from "react";


export default function SportsOdds() {

  // state to store the fetched from the API, null because no data is fetched initally
const [sportsData, setSportsData] = useState(null);

const [error, setError] = useState(null);

const apiKey = '418db928118d8482455764850c4098cb';


  useEffect(() => {
    fetch(
      `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => { 
        console.log("api response", data)
        setSportsData(data) })
      .catch((error) => console.error("Error fetching data", error))
  }, []);

  return (
    <div>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : sportsData ? (
        <div>
          {sportsData.map((sport) => (
            <div key={sport.id}>
              <h2>{sport.sport_title}</h2>
              <h4>{sport.away_team}</h4>
              <h4>{sport.home_team}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p> Loading... </p>
      )}
    </div>
  );
}
