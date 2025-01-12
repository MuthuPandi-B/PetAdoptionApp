import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const ReviewForm = ({ onReviewAdded }) => {
  const [petRating, setPetRating] = useState(0);
  const [petComment, setPetComment] = useState('');
  const [shelterRating, setShelterRating] = useState(0);
  const [shelterComment, setShelterComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews/create', { rating: petRating, comment: petComment, reviewType: 'pet' });
      await api.post('/reviews/create', { rating: shelterRating, comment: shelterComment, reviewType: 'shelter' });
      toast.success('Review added successfully.');
      onReviewAdded();
      setPetRating(0);
      setPetComment('');
      setShelterRating(0);
      setShelterComment('');
    } catch (error) {
      toast.error('Error adding review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2">Rating for Pet:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setPetRating(star)}
              className={`cursor-pointer ${petRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-lg font-semibold mb-2">Comment for Pet:</label>
        <textarea
          value={petComment}
          onChange={(e) => setPetComment(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-lg font-semibold mb-2">Rating for Shelter:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setShelterRating(star)}
              className={`cursor-pointer ${shelterRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-lg font-semibold mb-2">Comment for Shelter:</label>
        <textarea
          value={shelterComment}
          onChange={(e) => setShelterComment(e.target.value)}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
