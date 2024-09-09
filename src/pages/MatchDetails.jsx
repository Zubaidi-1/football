import { useEffect, useState } from "react";
import { IoFootball } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function MatchDetails({
  open,
  onClose,
  fixtureID,
  away,
  home,
  awayIcon,
  homeIcon,
}) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/events?fixture=${fixtureID}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const statsUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${fixtureID}`;
  const statsOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e931aeae7emshf5381e5293d8c61p1f3decjsn06705c351c58",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const [fixtureEvents, setFixtureEvents] = useState([]);
  const [fixtureStats, setFixtureStats] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setFixtureEvents(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [url]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(statsUrl, statsOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setFixtureStats(result);
        console.log(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    console.log(fixtureStats, "fixt");

    fetchStats();
  }, [statsUrl]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [open]);
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white flex rounded-xl shadow transition-all ${
          open ? "scale-100 opacity-100 w-[1250px] " : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 bg-white "
        >
          <IoIosCloseCircle color="red" size={20} />
        </button>
        <div className="grid grid-cols-5 min-w-full p-6 rounded-lg border-2 border-[#006400]">
          <div className="justify-self-start ml-5">
            <img src={homeIcon} className="w-[100px] ml-3" />
            {fixtureEvents.response &&
              fixtureEvents.response.map((events, index) => {
                if (events.type === "Goal" && events.team.name === home) {
                  return (
                    <div key={index}>
                      <div className="text-1xl  mt-3 ">
                        <div className="flex gap-2 items-center">
                          <IoFootball className="mt-1" />
                          <p>{events.player.name}</p>
                          <p>{events.time.elapsed}'</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
          {fixtureEvents.response && fixtureEvents.response.length > 0 ? (
            <>
              <div>
                {fixtureStats.response &&
                  fixtureStats.response.length >= 1 &&
                  fixtureStats.response[0].statistics &&
                  fixtureStats.response[0].statistics
                    .slice(0, 10)
                    .map((events, index) => {
                      return (
                        <div key={(index + 1) * 50} className="text-1xl  mt-3">
                          <div className="flex flex-col gap-3 items-center">
                            <p>{events.value}</p>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div>
                {fixtureStats.response &&
                  fixtureStats.response.length >= 1 &&
                  fixtureStats.response[0].statistics &&
                  fixtureStats.response[0].statistics
                    .slice(0, 10)
                    .map((events, index) => {
                      return (
                        <div key={(index + 1) * 50} className="text-1xl  mt-3">
                          <div className="flex flex-col gap-3 items-center">
                            <p>{events.type}</p>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div>
                {fixtureStats.response &&
                  fixtureStats.response.length >= 1 &&
                  fixtureStats.response[1].statistics &&
                  fixtureStats.response[1].statistics
                    .slice(0, 10)
                    .map((events, index) => {
                      return (
                        <div key={(index + 1) * 50} className="text-1xl  mt-3">
                          <div className="flex flex-col gap-3 items-center">
                            <p>{events.value}</p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </>
          ) : (
            <>
              <div className="opacity-0">No Details found</div>

              <div className="flex flex-col gap-12  ">
                <p>Match have not started yet</p>
                <button className="ml-8 bg-[#006400] text-white p-2 w-28 rounded-lg">
                  LineUps
                </button>
              </div>
              <div className="opacity-0">No Details found</div>
            </>
          )}

          <div className="justify-self-end mr-5">
            <img src={awayIcon} className="w-[100px] ml-6" />

            {fixtureEvents.response &&
              fixtureEvents.response.map((events, index) => {
                if (events.type === "Goal" && events.team.name === away) {
                  return (
                    <div key={(index + 1) * 25} className="text-1xl  mt-3">
                      <div className="flex gap-3 items-center">
                        <IoFootball className="mt-1" />
                        <p>{events.player.name}</p>
                        <p>{events.time.elapsed}'</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
