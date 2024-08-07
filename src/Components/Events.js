import React, { useState } from 'react';
import { api } from '../api';

export const Events = () => {
  const [title, setTitle] = useState('');
  const [sta, setSta] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');

  const id = JSON.parse(localStorage.getItem("jwt"));

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
  );
};

