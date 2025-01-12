import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const CreateAppointmentPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/appointments/schedule', { date, time, message });
      toast.success(response.data.message);
      setDate('');
      setTime('');
      setMessage('');
    } catch (error) {
      toast.error('Error scheduling appointment.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Schedule an Appointment</h1>
      <form onSubmit={handleSchedule}>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Schedule</button>
      </form>
    </div>
  );
};

export default CreateAppointmentPage;
