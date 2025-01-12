import React, { useState, useEffect } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (error) {
      toast.error('Error fetching favorites.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Favorite Pets</h1>
      {favorites.length === 0 && <p>No favorites found.</p>}
      {favorites.map((favorite) => (
        <div key={favorite.pet._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-bold">{favorite.pet.petName}</h2>
          <p>Breed: {favorite.pet.petBreed}</p>
          <Link to={`/pets/${favorite.pet._id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FavoritePage;
