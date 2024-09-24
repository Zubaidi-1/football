import { useEffect, useState } from "react";

export default function LineUps(fixtreID) {
  const [lineUp, setLineUp] = useState();
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=215662`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const fetchLineUp = async function () {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const result = await response.json();
      setLineUp(result.response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLineUp();
  }, [url]);
  console.log(lineUp);

  console.log();

  return <></>;
}
