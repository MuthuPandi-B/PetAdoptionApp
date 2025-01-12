import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Services/api';

const EditApplicationPage = () => {
  const { id } = useParams(); // Get application ID from URL
  const navigate = useNavigate();
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reason, setReason] = useState('');
 
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch application details
    const fetchApplication = async () => {
      try {
        const response = await api.get(`/applications/get/${id}`);
        const application = response.data;
        setPetName(application.petName);
        setPetBreed(application.petBreed);
        setApplicantName(application.applicantName);
        setEmail(application.email);
        setPhone(application.phone);
        setAddress(application.address);
        setReason(application.reason);
      
      } catch (error) {
        toast.error('Error fetching application details.');
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedApplication = {
        petName,
        petBreed,
        applicantName,
        email,
        phone,
        address,
        reason,
      
      };
      
      await api.put(`/applications/edit/${id}`, updatedApplication);
      toast.success('Application updated successfully.');
      setError(null);
      navigate('/application/user'); // Redirect to user's applications page
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Error updating application. Please try again.");
        toast.error("Error updating application. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Pet Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pet Breed</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Applicant Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Reason for Adoption</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
       
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Application</button>
      </form>
    </div>
  );
};

export default EditApplicationPage;
