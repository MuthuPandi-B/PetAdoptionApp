import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../Services/api';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      setReviews(response.data);
    } catch (error) {
      toast.error('Error fetching reviews.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/delete/${id}`);
      toast.success('Review deleted successfully.');
      fetchReviews();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
  
      {reviews.length === 0 && <p>No reviews found.</p>}
      {reviews.map((review) => (
        <div key={review._id} className="border p-4 rounded mb-4 shadow-md">
          <h3 className="text-xl font-semibold">User:  {review.user.name}</h3>
          <div className="flex items-center mb-2">
            <span className="mr-2">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((star, index) => (
                <svg key={index} className={`w-6 h-6 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967c.152.468.57.794 1.065.794h4.168c.969 0 1.371 1.24.588 1.81l-3.357 2.44c-.393.285-.57.78-.45 1.27l1.286 3.967c.3.921-.755 1.688-1.541 1.168l-3.357-2.44c-.393-.285-.928-.285-1.321 0l-3.357 2.44c-.787.52-1.841-.247-1.541-1.168l1.286-3.967c.12-.49-.057-.985-.45-1.27L2.15 9.498c-.783-.57-.38-1.81.588-1.81h4.168c.495 0 .913-.326 1.065-.794l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="mb-2"><strong>Comment:</strong> {review.comment}</p>
          <p className="mb-2"><strong>Type:</strong> {review.reviewType === 'pet' ? 'Pet' : 'Shelter'} Review</p>
          {(review.user._id === localStorage.getItem('userId') || localStorage.getItem('role') === 'shelter') && (
            <button onClick={() => handleDelete(review._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
