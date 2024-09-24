import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function League() {
  const url = "https://api-football-v1.p.rapidapi.com/v3/leagues";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };
  const [league, setLeague] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const filteredFixtures = result.response.filter(
          (res) =>
            (res.country.name === "Germany" &&
              res.league.name === "Bundesliga") ||
            (res.country.name === "Italy" && res.league.name === "Serie A") ||
            (res.country.name === "France" && res.league.name === "Ligue 1") ||
            (res.country.name === "Spain" && res.league.name === "La Liga") ||
            (res.country.name === "England" &&
              res.league.name === "Premier League") ||
            (res.country.name === "World" &&
              res.league.name === "UEFA Champions League")
        );

        setLeague(filteredFixtures);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    console.log(league);
  }, [url]);
  return (
    <div className="grid grid-cols-3 min-h-screen min-w-screen items-center">
      {league.map((league) => {
        return (
          <motion.div
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.7 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 9,
            }}
            className="justify-self-center"
          >
            <Link
              to={`/football/leagues/${league.league.id}`}
              key={league.league.id}
            >
              <img className="w-24" src={league.league.logo} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
