import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <ul className="relative flex justify-end gap-5 p-2  bg-[#006400] min-w-full text-[white] z-40">
        <Link to={"/fixtures"}>Live scores</Link>
        <Link className="mr-5" to={"/leagues"}>
          Leagues
        </Link>
      </ul>
      <Outlet />
    </>
  );
}
