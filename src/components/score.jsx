export default function Score({
  fixture,
  setFixtureID,
  setHome,
  setAway,
  setHomeIcon,
  setAwayIcon,
  setOpen,
}) {
  return (
    <div className="grid  grid-cols-3 gap-12 bg-[#edf2f4] border-[#006400] border-solid border-[4px] w-[770px] h-[175px] rounded-lg mt-8 mb-8">
      <div className="self-center">
        <p className="ml-10">{fixture.teams.home.name}</p>
        <img
          src={fixture.teams.home.logo}
          className="w-16 h-16 justify-self-start self-center ml-9 mt-3"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>
          {fixture.fixture.status.long === "Match Finished"
            ? "Ended"
            : fixture.fixture.status.elapsed
            ? fixture.fixture.status.elapsed + "'"
            : null}
          {fixture.fixture.status.long === "Not Started"
            ? new Date(fixture.fixture.timestamp * 1000).toLocaleTimeString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              )
            : null}
        </p>
        <p>
          {fixture.goals.home ? fixture.goals.home : 0} -
          {fixture.goals.away ? " " + fixture.goals.away : " " + 0}
        </p>
        <button
          onClick={() => {
            setFixtureID(fixture.fixture.id);
            setAway(fixture.teams.away.name);
            setHome(fixture.teams.home.name);
            setAwayIcon(fixture.teams.away.logo);
            setHomeIcon(fixture.teams.home.logo);
            setOpen(true);
          }}
          className="text-[#edf2f4] bg-[#006400] p-2 mt-7 rounded-lg  "
        >
          Match Details
        </button>
      </div>
      <div className="justify-self-end self-center flex flex-col">
        <p className="mr-6 text-center">{fixture.teams.away.name}</p>
        <div className="self-center ml-9 mr-16">
          <img
            src={fixture.teams.away.logo}
            className="w-16 h-16 self-center mt-3"
          />
        </div>
      </div>
    </div>
  );
}
