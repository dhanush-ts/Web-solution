import { ExamRow } from "../Components/ExamRow"

export const TimeTable = ({ examData, teacher }) => {

  // const [examData, setExamData] = useState(ed);

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
              <ExamRow index={index} isDataAvailable={isDataAvailable} percentage={percentage} exam={exam} teacher={teacher} isPass={isPass} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
