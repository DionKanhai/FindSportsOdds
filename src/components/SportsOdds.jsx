import { useEffect, useState } from "react";

export default function SportsOdds() {
  // state to store the fetched from the API, null because no data is fetched initally
  const [sportsData, setSportsData] = useState(null);

  const [error, setError] = useState(null);

  const apiKey = "418db928118d8482455764850c4098cb";

  useEffect(() => {
    fetch(
      `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("api response", data);
        setSportsData(data);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  // create an empty object that will be used to group our data by category
  const categoryMap = {};
  if (sportsData) {
    // loop through each element in the sportsdata array
    sportsData.forEach((sport) => {
      /* check if there is no category with the name of 
    the current sport event in the cateogry map */
      if (!categoryMap[sport.sport_title]) {
        /* if category name does not exist, then create an empty
      array in the categoryMap under the name of the current sports title */
        categoryMap[sport.sport_title] = [];
      }
      //push the current sport event into the new array in the categoryMap
      categoryMap[sport.sport_title].push(sport);
    });
  }
  return (
    <div>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : sportsData ? (
        <div>
          {Object.keys(categoryMap).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              {categoryMap[category].map((sport) => (
                <div key={sport.id}>
                  <h3>{sport.commence_time}</h3>
                  <h4>{sport.away_team}</h4>
                  <h4>{sport.home_team}</h4>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p> Loading... </p>
      )}
    </div>
  );
}
