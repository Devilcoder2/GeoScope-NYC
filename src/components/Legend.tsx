const Legend = () => {
  return (
    <div className="bg-blue-50 ">
      <h3 className="text-sm font-bold ">Density Legend</h3>
      <ul className="text-xs">
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#13202D" }}
          ></span>{" "}
          200
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#14293D" }}
          ></span>{" "}
          100
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#16304D" }}
          ></span>{" "}
          50
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#1D365C" }}
          ></span>{" "}
          20
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#243A6B" }}
          ></span>{" "}
          10
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#2A417B" }}
          ></span>{" "}
          5
        </li>
        <li>
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#2B448C" }}
          ></span>{" "}
          0-5
        </li>
      </ul>
    </div>
  );
};

export default Legend;
