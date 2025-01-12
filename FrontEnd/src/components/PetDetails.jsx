import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { toast } from 'react-toastify';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
 const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data);
        checkIfFavorite(response.data._id);
      } catch (error) {
        toast.error('Error fetching pet details.');
      }
    };

    const checkIfFavorite = async (petId) => {
      try {
        const response = await api.get('/favorites');
        const favoritePets = response.data.map(fav => fav.pet._id);
        setIsFavorite(favoritePets.includes(petId));
      } catch (error) {
        toast.error('Error checking favorites.');
      }
    };

   

    fetchPet();
   
  }, [id, userId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/pets/delete/${id}`);
      toast.success('Pet deleted successfully.');
      setError(null);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = () => {
    navigate(`/pets/edit/${id}`);
  
  
  };

  const handleContact = () => {
    navigate(`/contact`);
  };

  const handleAdopt = async () => {
     try { const response = await api.post(`/pets/adopt/${pet._id}`);
      toast.success(response.data.message);
     } catch (error) {
       toast.error("Error submitting adoption request");
       }
      };

  const handleAddToFavorites = async () => {
    try {
      await api.post('/favorites/add', { petId: id });
      toast.success('Pet added to favorites successfully.');
      setIsFavorite(true);
    } catch (error) {
      toast.error('Error adding pet to favorites.');
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await api.post('/favorites/remove', { petId: id });
      toast.success('Pet removed from favorites successfully.');
      setIsFavorite(false);
    } catch (error) {
      toast.error('Error removing pet from favorites.');
    }
  };
  


  if (!pet) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{pet.petName}</h1>
      {pet.media && (
        <div className="mb-4">
          {pet.media.endsWith('.mp4') ? (
            <video controls className="w-full h-60 object-cover mb-2">
              <source src={pet.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={pet.media}
              alt={pet.petName}
              className="w-60 h-60 object-cover mb-2"
            />
          )}
        </div>
      )}
      <p>Size: {pet.petSize}</p>
      <p>Colour: {pet.petColour}</p>
      <p>Age: {pet.petAge}</p>
      <p>Breed: {pet.petBreed}</p>
      <p>Gender: {pet.petGender}</p>
      <p>Medical History: {pet.petMedicalhistory}</p>
      <p>Location: {pet.petLocation}</p>
      {role === 'shelter' && (
        <>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
      {/* {role === 'foster' && (
        <>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => navigate('/fostering')}
          >
            Foster
          </button>
        </>
      )} */}
      {role === 'adopter' && (
        <>
          {isFavorite ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleRemoveFromFavorites}
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </button>
          )}
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2" onClick={handleContact}>
            Contact
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2" onClick={handleAdopt}>
            Adopt
          </button>
        </>
      )}
    </div>
  );
};

export default PetDetail;
