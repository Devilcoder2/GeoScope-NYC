const Legend = () => {
  return (
    <div className="">
      <h3 className="text-sm font-semibold mb-2">Density Legend</h3>
      <ul className="text-sm">
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#13202D" }}
          ></span>{" "}
          &gt; 200
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#14293D" }}
          ></span>{" "}
          &gt; 100
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#16304D" }}
          ></span>{" "}
          &gt; 50
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#1D365C" }}
          ></span>{" "}
          &gt; 20
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#243A6B" }}
          ></span>{" "}
          &gt; 10
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#2A417B" }}
          ></span>{" "}
          &gt; 5
        </li>
        <li className="mt-1">
          <span
            className="inline-block w-4 h-4 mr-2"
            style={{ backgroundColor: "#2B448C" }}
          ></span>{" "}
          &gt; 0-5
        </li>
      </ul>
    </div>
  );
};

export default Legend;
