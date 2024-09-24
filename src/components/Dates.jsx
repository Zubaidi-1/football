import { forwardRef, useState } from "react";

const Dates = forwardRef(function (props, ref) {
  // Handle date change
  const handleChange = (e) => {
    const newDate = new Date(e.target.value);
    const formattedDate = newDate.toISOString().split("T")[0]; // Format the date as needed
    props.setValue(formattedDate);
    console.log(formattedDate);

    props.setUrl(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formattedDate}`
    );
  };

  // Format the value for the input

  return (
    <div>
      <input
        className="p-2 border-2 border-[#70e000] w-52 text-center text-[#006400] rounded-lg"
        ref={ref}
        type="date"
        value={props.value} // Set input value based on formattedDate
        onChange={handleChange}
      />
    </div>
  );
});

export default Dates;
