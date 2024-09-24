import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import Rankings from "../components/Rankings";
import Scorers from "../components/Scorers";
import Assists from "../components/Assists";
import LeagueFixtures from "../components/LeagueFixtures";

export default function Standings() {
  const [standings, setStandings] = useState(true);
  const [assists, setAssists] = useState(false);
  const [scorers, setScorers] = useState(false);
  const [fixtures, setFixtures] = useState(false);
  const {
    standingsData,
    leagueScorers,
    leagueAssists,
    fixturesByLeague,
    error,
  } = useLoaderData();
  console.log(leagueAssists, "assists");
  console.log(useParams(), "para");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-5 mt-10 ml-20">
        <button
          onClick={() => {
            setStandings(true);
            setAssists(false);
            setScorers(false);
            setFixtures(false);
          }}
          className={`${standings ? "" : "text-slate-400"}`}
        >
          Standings
        </button>
        <button
          onClick={() => {
            setStandings(false);
            setAssists(false);
            setScorers(true);
            setFixtures(false);
          }}
          className={`${scorers ? "" : "text-slate-400"}`}
        >
          Top scorers
        </button>
        <button
          onClick={() => {
            setAssists(true);
            setStandings(false);
            setScorers(false);
            setFixtures(false);
          }}
          className={`${assists ? "" : "text-slate-400"}`}
        >
          Top assists
        </button>
        <button
          onClick={() => {
            setAssists(false);
            setStandings(false);
            setScorers(false);
            setFixtures(true);
          }}
          className={`${fixtures ? "" : "text-slate-400"}`}
        >
          Fixtures
        </button>
      </div>

      {standings && (
        <Rankings standings={standings} standingsData={standingsData} />
      )}
      {scorers && (
        <Scorers standings={standings} leagueScorers={leagueScorers} />
      )}
      {assists && (
        <Assists standings={standings} leagueAssists={leagueAssists} />
      )}
      {fixtures && <LeagueFixtures fixturesByLeague={fixturesByLeague} />}
    </div>
  );
}
