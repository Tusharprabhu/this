import React, { useEffect, useState } from "react";
import axios from "axios";
import HDFCIMG from "../images/hdfc.jpeg";
import ICICIIMG from "../images/icici.jpeg";
import SBIIMG from "../images/sbi.jpeg";
import AXISIMG from "../images/axis.jpeg";

const Printcheque = () => {
  const [item, setItem] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedbank, setselectedbank] = useState("");
  const [printedName, setPrintedName] = useState("");
  const [Printedbank, setPrintedbank] = useState("");
  const [customName, setCustomName] = useState(true);

  const BANK_IMAGES = {
    ICICI: ICICIIMG,
    HDFC: HDFCIMG,
    SBI: SBIIMG,
    AXIS: AXISIMG,
    // Add more banks as needed
    default: ICICIIMG,
  };

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

  // Helper function to get the bank image based on selection
  const getBankImage = () => {
    return BANK_IMAGES[selectedbank.toUpperCase()] || BANK_IMAGES.default;
  };

  // Handle input name change - set custom name flag
  const handleNameInputChange = (e) => {
    setSelectedName(e.target.value);
    setCustomName(true);
  };

  // Handle dropdown selection
  const handleNameSelectChange = (e) => {
    setSelectedName(e.target.value);
    setCustomName(false);
  };

  const printContainer = () => {
    const printContent = document.getElementById("img-container").innerHTML;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Cheque</title>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .print-container {
              position: relative;
              width: 100%;
              height: 100%;
            }
            img {
              width: 100%;
              height: auto;
            }
            .absolute {
              position: absolute;
            }
            .tracking-\\[8px\\] {
              letter-spacing: 8px;
            }
            /* Preserve all the positioning from your original styling */
            .translate-x-\\[34\\.3rem\\] { transform: translateX(34.3rem); }
            .translate-y-\\[17px\\] { transform: translateY(17px); }
            .translate-x-\\[5\\.3rem\\] { transform: translateX(5.3rem); }
            .translate-y-\\[19px\\] { transform: translateY(19px); }
            .translate-x-\\[7\\.5rem\\] { transform: translateX(7.5rem); }
            .translate-y-\\[23px\\] { transform: translateY(23px); }
            .translate-x-\\[34\\.5rem\\] { transform: translateX(34.5rem); }
            .translate-y-\\[25px\\] { transform: translateY(25px); }
            .z-20 { z-index: 20; }
            .top-4 { top: 1rem; }
            .left-4 { left: 1rem; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printContent}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for images to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
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
              placeholder="Enter Custom Name"
              value={selectedName}
              onChange={handleNameInputChange}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all"
            />
            <div className="flex items-center mt-2">
              <span className="mr-2 text-sm text-gray-500">- or -</span>
            </div>
            <select
              value={customName ? "" : selectedName}
              onChange={handleNameSelectChange}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all mt-2"
            >
              <option value="" disabled>
                Select from existing names
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
              {Object.entries(BANK_IMAGES).map(([bank]) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52 mb-4"
        >
          Preview Cheque
        </button>

        <button
          onClick={printContainer}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-52"
        >
          Print Cheque
        </button>
      </div>

      {/* Image at Bottom */}
      <div className="relative mt-8 mx-auto" id="img-container">
        {/* Container that holds both image and text overlays */}
        <div className="relative">
          <img
            src={getBankImage()}
            alt={`${selectedbank || "Default"} Cheque`}
            className="rounded-lg shadow-lg h-[612px] w-[792px]"
            id="image"
          />
          {/* Date field */}
          <div className="absolute top-[56px] right-[28px] tracking-[4.5px] z-20">
            <p className="font-semibold text-xl uppercase">
              {new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }).replace(/\//g, ' ')}
            </p>
          </div>
          <div className="absolute top-[130px] right-[620px] z-20">
            <p className="font-extrabold text-xl uppercase">{printedName}</p>
          </div>
          <div className="absolute top-[200px] right-[610px] z-20">
            <p className="font-extrabold text-xl uppercase">{Printedbank}</p>
          </div>
          <div className="absolute top-[257px] right-[100px] z-20">
            <p className="font-extrabold text-xl uppercase">{Printedbank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Printcheque;
