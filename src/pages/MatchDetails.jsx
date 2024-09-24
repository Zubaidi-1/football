import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

export default function MatchDetails() {
  // get the fixture id
  const params = useParams();
  const [details, setDetails] = useState();
  //   initiate the url with the params and update it on change.
  const [url, setUrl] = useState(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${params.fixtureID}`
  );

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };
  //   fetch the results
  useEffect(() => {
    const fetchDetails = async function () {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Fetch error : ${response.status}`);
        }
        const results = await response.json();

        setDetails(results.response[0]);
      } catch (e) {
        console.error("Error fetching details:", e);
      }
    };
    fetchDetails();
  }, [url]);
  console.log(details);

  return <>{details ? <Details details={details} /> : null}</>;
}
