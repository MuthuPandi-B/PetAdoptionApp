import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getFilteredPets } from "../Services/api";
import CustomSlider from "../components/Slider";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [filterType, setFilterType] = useState("breed"); 
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await api.get("/pets"); 
      setPets(response.data);
    } catch (error) {
      toast.error("Error fetching pets.");
    }
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filters = { [filterType]: filterValue }; 
    try {
      const filteredPets = await getFilteredPets(filters);
      setPets(filteredPets);
    } catch (error) {
      toast.error("Error fetching pets.");
    }
  };

  const handleViewDetails = (petId) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/pets/${petId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-grey-500">
      <div className="mb-4 flex justify-center items-center">
        <CustomSlider />
      </div>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <select
            onChange={handleFilterTypeChange}
            value={filterType}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="breed">Breed</option>
            <option value="age">Age</option>
            <option value="size">Size</option>
            <option value="location">Location</option>
          </select>
          <input
            type="text"
            placeholder={`Enter ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto flex-grow"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full sm:w-auto">
            Search
          </button>
        </div>
      </form>
     {pets.length > 0 && <h2 className="text-2xl font-semibold mb-4">Available Pets</h2>}
      {pets.length === 0 ? (
        <div className="text-center text-gray-600">
          {role === "adopter" ? (
            <>
              <p>Currently, no pets are available for adoption.</p>
              <p>Create an application for your desired pet or wait for some time.</p>
              <Link to="/createApplication" className="text-blue-500 hover:underline">
                Create Application
              </Link>
            </>
          ) : (
            <p>Currently, no pets are available for adoption.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white p-4 rounded shadow">
              <img
                src={pet.media}
                alt={pet.petName}
                className="w-80 h-80 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold"> {pet.petName}</h2>
              <p className="text-gray-600">Breed: {pet.petBreed}</p>
              <p className="text-gray-600">Age: {pet.petAge}</p>
              <p className="text-gray-600">Size: {pet.petSize}</p>
              <p className="text-gray-600">Location: {pet.petLocation}</p>
              <button
                onClick={() => handleViewDetails(pet._id)}
                className="text-blue-500 hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
