import { Link } from "react-router-dom";

export const TimeTable = ({ examData, teacher }) => {
  return (
    <div className="relative shadow sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            { teacher && <th scope="col" className="px-6 py-3">Student Name</th>}
            <th scope="col" className="px-6 py-3">Exam</th>
            <th scope="col" className="px-6 py-3">Secured</th>
            <th scope="col" className="px-6 py-3">Total</th>
            <th scope="col" className="px-6 py-3">Percentage</th>
            <th scope="col" className="px-6 py-3">Status</th>
            {teacher && <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>}
          </tr>
        </thead>
        <tbody>
          {examData.map((exam, index) => {
            const isDataAvailable = exam.secured !== null && exam.total !== null;
            const percentage = isDataAvailable ? (exam.secured / exam.total) * 100 : null;
            const isPass = percentage !== null && percentage >= 50;
            return (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {teacher && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {exam.student.name}
                </th>}
                <td className="px-6 py-4 ">{exam.exam}</td>
                <td className="px-6 py-4">{exam.secured !== null ? exam.secured : 'N/A'}</td>
                <td className="px-6 py-4">{exam.total !== null ? exam.total : 'N/A'}</td>
                <td className="px-6 py-4">{percentage !== null ? percentage.toFixed(2) : 'N/A'}</td>
                <td className={`px-6 py-4 ${isDataAvailable ? (isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : ''}`}>
                  {isDataAvailable ? (isPass ? 'Pass' : 'Fail') : 'N/A'}
                </td>
                {teacher && <td className="px-6 py-4 text-right">
                  <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
