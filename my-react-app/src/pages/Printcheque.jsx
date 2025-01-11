import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Printcheque = () => {
  const [item, setItem] = useState(null);
useEffect(() => {
  axios.get('http://localhost:5000/')
    .then(response => {
      setItem(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}, []);


  // useEffect(() => {
  //   const fetchItem = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/');
  //       const data = await response.json();
  //       setItem(data);
  //     } catch (error) {
  //       console.error('Error fetching item:', error);
  //     }
  //   };  

  //   fetchItem();
  // }, []);

  // if (!item) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>Print Cheque</h1>
          {item && item.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.description}</td>
            </tr>
          ))}

    </div>
  );
};


export default Printcheque;