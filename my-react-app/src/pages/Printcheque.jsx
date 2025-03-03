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
  // Add this state at the top with your other state variables
  const [amount, setAmount] = useState({
    value: 0,
    formatted: "0.00",
    inWords: "Zero rupees only"
  });

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

  // Add this function before your render function
  const convertNumberToWords = (num) => {
    const single = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    
    if (num === 0) return "zero rupees only";
    
    // Function to convert numbers less than 1000
    const convertLessThanOneThousand = (num) => {
      if (num < 20) {
        return single[num];
      }
      const ten = Math.floor(num / 10);
      const unit = num % 10;
      return tens[ten] + (unit !== 0 ? " " + single[unit] : "");
    };
    
    // Main conversion function
    const convert = (num) => {
      // For numbers less than 100
      if (num < 100) {
      return convertLessThanOneThousand(num);
      }
      // For numbers 100-999, explicitly mention hundreds
      if (num < 1000) {
      const hundred = Math.floor(num / 100);
      const remainder = num % 100;
      return single[hundred] + " hundred" + (remainder !== 0 ? " and " + convertLessThanOneThousand(remainder) : "");
      }
      if (num < 100000) { // less than 1 lakh
      return convertLessThanOneThousand(Math.floor(num / 1000)) + " thousand " + 
           (num % 1000 !== 0 ? convert(num % 1000) : "");
      }
      if (num < 10000000) { // less than 1 crore
      return convertLessThanOneThousand(Math.floor(num / 100000)) + " lakh " + 
           (num % 100000 !== 0 ? convert(num % 100000) : "");
      }
      return convertLessThanOneThousand(Math.floor(num / 10000000)) + " crore " + 
         (num % 10000000 !== 0 ? convert(num % 10000000) : "");
    };
    // Get the whole number part
    const wholeNum = Math.floor(num);
    // Get the decimal part (paise)
    const decimal = Math.round((num - wholeNum) * 100);
    
    let result = convert(wholeNum) + " rupees";
    if (decimal > 0) {
      result += " and " + convert(decimal) + " paise";
    }
    
    return result + " only";
  };

  const printContainer = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
      <title>Print Cheque</title>
      <style>
      @page {
        size: 792px 612px; /* Width x Height - matching the cheque dimensions */
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
        width: 792px;
        height: 612px;
      }
      .print-container {
        position: relative;
        width: 792px;
        height: 612px;
        margin: 0;
        background-image: url('${getBankImage()}');
        background-size: cover;
        background-repeat: no-repeat;
        page-break-after: always;
      }
      .date-field {
        position: absolute;
        top: 56px;
        left: 620px;
        letter-spacing: 4.5px;
        z-index: 20;
        font-weight: 600;
        font-size: 1.25rem;
        text-transform: uppercase;
      }
      .name-field {
        position: absolute;
        top: 130px;
        left: 100px;
        z-index: 20;
        font-weight: 800;
        font-size: 1.25rem;
        text-transform: uppercase;
      }
      .bank-field-1 {
        position: absolute;
        top: 200px;
        left: 150px;
        z-index: 20;
        font-weight: 800;
        font-size: 1.25rem;
        text-transform: uppercase;
      }
      .bank-field-2 {
        position: absolute;
        top: 257px;
        left: 650px;
        z-index: 20;
        font-weight: 800;
        font-size: 1.25rem;
        text-transform: uppercase;
      }
      </style>
      </head>
      <body>
      <div class="print-container">
        <div class="date-field">
        ${new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, ' ')}
        </div>
        <div class="name-field">
        ${printedName}
        </div>
        <div class="bank-field-1">
        ${amount.inWords}
        </div>
        <div class="bank-field-2">
        ${amount.formatted}
        </div>
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
              placeholder="Bearer Name"
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
          <div className="relative">
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                const numValue = parseFloat(e.target.value);
                if (!isNaN(numValue)) {
                  // Format without currency symbol
                  const formatter = new Intl.NumberFormat('en-IN', {
                    minimumFractionDigits: 2
                  });
                  const formattedAmount = formatter.format(numValue);
                  
                  // Convert number to words
                  const amountInWords = convertNumberToWords(numValue);
                  
                  // Set these values in state
                  setAmount({
                    value: numValue,
                    formatted: formattedAmount,
                    inWords: amountInWords
                  });
                }
              }}
              className="w-full text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2 shadow-md border border-gray-300 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 ml-6 mb-6">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-52"
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
      <div className="relative mt-4 mx-auto" id="img-container">
        <img
          src={getBankImage()}
          alt={`${selectedbank || "Default"} Cheque`}
          className="rounded-lg shadow-lg h-[612px] w-[792px]"
          id="image"
        />
        {/* Date field */}
        <div className="absolute top-[56px] left-[620px] tracking-[4.5px] z-20">
          <p className="font-semibold text-xl uppercase">
            {new Date().toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).replace(/\//g, ' ')}
          </p>
        </div>
        <div className="absolute top-[130px] left-[100px] z-20">
          <p className="font-extrabold text-xl uppercase">{printedName}</p>
        </div>
        <div className="absolute top-[200px] left-[150px] z-20">
          <p className="font-extrabold text-xl uppercase">{amount.inWords}</p>
        </div>
        <div className="absolute top-[257px] left-[620px] z-20">
          <p className="font-extrabold text-xl uppercase">{amount.formatted}</p>
        </div>
      </div>
    </div>
  );
};

export default Printcheque;