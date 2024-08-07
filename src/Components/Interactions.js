import React, { useEffect, useState } from 'react';
import { api } from '../api';

export const Interactions = ({ id,jwt }) => {
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await fetch(`${api}features/interaction/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInteractions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInteractions();
  }, [id,jwt]);

  console.log(interactions)

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
      {interactions.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">No interactions found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {interactions.map((interaction, index) => (
            <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  <strong>Time:</strong> {new Date(interaction.created_at).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Rating:</strong> {interaction.rating * 10}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

