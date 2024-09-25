import { useRef, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { easeInOut, motion } from "framer-motion";

export default function SideBar(props) {
  const [dropdowns, setDropdowns] = useState({});
  const [open, setOpen] = useState(true);

  let today = new Date();
  today = today.toISOString().split("T")[0];

  const toggleDropdown = (id) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <motion.div
      animate={{
        backgroundColor: open ? "#9bacb6" : "#fff",
        x: open ? 0 : -200, // Animating the sidebar sliding in and out
      }}
      initial={false}
      transition={{ duration: 0.5, ease: easeInOut }}
      className={`fixed flex top-0 left-0 z-20 justify-center items-center min-h-screen w-52 text-slate-800`}
    >
      {open && (
        <div>
          <div>
            {Object.values(props.leagues).map((league) => {
              return (
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
                  <div className="ml-3 mt-2 flex justify-center items-center">
                    {dropdowns[league.leagueID] ? (
                      <motion.button
                        className="bg-slate-800 text-white mt-3 rounded-lg p-2"
                        whileHover={{
                          scale: 1.1, // Scale up on hover
                          backgroundColor: "#4a5568", // Change background color on hover
                        }}
                        whileTap={{
                          scale: 0.95, // Slightly reduce size when clicked
                          backgroundColor: "#2d3748", // Darker background on click
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <a
                          onClick={() => {
                            props.setUrl(
                              `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${props.value}&league=${league.leagueID}&season=2024`
                            );
                          }}
                        >
                          {league.league}
                        </a>
                      </motion.button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <motion.button
              onClick={() => {
                props.setUrl(
                  `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`
                );
                props.setDate(today);
              }}
              className="bg-slate-800 p-2 rounded-md text-white"
              whileHover={{
                scale: 1.1, // Scale up the button on hover
                backgroundColor: "#4a5568", // Change background color on hover
              }}
              whileTap={{
                scale: 0.95, // Slightly reduce scale on click
                backgroundColor: "#2d3748", // Darker background when pressed
              }}
              transition={{ duration: 0.2, ease: easeInOut }} // Smooth transition
            >
              Clear filters
            </motion.button>
          </div>
        </div>
      )}

      <motion.button
        initial={{ scale: 1, right: 0, translateX: "50%" }}
        whileHover={{ scale: 1.3 }}
        transition={{ ease: easeInOut, duration: 0.4 }}
        className={`absolute ${
          open
            ? "right-0 -translate-y-1/2 translate-x-1/2"
            : "left-0 -translate-y-1/2 translate-x-1/2"
        } `}
      >
        {open ? (
          <FaArrowLeft
            size={22}
            color="#38b000"
            className="bg-black rounded-full p-1"
            onClick={() => setOpen(false)}
          />
        ) : (
          <FaArrowRight
            size={22}
            color="#38b000"
            className="bg-black rounded-full p-1 ml-28"
            onClick={() => setOpen(true)}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
