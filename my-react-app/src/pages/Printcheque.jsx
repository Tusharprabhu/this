import React, { useEffect, useState } from "react";
import axios from "axios";
import icici from "../images/icici.jpeg";

const Printcheque = () => {
  const [item, setItem] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isDescriptionDropdownOpen, setIsDescriptionDropdownOpen] = useState(false);

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

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-betwen h-full overflow-hidden">
      {/* Top Content */}
      <div className="p-5">
        <h1 className="text-3xl font-bold leading-tight mb-5">Print Cheque</h1>
        <div className="flex flex-row gap-5 mt-5">
          {/* Dropdown for Name */}
          <div className="relative">
            <button
              onClick={() => setIsNameDropdownOpen((prev) => !prev)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              type="button"
            >
              {selectedName || "Select Name"}
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isNameDropdownOpen && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-1">
                <ul className="py-2 text-sm text-gray-700">
                  {item.map((user, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setSelectedName(user.name);
                          setIsNameDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {user.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown for Description */}
          <div className="relative">
            <button
              onClick={() => setIsDescriptionDropdownOpen((prev) => !prev)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              type="button"
            >
              {selectedDescription || "Select Description"}
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDescriptionDropdownOpen && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-1">
                <ul className="py-2 text-sm text-gray-700">
                  {item.map((user, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setSelectedDescription(user.description);
                          setIsDescriptionDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {user.description}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Content: Image */}
      <div className="flex justify-center items-end">
        <img src={icici} alt="Cheque" className="rounded-lg shadow-lg mb-5" />
      </div>
    </div>
  );
};

export default Printcheque;
