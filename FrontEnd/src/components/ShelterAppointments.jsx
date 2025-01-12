import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';

const ShelterAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        toast.error('Error fetching appointments.');
      }
    };

    fetchAppointments();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await api.put(`/appointments/status/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      // Update the appointments list with the new status
      const updatedAppointments = appointments.map(appointment => 
        appointment._id === id ? { ...appointment, status } : appointment
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      toast.error('Error updating appointment status.');
    }
  };

  const filteredAppointments = filter === 'All'
    ? appointments
    : appointments.filter(appointment => appointment.status === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Appointments</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Status</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAppointments.length === 0 && <p>No appointments found.</p>}
        {filteredAppointments.map((appointment) => (
          <div key={appointment._id} className="border p-4 rounded">
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Time: {appointment.time}</p>
            <p>Message: {appointment.message}</p>
            <p>Status: {appointment.status}</p>
            <p>Adopter: {appointment.user.name}</p>
            <button
              className="bg-green-500 text-white p-2 rounded mt-4"
              onClick={() => handleStatusChange(appointment._id, 'Confirmed')}
            >
              Confirm
            </button>
            <button
              className="bg-blue-500 text-white p-2 rounded mt-4 ml-2"
              onClick={() => handleStatusChange(appointment._id, 'Completed')}
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShelterAppointments;
