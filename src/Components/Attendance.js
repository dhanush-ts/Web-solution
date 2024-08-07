import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export const Attendance = () => {
  const navi = useNavigate();
  const [resu, setSubjects] = useState(null); // Initialize as null to handle loading state
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  useEffect(() => {
    if (!jwt) {
      navi("/");
    }
  }, [jwt, navi]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const url = `${api}student/attendance/`;

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

  const { total, present, late, absent } = resu;

  const calculatePercentage = (count) => {
    return ((count / total) * 100).toFixed(2);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Summary</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Total</span>
          <span className="text-lg font-semibold text-gray-900">{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Present</span>
          <span className="text-lg font-semibold text-green-600">{present} ({calculatePercentage(present)}%)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Late</span>
          <span className="text-lg font-semibold text-yellow-600">{late} ({calculatePercentage(late)}%)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Absent</span>
          <span className="text-lg font-semibold text-red-600">{absent} ({calculatePercentage(absent)}%)</span>
        </div>
      </div>
    </div>
  );
};
