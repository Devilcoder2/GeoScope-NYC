const Legend = () => {
  return (
    <div className="">
      <h3 className="text-sm font-semibold mb-2 text-center mt-1">
        Density Legend
      </h3>
      <ul className="lg:text-sm flex justify-around  space-x-3 lg:block text-[14px] ">
        <li className="mt-1 ml-1 lg:ml-0">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2 ml-3"
            style={{ backgroundColor: "#13202D" }}
          ></span>{" "}
          200
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#14293D" }}
          ></span>{" "}
          100
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#16304D" }}
          ></span>{" "}
          50
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#1D365C" }}
          ></span>{" "}
          20
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#243A6B" }}
          ></span>{" "}
          10
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#2A417B" }}
          ></span>{" "}
          5
        </li>
        <li className="mt-1">
          <span
            className="inline-block lg:w-4 lg:h-4 w-3 h-3 mr-2"
            style={{ backgroundColor: "#2B448C" }}
          ></span>{" "}
          0-5
        </li>
      </ul>
    </div>
  );
};

export default Legend;
