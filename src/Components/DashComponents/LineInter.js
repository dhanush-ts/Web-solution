import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
} from 'chart.js';
import { api } from '../../api';

// Register the necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
);

export const InteractionLinePlot = ({ id }) => {
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState(null);
  const jwt = JSON.parse(localStorage.getItem("jwt"));

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
  }, [id, jwt]);

  // Prepare data for the line chart
  const data = {
    labels: interactions.map(item => new Date(item.created_at).toLocaleDateString()), // Use .toLocaleDateString() for simpler date formatting
    datasets: [
      {
        label: 'Rating',
        data: interactions.map(item => item.rating),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Ratings Over Time'
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Rating'
        }
      }
    }
  };

  return (
    <div style={{ width: '500px', height: '400px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      {interactions.length > 0 && (
        <Line data={data} options={options} />
      )}
    </div>
  );
};
