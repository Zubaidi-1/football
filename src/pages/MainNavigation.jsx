import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <ul className="flex justify-end gap-5 p-2 mr-4 bg-[#006400] min-w-full text-[white]">
        <Link to={"/fixtures"}>Live scores</Link>
        <Link>Leagues</Link>
        <Link className="mr-4">Teams</Link>
      </ul>
      <Outlet />
    </>
  );
}
