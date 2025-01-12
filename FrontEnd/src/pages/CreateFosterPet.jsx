import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { toast } from 'react-toastify';

const CreateFosterPet = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get role from localStorage
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    if (role !== 'shelter') {
      toast.error('You do not have permission to create a foster pet.');
      navigate('/'); // Redirect to home if the user is not a shelter
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/fosterpets/create', { name, breed, age, medicalHistory }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      navigate('/fosterpets'); // Redirect to foster pets list
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Foster Pet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Breed</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Medical History</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateFosterPet;
