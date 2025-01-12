import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';

const AdopterAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        toast.error('Error fetching appointments.');
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
     {appointments.length > 0 && <h1 className="text-3xl font-bold mb-4">Your Appointments</h1>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {appointments.length === 0 && <p>No appointments found.</p>}
        {appointments.map((appointment) => (
          <div key={appointment._id} className="border p-4 rounded">
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Time: {appointment.time}</p>
            <p>Message: {appointment.message}</p>
            <p>Status: {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdopterAppointments;
