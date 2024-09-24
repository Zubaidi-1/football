import { useLoaderData } from "react-router-dom";
import Fixture from "../components/Fixture";
import SideBar from "../components/SideBar";
import Dates from "../components/Dates";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Fixtures(props) {
  let fixtures = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      navigate("/football/fixtures", { replace: true }); // Trigger route reload every minute
    }, 240000); // Refetch every 60 seconds

    return () => clearInterval(interval); // Cleanup
  }, [navigate]);
  // filtering data to show only the top 5 leagues and CL , bpl:39, bundesliga: 78, seria A: 135, la liga: 140, fra:61, CL:2
  fixtures = fixtures?.filter(
    (item) =>
      item.league.id == 39 ||
      item.league.id == 61 ||
      item.league.id == 78 ||
      item.league.id == 135 ||
      item.league.id == 140 ||
      item.league.id == 2
  );
  console.log("fixtures", fixtures);
  let date = new Date();
  date = date.toISOString().split("T")[0];

  const [value, setValue] = useState(date);
  return (
    <div className="flex min-w-screen min-h-screen flex-col justify-center items-center mb-8">
      {fixtures.length > 0 ? (
        fixtures.map((fixture) => {
          // checking the status of the game, if its finished/started/ has not started to render different times and scores
          let time;
          let score;
          if (fixture.fixture.status.elapsed == null) {
            time = new Date(
              fixture.fixture.timestamp * 1000
            ).toLocaleTimeString([], {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }); // Formatting the timestamp as a time string
            score = "0 - 0";
          } else if (
            fixture.fixture.status.long == "Match Finished" &&
            fixture.fixture.status.elapsed == 90
          ) {
            time = "FT'";
            score = `${fixture.goals.home} - ${fixture.goals.away}`;
          } else {
            time = fixture.fixture.status.elapsed + "'";
            score = `${fixture.goals.home} - ${fixture.goals.away}`;
          }

          return (
            <Fixture
              key={fixture.fixture.id}
              home={fixture.teams.home.name}
              homeIcon={fixture.teams.home.logo}
              awayIcon={fixture.teams.away.logo}
              away={fixture.teams.away.name}
              time={time}
              score={score}
              fixtureID={fixture.fixture.id}
              elapsed={fixture.fixture.status.elapsed}
            />
          );
        })
      ) : (
        <p>No matches found</p>
      )}

      <SideBar
        value={value}
        setDate={setValue}
        leagues={props.leagues}
        setUrl={props.setUrl}
      />
      <div className="fixed right-4 top-20">
        <Dates value={value} setValue={setValue} setUrl={props.setUrl} />
      </div>
    </div>
  );
}
