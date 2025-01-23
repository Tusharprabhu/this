import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NameReport = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/transactions/${id}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-3xl font-semibold m-6">Transactions for {transactions.name}</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">IN/OUT</th>
            <th scope="col" className="px-6 py-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <td className={`px-6 py-4 font-bold ${transaction.inout.trim().toUpperCase() === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.inout}
              </td>
              <td className="px-6 py-4 font-bold">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NameReport;