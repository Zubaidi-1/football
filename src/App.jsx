import "./App.css";
import { FR, DE, ES, GB, IT, EU } from "country-flag-icons/react/3x2";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./pages/MainNavigation";
import Fixtures from "./pages/Fixtures";
import League from "./pages/League";
import Standings from "./pages/Standings";
import { useState, useEffect } from "react";
import MatchDetails from "./pages/MatchDetails";
function App() {
  const newDate = new Date();
  const formattedDate = newDate.toISOString().split("T")[0]; // Format the date as needed

  const leagues = {
    bpl: {
      league: "Priemer League",
      leagueID: "39",
      country: "England",
      icon: <GB className="w-9" title="England" />,
    },
    ger: {
      league: "Bundesliga",
      leagueID: "78",
      country: "Germany",
      icon: <DE className="w-9" title="Germany" />,
    },
    france: {
      league: "Ligue 1",
      leagueID: "61",
      country: "France",
      icon: <FR className="w-9" title="France" />,
    },
    ita: {
      league: "Seria A",
      leagueID: "135",
      country: "Italy",
      icon: <IT className="w-9" title="Italy" />,
    },
    SPA: {
      league: "La Liga",
      leagueID: "140",
      country: "Spain",
      icon: <ES className="w-9" title="Spain" />,
    },
    champions: {
      league: "Champions league",
      leagueID: "2",
      country: "Europe",
      icon: <EU className="w-9" title="Europe" />,
    },
  };
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };
  const [url, setUrl] = useState(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formattedDate}`
  );

  const router = createBrowserRouter([
    {
      path: "/football/",
      element: <MainNavigation />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "/football/fixtures",
          element: <Fixtures leagues={leagues} url={url} setUrl={setUrl} />,
          loader: async () => {
            try {
              const response = await fetch(url, {
                method: "GET",
                headers: {
                  "x-rapidapi-key":
                    "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
                  "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                },
              });
              const result = await response.json();
              return result.response;
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          path: "/football/fixtures/:fixtureID",
          element: <MatchDetails />,
        },
        { path: "/football/leagues", element: <League /> },
        {
          path: "/football/leagues/:leagueID",
          element: <Standings />,
          loader: async ({ params }) => {
            const { leagueID } = params; // Get the leagueID from URL params
            try {
              const [
                standingsData,
                leagueScorers,
                leagueAssists,
                fixturesByLeague,
              ] = await Promise.all([
                fetch(
                  `https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueID}&season=2024`,
                  options
                ).then((res) => res.json()),
                fetch(
                  `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueID}&season=2024`,
                  options
                ).then((res) => res.json()),
                fetch(
                  `https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=${leagueID}&season=2024`,
                  options
                ).then((res) => res.json()),

                fetch(
                  `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueID}&season=2024`,
                  options
                ).then((res) => res.json()),
              ]);
              return {
                standingsData,
                leagueScorers,
                leagueAssists,
                fixturesByLeague,
              };
            } catch (error) {
              console.error("Error fetching league data: ", error);
              return { error };
            }
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
