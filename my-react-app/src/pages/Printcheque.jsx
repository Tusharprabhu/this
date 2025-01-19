import React, { useEffect, useState } from "react";
import axios from "axios";
import icici from "../images/icici.jpeg";

const Printcheque = () => {
  const [item, setItem] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedbank, setselectedbank] = useState("");
  const [printedName, setPrintedName] = useState("");
  const [Printedbank, setPrintedbank] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handlePrint = () => {
    setPrintedName(selectedName);
    setPrintedbank(selectedbank);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="">
        <h1 className="text-3xl font-semibold m-6">Print Cheque</h1>
        <div className="flex flex-row justify-start items-center gap-8 m-5 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Name"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all"
            />
            <select
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all mt-2"
            >
              <option value="" disabled>
                Select Name
              </option>
              {item.map((user, index) => (
                <option key={index} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedbank}
              onChange={(e) => setselectedbank(e.target.value)}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all"
            >
              <option value="" disabled>
                Select bank
              </option>
              {item.map((user, index) => (
                <option key={index} value={user.bank}>
                  {user.bank}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52"
      >
        Preview Cheque
      </button>

      <button
        onClick={() => window.print()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-52"
      >
        Print Page
      </button>

      {/* Image at Bottom */}
      <div id="image" className="flex justify-center m-20 items-center relative">
        <img
          src={icici}
          alt="Cheque"
          className="rounded-lg shadow-lg h-[612px] w-[792px]"
        />
        <div className="absolute font-bold flex flex-col justify-start top-0 left-0 text-[20px]">
          <div className="tracking-[8px] translate-x-[34.3rem] translate-y-[17px]">
            <p>{printedName}</p>
          </div>
          <div className="translate-x-[5.3rem] translate-y-[19px]">
            <p>{printedName}</p>
          </div>
          <div className="translate-x-[7.5rem] translate-y-[23px]">
            <p>{Printedbank}</p>
          </div>
          <div className="translate-x-[34.5rem] translate-y-[25px]">
            <p>{Printedbank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Printcheque;
