import { useEffect, useState } from "react";
import MatchDetails from "./MatchDetails";

export default function Fixtures() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${year}-${month}-${day}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const [open, setOpen] = useState(false);
  const [notStarted, setNotStarted] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const [fixtureID, setFixtureID] = useState();
  const [home, setHome] = useState();
  const [away, setAway] = useState();
  const [homeIcon, setHomeIcon] = useState();
  const [awayIcon, setAwayIcon] = useState();

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
            (res.league.country === "Germany" &&
              res.league.name === "Bundesliga") ||
            (res.league.country === "Italy" && res.league.name === "Serie A") ||
            (res.league.country === "France" &&
              res.league.name === "Ligue 1") ||
            (res.league.country === "Spain" && res.league.name === "La Liga") ||
            (res.league.country === "England" &&
              res.league.name === "Premier League") ||
            (res.league.country === "World" &&
              res.league.name === "UEFA Nations League")
        );

        setFixtures(filteredFixtures);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      <div className="grid justify-center items-center min-h-screen gap-8  bg-[#394a4d]">
        {fixtures.length > 0 ? (
          fixtures.map((fixture) => (
            <div
              className="grid  grid-cols-3 gap-12 bg-[#edf2f4] border-[#006400] border-solid border-[4px] w-[770px] h-[175px] rounded-lg mt-8 mb-8"
              key={fixture.fixture.id}
            >
              <div className="self-center">
                <p className="ml-10">{fixture.teams.home.name}</p>
                <img
                  src={fixture.teams.home.logo}
                  className="w-16 h-16 justify-self-start self-center ml-10 mt-3"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>
                  {fixture.fixture.status.long === "Match Finished"
                    ? "Ended"
                    : fixture.fixture.status.elapsed}
                  {fixture.fixture.status.long === "Not Started"
                    ? new Date(
                        fixture.fixture.timestamp * 1000
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : null}
                </p>
                <p>
                  {fixture.goals.home ? fixture.goals.home : 0} -
                  {fixture.goals.away ? fixture.goals.away : 0}
                </p>
                <button
                  onClick={() => {
                    setFixtureID(fixture.fixture.id);
                    setAway(fixture.teams.away.name);
                    setHome(fixture.teams.home.name);
                    setAwayIcon(fixture.teams.away.logo);
                    setHomeIcon(fixture.teams.home.logo);
                    setOpen(true);
                  }}
                  className="text-[#edf2f4] bg-[#006400] p-2 mt-7 rounded-lg  "
                >
                  Match Details
                </button>
              </div>
              <div className="justify-self-end self-center flex flex-col">
                <p className="mr-7 text-center">{fixture.teams.away.name}</p>
                <img
                  src={fixture.teams.away.logo}
                  className="w-16 h-16 justify-self-center self-center mr-9 mt-3"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No fixtures found.</p>
        )}
        {open ? (
          <MatchDetails
            open={open}
            onClose={() => setOpen(false)}
            fixtureID={fixtureID}
            home={home}
            away={away}
            awayIcon={awayIcon}
            homeIcon={homeIcon}
          />
        ) : null}
      </div>
    </>
  );
}
