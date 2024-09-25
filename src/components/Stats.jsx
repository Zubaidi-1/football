import { IoMdFootball } from "react-icons/io";
import { TbRectangleVerticalFilled } from "react-icons/tb";

export default function Stats(props) {
  let goal = false;
  let penalty = false;
  let ownGoal = false;
  let yellow = false;
  let red = false;
  console.log(props.events, "events");

  return (
    <>
      {props?.statistics ? (
        <div className="grid grid-cols-[250px_350px_250px] gap-24 bg-[#ebf2fa] p-6 ml-14 mb-6 rounded-2xl shadow-md shadow-[#70e000]">
          <div>
            {props.events?.map((event) => {
              if (
                (event.type == "Goal" &&
                  event.detail != "Penalty Missed" &&
                  event.team.name == props.home) ||
                (event.type == "Card" && event.team.name == props.home)
              ) {
                if (event.type == "Goal") {
                  goal = true;
                } else {
                  goal = false;
                }

                if (event.detail == "Penalty") {
                  penalty = true;
                } else {
                  penalty = false;
                }
                if (event.detail == "Own Goal") {
                  ownGoal = true;
                } else {
                  ownGoal = false;
                }
                if (event.detail == "Yellow Card") {
                  yellow = true;
                } else {
                  yellow = false;
                }
                if (event.detail == "Red Card") {
                  red = true;
                } else {
                  red = false;
                }
                return (
                  <div className="flex gap-7 items-center mt-3">
                    {goal && <IoMdFootball className="mt-1" />}
                    {yellow && (
                      <TbRectangleVerticalFilled
                        color="yellow"
                        className="mt-1"
                      />
                    )}
                    {red && (
                      <TbRectangleVerticalFilled color="red" className="mt-1" />
                    )}

                    <p>
                      {event.player.name} {penalty ? "(Penalty)" : null}{" "}
                      {ownGoal ? "(Own Goal)" : null}
                    </p>
                    <p>{`${event.time.elapsed}'`}</p>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex gap-10 justify-self-center">
            {/* display stats for home team */}
            <div className="felx flex-col ">
              {props?.statistics[0]?.statistics
                .slice(0, 16)
                .map((stat, index) => {
                  return (
                    <p className={`mt-3  `}> {stat.value ? stat.value : 0}</p>
                  );
                })}
            </div>
            {/* display stats TYPES */}
            <div className="felx flex-col items-center ">
              {props.statistics[0].statistics
                .slice(0, 16)
                .map((stat, index) => {
                  return <p className={`mt-3 text-center`}> {stat.type}</p>;
                })}
            </div>
            {/* display stats for AWAY team */}
            <div className="felx flex-col ">
              {props.statistics[1].statistics.slice(0, 16).map((stat) => {
                return <p className=" mt-3 "> {stat.value ? stat.value : 0}</p>;
              })}
            </div>
          </div>
          <div>
            {/* away team goals */}
            {props.events?.map((event) => {
              if (
                (event.type == "Goal" &&
                  event.detail != "Penalty Missed" &&
                  event.team.name == props.away) ||
                (event.type == "Card" && event.team.name == props.away)
              ) {
                if (event.type == "Goal") {
                  goal = true;
                } else {
                  goal = false;
                }

                if (event.detail == "Penalty") {
                  penalty = true;
                } else {
                  penalty = false;
                }
                if (event.detail == "Own Goal") {
                  ownGoal = true;
                } else {
                  ownGoal = false;
                }
                if (event.detail == "Yellow Card") {
                  yellow = true;
                } else {
                  yellow = false;
                }
                if (event.detail == "Red Card") {
                  red = true;
                } else {
                  red = false;
                }
                return (
                  <div className="flex gap-7 items-center mt-3">
                    {goal && <IoMdFootball className="mt-1" />}
                    {yellow && (
                      <TbRectangleVerticalFilled
                        color="yellow"
                        className="mt-1"
                      />
                    )}
                    {red && (
                      <TbRectangleVerticalFilled color="red" className="mt-1" />
                    )}

                    <p>
                      {event.player.name} {penalty ? "(Penalty)" : null}
                    </p>
                    <p>{`${event.time.elapsed}'`}</p>
                  </div>
                );
              } else if (event.type.goal == false) {
                return null;
              }
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
