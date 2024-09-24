import { motion } from "framer-motion";
export default function Scorers(props) {
  return (
    <table className="mt-10 mb-5">
      <thead className="flex flex-col min-w-full mb-5 bg-[#38b000] shadow-md shadow-[#38b000]">
        <tr
          className={`grid  ${
            props.standings
              ? "grid-cols-[50px_500px_50px_50px_50px_50px]"
              : "grid-cols-[50px_500px_50px_50px_50px_200px]"
          } p-2 gap-10 justify-center items-center mr-7 `}
        >
          <th>Place</th>
          <th className="place-self-start ml-5">Player</th>
          <th>Goals</th>
          <th>Assists</th>
          <th className="mr-2">Played</th>
          {props.standings ? null : (
            <th className=" justify-self-center">Team</th>
          )}
        </tr>
      </thead>
      <tbody className="flex gap-10 flex-col min-w-64">
        {props.leagueScorers?.response.map((player, index) => {
          return (
            <motion.tr
              initial={{
                backgroundColor: "white",
                backgroundImage: "none",
              }}
              whileHover={{
                boxShadow: "0 4px 8px #9ef01a",
                borderRadius: "3%",
              }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-[50px_500px_50px_50px_50px_200px] justify-center items-center gap-10 p-2 "
              key={player.player.id}
            >
              <td>{index + 1}</td>
              <td className="flex items-center gap-3">
                <img
                  className="w-10 h-11"
                  src={player.player.photo}
                  alt={`${player.player.photo} logo`}
                />
                {player.player.name}
              </td>
              <td>{player.statistics[0].goals.total}</td>
              <td>
                {player.statistics[0].goals.assists
                  ? player.statistics[0].goals.assists
                  : 0}
              </td>
              <td>{player.statistics[0].games.appearences}</td>
              <td className="ml-16">{player.statistics[0].team.name}</td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  );
}
