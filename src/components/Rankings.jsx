import { motion } from "framer-motion";
export default function Rankings(props) {
  return (
    <table className="flex flex-col  mt-10 mb-5 w-fit">
      <thead className="flex flex-col min-w-full mb-5 bg-[#38b000] shadow-md shadow-[#38b000]">
        <tr
          className={`grid  ${
            props.standings
              ? "grid-cols-[50px_500px_50px_50px_50px_50px]"
              : "grid-cols-[50px_500px_50px_50px_50px_200px]"
          } p-2 gap-10 justify-center items-center mr-7 `}
        >
          <th>Ranking</th>
          <th className="place-self-start ml-5">Team</th>
          <th>Points</th>
          <th>Played</th>
          <th className="mr-2">GD</th>
          {props.standings ? null : (
            <th className=" justify-self-center">Team</th>
          )}
        </tr>
      </thead>
      <tbody className="flex gap-10 flex-col min-w-64">
        {props.standingsData?.response[0]?.league?.standings[0].map(
          (team, index) => {
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
                className="grid grid-cols-[50px_500px_50px_50px_50px_50px] justify-center items-center gap-10 p-2 "
                key={team.team.id}
              >
                <td>{team.rank}</td>
                <td className="flex items-center gap-3">
                  <img
                    className="w-10 h-11"
                    src={team.team.logo}
                    alt={`${team.team.name} logo`}
                  />
                  {team.team.name}
                </td>
                <td>{team.points}</td>
                <td>{team.all.played}</td>
                <td>{team.goalsDiff}</td>
              </motion.tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
