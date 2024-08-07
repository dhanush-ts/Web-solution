import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export const LP = () => {

  const sub_id = useParams("id")
  const id = JSON.parse(localStorage.getItem("jwt"))
  const [ resu, setSubjects] = useState([]);

  useEffect(() => {

    const fetchSubjects = async () => {
      const url = `${api}student/material/${sub_id.id}/`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${id}`,
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

  }, [id,sub_id]);
  if (!resu) {
    return <p>Loading...</p>;
  }

  console.log(resu)


  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Learning Files</h2>
      {resu.map((file, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-lg">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a6 6 0 0 1 6 6v3h-3a3 3 0 0 0-3 3v3H6v-3a3 3 0 0 0-3-3H0V8a6 6 0 0 1 6-6h6m0-2H6a8 8 0 0 0-8 8v3a5 5 0 0 0 5 5v3a2 2 0 0 0 2 2h7v3h2v-3h7v3h2v-3a2 2 0 0 0 2-2v-3a5 5 0 0 0 5-5V8a8 8 0 0 0-8-8z" />
              </svg>
            </div>
            <div className="ml-4">
              <a
                href={file.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                Download File
              </a>
              <p className="text-gray-500">Category: {file.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
