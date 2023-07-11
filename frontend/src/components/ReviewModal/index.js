import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import './createReview.css';

function createReview() {
    const [comment, setComment] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = () => {
        if (comment.length < 10 || rating === 0) {
          setError('Please enter a comment with at least 10 characters and select a rating.');
          return;
        }

        const newReview = {
            comment,
            rating,
            user: currentUser,
        };

        const updatedReviews = [newReview, ...reviews];

        setSuccessMessage('Review successfully created.');

        setComment('');
        setRating(0);
        setError('');

    }
    return (
        <>
            <h2>How was your stay?</h2>
            <textarea
                value={comment}
                placeholder='Leave your review here . . .'
                onChange={(e) => setComment(e.target.value)}
            />
            <label>
                Stars:
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </label>
          <button onClick={handleSubmit} disabled={comment.length < 10 || rating === 0}>Submit Your Review</button>
        </>
    )
}

export default createReview;
