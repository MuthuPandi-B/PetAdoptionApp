// import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const FosterFosteringPets = () => {
  const [fosterPets, setFosterPets] = useState([]);
  const [note, setNote] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFosterPets = async () => {
      try {
        const response = await api.get('/fosterpets/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFosterPets(response.data);
      } catch (error) {
        toast.error('Error fetching foster pets.');
      }
    };

    fetchFosterPets();
  }, [token]);

  const handleRequestFostering = async (id) => {
    try {
      const response = await api.post(`/fosterpets/request/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      const updatedPets = fosterPets.map(pet => 
        pet._id === id ? { ...pet, status: 'Requested' } : pet
      );
      setFosterPets(updatedPets);
    } catch (error) {
      toast.error('Error requesting fostering.');
    }
  };

  const handleUpdateCondition = async (id) => {
    try {
      const response = await api.put(`/fosterpets/note/${id}`, { note }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      setNote('');
    } catch (error) {
      toast.error('Error updating condition.');
    }
  };

  const handleRequestReturn = async (id) => {
    try {
      const response = await api.post(`/fosterpets/return/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error requesting return.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {fosterPets.length > 0 && <h1 className="text-2xl font-bold mb-4 text-center">Available Pets For Foster</h1>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fosterPets.length === 0 && <p className='text-center'>No foster pets available at the moment.</p>}
        {fosterPets.map((pet) => (
          <div key={pet._id} className="border p-4 rounded">
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p>Medical History: {pet.medicalHistory}</p>
            <p>Status: {pet.status}</p>
            {pet.status === 'Pending' ? (
              <button className="bg-yellow-500 text-white p-2 rounded mt-4" onClick={() => handleRequestFostering(pet._id)}>Request to Foster</button>
            ) : pet.status === 'In Foster Care' ? (
              <>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Update pet condition"
                ></textarea>
                <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={() => handleUpdateCondition(pet._id)}>Update Condition</button>
                <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={() => handleRequestReturn(pet._id)}>Request Return</button>
              </>
            ) : pet.status === 'Returned' ? (
              <p className="text-red-500">This pet has been returned.</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FosterFosteringPets;


