import { useState } from "react";
import { api } from "../api"

export const ExamRow = ({ index, percentage, isDataAvailable, exam, teacher, isPass }) => {
  const [edit, setEdit] = useState(false);
  const [num, setNumber] = useState(exam.secured || 0);
  const [loading, setLoading] = useState(false);

  const jwt = JSON.parse(localStorage.getItem("jwt"))

  const handleSubmit = async () => {
    if (edit === false) {
      setEdit(true);
    } else {
      setLoading(true);
      try {
        const url = `${api}student/mark/${exam.id}/`;
        const body = {
          secured: num,
          total: exam.total
        };

        const res = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        window.location.reload()
        
        setEdit(false);
      } catch (error) {
        console.error('There was an error with the request:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {teacher && (
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {exam.student.name}
        </th>
      )}
      <td className="px-6 py-4 ">{exam.exam}</td>
      {(!edit) && <td className="px-6 py-4">{exam.secured !== null ? exam.secured : 'N/A'}</td>}
      {(edit) && (
        <td className="px-6 py-4">
          <input
            onChange={(e) => setNumber(e.target.value)}
            value={num}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-12 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </td>
      )}
      <td className="px-6 py-4">{exam.total !== null ? exam.total : 'N/A'}</td>
      <td className="px-6 py-4">{percentage !== null ? percentage.toFixed(2) : 'N/A'}</td>
      <td className={`px-6 py-4 ${isDataAvailable ? (isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : ''}`}>
        {isDataAvailable ? (isPass ? 'Pass' : 'Fail') : 'N/A'}
      </td>
      {teacher && (
        <td className="px-6 py-4 text-right">
          <button onClick={handleSubmit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" disabled={loading}>
            {edit ? "Save" : "Edit"}
          </button>
        </td>
      )}
    </tr>
  );
};
