import Fixture from "./Fixture";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function LeagueFixtures(props) {
  console.log(props.fixturesByLeague.response, "fixturesByLeague");
  const navigate = useNavigate();
  const { leagueID } = useParams();
  console.log(leagueID, "id");

  useEffect(() => {
    const interval = setInterval(() => {
      navigate(`/leagues/${leagueID}`, { replace: true }); // Trigger route reload every minute
    }, 60000); // Refetch every 60 seconds

    return () => clearInterval(interval); // Cleanup
  }, [navigate]);
  return (
    <>
      <div className="flex min-w-screen min-h-screen flex-col justify-center items-center mb-8">
        {props.fixturesByLeague.response.map((fixture) => {
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
        })}
      </div>
    </>
  );
}
