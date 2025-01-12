import React from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const ReviewPage = () => {
  const userRole = localStorage.getItem('role'); // Fetch user role from local storage

  const handleReviewAdded = () => {
    // Refresh reviews or perform any necessary actions when a review is added
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reviews</h1>
      {userRole === 'adopter' && <ReviewForm onReviewAdded={handleReviewAdded} />}
      <ReviewList />
    </div>
  );
};

export default ReviewPage;
