import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';
import { Link } from 'react-router-dom';

const UserApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/user');
      setApplications(response.data);
    } catch (error) {
      toast.error('Error fetching applications.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/delete/${id}`);
      toast.success('Application deleted successfully.');
      fetchApplications(); // Refresh applications
    } catch (error) {
      toast.error('Error deleting application.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Applications</h1>
      {applications.length === 0 && <p>No applications found.</p>}
      {applications.map((application) => (
        <div key={application._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-bold">Application for {application.petName}</h2>
          <p>Status: {application.status}</p>
         
          {application.status === 'Rejected' && (
            <p><strong>Rejection Reason:</strong> {application.reason}</p>
          )}
          {application.status === 'Approved' && (
            <p><strong>Approval Reason:</strong> {application.shelternotes}</p>
          )}
          {application.status === 'Additional Information Needed' && (
            <p><strong>Additional Info Message:</strong> {application.reason}</p>
          )}
          {application.status === 'Meet-and-Greet Scheduled' && (
            <>
              <p><strong>Meet-and-Greet Date:</strong> {new Date(application.meetAndGreetDate).toLocaleDateString()}</p>
              <p><strong>Meet-and-Greet Time:</strong> {application.meetAndGreetTime}</p>
            </>
          )}
          <Link to={`/application/edit/${application._id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2">Edit</Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => handleDelete(application._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserApplicationsPage;
