import React, { useEffect, useState } from "react";
import axios from "axios";

const Printcheque = () => {
  const [item, setItem] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

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
    <div>
      <h1>Print Cheque</h1>

      <div>
        <label htmlFor="name">Name: </label>
        <select
          id="name"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          {item.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <select
          id="description"
          value={selectedDescription}
          onChange={(e) => setSelectedDescription(e.target.value)}
        >

          {item.map((user, index) => (
            <option key={index} value={user.description}>
              {user.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Printcheque;
