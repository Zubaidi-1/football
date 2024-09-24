import { useRef, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function SideBar(props) {
  const [dropdowns, setDropdowns] = useState({});
  let today = new Date();
  today = today.toISOString().split("T")[0];
  console.log(today, "tday");

  const toggleDropdown = (id) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // const formattedDate = props.value.toISOString().split("T")[0];

  // console.log(formattedDate, "date");

  const dateRef = useRef();
  return (
    <div className="fixed flex top-0 left-0 z-20 justify-center items-center min-h-screen w-52 bg-[#9bacb6] text-slate-800]">
      <div>
        <div>
          {Object.values(props.leagues).map((league) => {
            return (
              // this first div is just to set a margin to countries
              <div key={league.leagueID} className="mb-10">
                <div
                  onClick={() => toggleDropdown(league.leagueID)}
                  key={league.leagueID}
                  className="flex "
                >
                  <div className="mr-4">{league.icon}</div>
                  <div className="mr-4">{league.country}</div>
                  <div className="justify-self-center self-center ">
                    {dropdowns[league.leagueID] ? (
                      <FaChevronDown size={10} />
                    ) : (
                      <FaChevronRight size={10} />
                    )}
                  </div>
                </div>
                <div className="ml-3 mt-2">
                  <a
                    onClick={() => {
                      console.log(league.leagueID);

                      props.setUrl(
                        `  https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${props.value}&league=${league.leagueID}&season=2024`
                      );
                    }}
                  >
                    {dropdowns[league.leagueID] ? league.league : null}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              props.setUrl(
                `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`
              );
              props.setDate(today);
              console.log(props.value, "vala");
            }}
            className="bg-slate-800 p-2 rounded-md text-white "
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
