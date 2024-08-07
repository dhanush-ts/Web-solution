import { useEffect, useState } from "react";

export const Feedback = ({ id, jwt }) => {
  const [resu, setRes] = useState(null); // Set initial state to null

  useEffect(() => {
    const fetchSubjects = async () => {
      const url = `http://localhost:8000/api/features/feedback/${id}/`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setRes(data);
        console.log(data);
      } catch (error) {
        console.error('There was an error with the request:', error);
      }
    };

    fetchSubjects();
  }, [id, jwt]); // Add id and jwt as dependencies

  if (!resu) {
    return <p>Loading...</p>;
  }

  return (
    <div className="feedback-container bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Overall Rating</h2>
      <div className="flex items-center mb-6">
        <span className="text-2xl font-bold">{resu.overall_rating.toFixed(1)}</span>
        <span className="ml-2 text-gray-500">/ 5</span>
      </div>
      <div className="feedback-list">
        <h3 className="text-lg font-semibold mb-2">Feedback</h3>
        {resu.feedback.map((item, index) => (
          <div
            key={index}
            className="feedback-item border-b border-gray-200 py-2"
          >
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((star, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < item.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.286a1 1 0 0 0 .95.691h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.029a1 1 0 0 0-.364 1.118l1.07 3.286c.3.921-.755 1.688-1.538 1.118l-2.8-2.029a1 1 0 0 0-1.176 0l-2.8 2.029c-.783.57-1.838-.197-1.538-1.118l1.07-3.286a1 1 0 0 0-.364-1.118L2.428 8.714c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.691l1.07-3.286z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {item.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
