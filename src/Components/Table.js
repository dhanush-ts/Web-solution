import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export const Table = () => {

  const navi = useNavigate();
  const [resu, setSubjects] = useState([]);
  const jwt = JSON.parse(localStorage.getItem("jwt"))

  useEffect(() => {
    if (!jwt) {
      navi("/");
    }
  }, [jwt, navi]);

  useEffect(() => {

    const fetchSubjects = async () => {
      const url = `${api}features/timetable/`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error('There was an error with the request:', error);
      }
    };

    fetchSubjects();

  }, [jwt]);
  if (!resu) {
    return <p>Loading...</p>;
  }

  console.log(resu);

  const formatTimeRange = (startTime, durationInHours) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const start = new Date();
    start.setHours(startHour, startMinute, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + Math.floor(durationInHours), start.getMinutes() + (durationInHours % 1) * 60);

    const formatTime = (date) => date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const sortedResu = [...resu].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return (timeA[0] - timeB[0]) || (timeA[1] - timeB[1]);
  });

  return   (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Timetable</h1>
      <div className="grid gap-6">
        {sortedResu.map((period, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{period.subject.title}</h2>
                <p className="text-gray-600">{period.subject.code}</p>
                <p className="text-gray-600">
                  {`Year ${period.subject.klass.year} ${period.subject.klass.department} ${period.subject.klass.section}`}
                </p>
                <p className="text-gray-600">{period.subject.staff.name}</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {formatTimeRange(period.time, 1.5)}
                </p>
                <p className="text-gray-600">1.5 hours</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
