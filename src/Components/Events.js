import React, { useEffect, useState } from 'react';
import { api } from '../api';

export const Events = () => {
  const [title, setTitle] = useState('');
  const [sta, setSta] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');

  const id = JSON.parse(localStorage.getItem("jwt"));

    const [resu, setRes] = useState([]);

    useEffect(() => {

        const fetchSubjects = async () => {
          const url = `${api}features/events/`;
    
          try {
            const res = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${id}`,
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
      }, [id]);
    
      if (!resu) {
        return <p>Loading...</p>;
      }

      const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('default', options);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, date, description, year, department };
// onAddEvent(newEvent);

    try {
      const response = await fetch(`${api}features/events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${id}`
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Event added successfully:', result);
      // Optionally, clear the form after successful submission
      setTitle('');
      setDate('');
      setDescription('');
      setYear('');
      setSta("Success")
      setDepartment('');
    } catch (error) {
      console.error('There was an error with the request:', error);
    }
  };

  return (
    <div>

<ol className="relative border-l border-gray-200 dark:border-gray-700">
      {resu.map(event => (
        <li key={event.id} className="mb-4 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 mt-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(event.date)}</time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{event.description}</p>
        </li>
      ))}
    </ol>

    <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6">Add New Event</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          className="w-full mt-1 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full mt-1 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Year</label>
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Department</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Event
      </button>

      <p>{sta}</p>
    </form>

    </div>
  );
};

