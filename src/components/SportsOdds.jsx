import { useEffect } from "react";

export default function SportsOdds() {
  useEffect(() => {
    fetch(
      `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=418db928118d8482455764850c4098cb`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <>
      <h1>Welcome to the Sports Odd Page!</h1>
    </>
  );
}
