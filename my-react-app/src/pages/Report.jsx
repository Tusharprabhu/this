import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">Name</th>
            <th scope="col" className="px-6 py-3">IN/OUT</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope='col' className='px-6 py-3'>TotalAmount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to="/namereport" className="text-blue-500 hover:underline">
                  {item.name}
                </Link>
              </th>
              <td className={`px-6 py-4 font-bold ${item.inout.trim().toUpperCase() === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
                {item.inout}
              </td>
              <td className="px-6 py-4 font-bold">{item.amount}</td>
              <td className="px-6 py-4 font-bold">
                {item.inout.trim().toUpperCase() === 'IN' ? item.amount : -item.amount}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base">Total</th>
            <td className="px-6 py-3 ">IN:{data.filter(item => item.inout.trim().toUpperCase() === 'IN').length} / OUT:{data.filter(item => item.inout.trim().toUpperCase() === 'OUT').length}</td>
            <td className="px-6 py-3">{data.reduce((acc, item) => acc + item.amount, 0)}</td>
            <td className="px-6 py-3">
              {data.reduce((acc, item) => {
                return item.inout.trim().toUpperCase() === 'IN' ? acc + item.amount : acc - item.amount;
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>  
  );
};

export default Report;