import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';

const ShelterFosteringPets = () => {
  const [fosterPets, setFosterPets] = useState([]);
  const [filter, setFilter] = useState('All');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFosterPets = async () => {
      try {
        const response = await api.get('/fosterpets/shelter', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFosterPets(response.data);
      } catch (error) {
        toast.error('Error fetching foster pets.');
      }
    };

    fetchFosterPets();
  }, [token]);

  const handleAcceptRequest = async (id) => {
    try {
      const response = await api.post(`/fosterpets/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      const updatedPets = fosterPets.map(pet => 
        pet._id === id ? { ...pet, status: 'In Foster Care' } : pet
      );
      setFosterPets(updatedPets);
    } catch (error) {
      toast.error('Error accepting fostering request.');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handledelete = async (id) => {
    try {
      const response = await api.delete(`/fosterpets/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      const updatedPets = fosterPets.filter(pet => pet._id !== id);
      setFosterPets(updatedPets);
    } catch (error) {
      toast.error('Error deleting pet.');
    }
  };

  const filteredPets = filter === 'All'
    ? fosterPets
    : fosterPets.filter(pet => pet.status === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Foster Pets</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Status</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mt-1"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Requested">Requested</option>
          <option value="In Foster Care">In Foster Care</option>
          <option value="Returned">Returned</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPets.length === 0 && <p>No pets found.</p>}
        {filteredPets.map((pet) => (
          <div key={pet._id} className="border p-4 rounded">
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Medical History: {pet.medicalHistory}</p>
            <p>Status: {pet.status}</p>
            {pet.status === 'Requested' && (
              <button className="bg-green-500 text-white p-2 rounded mt-4" onClick={() => handleAcceptRequest(pet._id)}>Accept Request</button>
            )}
            {pet.status === 'In Foster Care' && (
              <>
                <h3 className="text-xl font-bold mt-4">Foster's Notes</h3>
                <p>{pet.notes}</p>
              </>
            )}
              {(pet.status === 'Returned' || pet.status === 'Pending')&&  (
              <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={() => handledelete(pet._id)}>Delete Pet</button>
            )}
          </div>
          
        ))}
     
      </div>
    </div>
  );
};

export default ShelterFosteringPets;
