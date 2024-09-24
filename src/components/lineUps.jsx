import { useState } from "react";

export default function LineUps({ details }) {
  const [home, setHome] = useState(true);
  const [away, setAway] = useState(false);
  const awayTeam = details.details.lineups[1];
  const homeTeam = details.details.lineups[0];
  const firstRow = [];
  const secondRow = [];
  const thirdRow = [];
  const fourthRow = [];
  const fifthRow = [];
  let homeTeamRows;
  home
    ? (homeTeamRows = homeTeam.startXI.filter((p) => {
        const [row, col] = p.player.grid.split(":");

        if (row == 1) {
          firstRow.push(p.player);
        } else if (row == 2) {
          secondRow.push(p.player);
        } else if (row == 3) {
          thirdRow.push(p.player);
        } else if (row == 4) {
          fourthRow.push(p.player);
        } else if (row == 5) {
          fifthRow.push(p.player);
        }
      }))
    : (homeTeamRows = awayTeam.startXI.filter((p) => {
        const [row, col] = p.player.grid.split(":");

        if (row == 1) {
          firstRow.push(p.player);
        } else if (row == 2) {
          secondRow.push(p.player);
        } else if (row == 3) {
          thirdRow.push(p.player);
        } else if (row == 4) {
          fourthRow.push(p.player);
        } else if (row == 5) {
          fifthRow.push(p.player);
        }
      }));

  return (
    <div className="justify-center items-center justify-self-center self-center  ml-5 ">
      <div className="flex gap-6 justify-center self-center mb-8">
        <button
          onClick={() => {
            setHome(true);
            setAway(false);
          }}
          className={`${home ? "" : "text-slate-200"}`}
        >
          Home Lineups
        </button>
        <button
          onClick={() => {
            setHome(false);
            setAway(true);
          }}
          className={`${away ? "" : "text-slate-400"}`}
        >
          Away Lineups
        </button>
      </div>
      <div className="self-center">
        <div className="flex justify-center items-center gap-5 ">
          <img
            className="w-16"
            src={home ? homeTeam.coach.photo : awayTeam.coach.photo}
          />
          <p>{home ? homeTeam.coach.name : awayTeam.coach.name}</p>
        </div>
        <div className="flex ">
          <p className="mt-5 mb-5">
            Formation: {home ? homeTeam.formation : awayTeam.formation}
          </p>
        </div>
        <div className="grid grid-cols-5  gap-14 items-center p-10  bg-[#ebf2fa] rounded-2xl shadow-md shadow-[#70e000] mb-12">
          {firstRow.map((player) => {
            return (
              <p className="row-start-5 col-start-3 text-center ">
                {player.name}
              </p>
            );
          })}
          {secondRow.map((player, index) => {
            if (secondRow.length == 3) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-3",
                2: "col-start-5",
              };
              return (
                <p
                  className={`row-start-4 text-center  ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (secondRow.length == 4) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-2",
                2: "col-start-4",
                3: "col-start-5",
              };

              return (
                <p
                  className={`row-start-4 text-center  ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (secondRow.length == 5) {
              return (
                <p className={`row-start-4  text-center  `}>{player.name}</p>
              );
            }
          })}
          {thirdRow.map((player, index) => {
            if (thirdRow.length == 1) {
              return (
                <p className={`row-start-3 text-center  col-start-3`}>
                  {player.name}
                </p>
              );
            } else if (thirdRow.length == 2) {
              const columnMapping = {
                0: "col-start-2",
                1: "col-start-4",
              };
              return (
                <p
                  className={`row-start-3 text-center  ${columnMapping[index]}`}
                >
                  {player.name}
                </p>
              );
            } else if (thirdRow.length == 3) {
              const columnMapping = {
                0: "col-start-2",
                1: "col-start-3",
                2: "col-start-4",
              };
              return (
                <p
                  className={`row-start-3 text-center   ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (thirdRow.length == 4) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-2",
                2: "col-start-4",
                3: "col-start-5",
              };

              return (
                <p
                  className={`row-start-3 text-center  ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (thirdRow.length == 5) {
              return (
                <p className={`row-start-3 text-center `}>{player.name}</p>
              );
            }
          })}{" "}
          {fourthRow.map((player, index) => {
            if (fourthRow.length == 1) {
              return (
                <p className={`row-start-2  col-start-3`}>{player.name}</p>
              );
            } else if (fourthRow.length == 2) {
              const columnMapping = {
                0: "col-start-2",
                1: "col-start-4",
              };
              return (
                <p
                  className={`row-start-2 text-center  ${columnMapping[index]}`}
                >
                  {player.name}
                </p>
              );
            } else if (fourthRow.length == 3) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-3",
                2: "col-start-5",
              };
              return (
                <p
                  className={`row-start-2 text-center  ${
                    columnMapping[index]
                  } ${index == 1 ? "mb-10" : ""}`}
                >
                  {player.name}
                </p>
              );
            } else if (fourthRow.length == 4) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-2",
                2: "col-start-4",
                3: "col-start-5",
              };

              return (
                <p
                  className={`row-start-2 text-center  ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (fourthRow.length == 5) {
              return <p className={`row-start-2 `}>{player.name}</p>;
            }
          })}{" "}
          {fifthRow.map((player, index) => {
            if (fifthRow.length == 1) {
              return (
                <p className={`row-start-1 col-start-3 text-center `}>
                  {player.name}
                </p>
              );
            } else if (fifthRow.length == 2) {
              const columnMapping = {
                0: "col-start-2",
                1: "col-start-4",
              };
              return (
                <p
                  className={`row-start-1  text-center  ${columnMapping[index]}`}
                >
                  {player.name}
                </p>
              );
            } else if (fifthRow.length == 3) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-3",
                2: "col-start-5",
              };
              return (
                <p
                  className={`row-start-1 text-center  ${columnMapping[index]}`}
                >
                  {player.name}
                </p>
              );
            } else if (fifthRow.length == 4) {
              const columnMapping = {
                0: "col-start-1",
                1: "col-start-2",
                2: "col-start-4",
                3: "col-start-5",
              };

              return (
                <p
                  className={`row-start-1  text-center  ${columnMapping[index]} `}
                >
                  {player.name}
                </p>
              );
            } else if (fifthRow.length == 5) {
              return (
                <p className={`row-start-1 text-center  `}>{player.name}</p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
