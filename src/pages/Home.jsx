import { Link } from "react-router-dom";
import homeImage from "../images/home.jpg";
import { easeIn, motion, spring } from "framer-motion";
export default function Home() {
  return (
    <motion.div
      className={` bg-cover bg-center min-h-screen min-w-screen bg flex flex-col justify-center `}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeImage})`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: easeIn }}
        className="text-white w-60 text-3xl ml-20"
      >
        "I learned all about life with a ball at my feet." – Ronaldinho
      </motion.h1>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 17,
        }}
        className="bg-[#006400] text-1xl text-white  p-2 rounded-full w-24 ml-20 mt-4"
      >
        <Link to={"/Fixtures"}>Live Scores</Link>
      </motion.button>
    </motion.div>
  );
}
