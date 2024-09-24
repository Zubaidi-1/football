import { easeIn, easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Fixture(props) {
  console.log(props, "details");

  return (
    <motion.div
      whileHover={{ backgroundColor: "#4caf50" }}
      transition={{ duration: 0.3, ease: easeIn }}
      className="grid relative grid-cols-[300px_200px_350px] w-fit h-56 mt-10  rounded-lg  items-center border-2 shadow-md bg-[#9bacb6] shadow-[#70e000]"
    >
      <div className="justify-self-start ml-6 flex items-center gap-5">
        <img className="w-20" src={props.homeIcon} />
        <p>{props.home}</p>
      </div>
      <div className="justify-self-center self-start mt-16 ml-12">
        <p
          className={
            props.time == "FT'" || props.time.length <= 3 ? "ml-3" : "ml-2"
          }
        >
          {props.time}
        </p>
        <p className={` ${props.elapsed ? "ml-1" : "ml-11 mt-2"} `}>
          {props.score ? props.score : "0 - 0"}
        </p>
      </div>
      <div className="justify-self-end mr-6 flex items-center gap-5">
        <p className="justify-self-center">{props.away}</p>
        <img className="w-20" src={props.awayIcon} />
      </div>
      <motion.button
        initial={{
          scale: 1,
          bottom: "0.5rem",
          left: "50%",
          translateX: "-50%",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, type: "spring", damping: 8 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white w-32 p-2 rounded-md"
      >
        <Link to={`/football/fixtures/${props.fixtureID}`}> Details</Link>
      </motion.button>
    </motion.div>
  );
}
