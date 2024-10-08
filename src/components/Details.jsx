import { useState } from "react";
import Stats from "./Stats";
import LineUps from "./lineUps";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
export default function Details(props) {
  console.log(props.details.fixture.date.slice(11, 16), "dada");
  const { fixtureID } = useParams();
  // to control what shows, goals and stats or linups
  const [goals, setGoals] = useState(true);
  const [linups, setLineups] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      navigate(`/football/fixtures/${fixtureID}`, { replace: true }); // Trigger route reload every 4 minutes
    }, 240000); // Refetch every 4 minutes

    return () => clearInterval(interval); // Cleanup
  }, [navigate]);
  console.log(props.details.fixture);

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen mt-36 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl">{props.details.fixture.date.slice(0, 10)}</h2>
        <h1 className="text-xl">{props.details.league.name}</h1>
        <p className="text-xl">Referee : {props.details.fixture.referee}</p>
        <p className="text-xl">{props.details.fixture.venue.name}</p>
      </div>
      <div className="flex gap-40 ml-3 rounded-2xl bg-[#ebf2fa] shadow-md shadow-[#70e000] p-6  min-w-[750px] justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
          <p>{props.details.teams.home.name}</p>
          <img className="w-28 h-24 mt-8" src={props.details.teams.home.logo} />
        </div>
        <div className="self-center mb-20">
          <p
            className={`${
              props.details.fixture.status.short == "FT" ? "ml-2" : ""
            }`}
          >
            {props.details.fixture.status.short == "FT"
              ? "FT'"
              : props.details.fixture.date.slice(11, 16)}
          </p>
          <p
            className={`${
              props.details.fixture.status.short == "FT" ? "ml-0" : "ml-1"
            }  `}
          >{`${props.details.goals.home ? props.details.goals.home : 0} - ${
            props.details.goals.away ? props.details.goals.away : 0
          }`}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{props.details.teams.away.name}</p>
          <img className="w-24 h-24 mt-8" src={props.details.teams.away.logo} />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => {
            setGoals(true);
            setLineups(false);
          }}
          className={`${goals ? "" : "text-slate-200"}`}
        >
          Statistics
        </button>
        <button
          onClick={() => {
            setGoals(false);
            setLineups(true);
          }}
          className={`${linups ? "" : "text-slate-400"}`}
        >
          LineUps
        </button>
      </div>
      {props.details.fixture.status.elapsed ? (
        goals ? (
          <Stats
            events={props.details.events}
            statistics={props.details.statistics}
            home={props.details.teams.home.name}
            away={props.details.teams.away.name}
          />
        ) : (
          <LineUps details={props} />
        )
      ) : (
        <p>No Data yet</p>
      )}
    </div>
  );
}
