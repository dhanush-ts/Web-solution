import React, { useEffect, useState } from 'react';

export const Interactions = ({ id,jwt }) => {
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/features/interaction/${id}/`, {
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
    <div>
      {interactions.length === 0 ? (
        <p>No interactions found.</p>
      ) : (
        <ul>
          {interactions.map((interaction, index) => (
            <li key={index} className="mb-2">
              <p><strong>Time:</strong> {new Date(interaction.created_at).toLocaleString()}</p>
              <p><strong>Rating:</strong> {interaction.rating * 10}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

