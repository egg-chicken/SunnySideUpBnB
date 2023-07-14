import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch} from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import './createReview.css';

function ReviewModal() {
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState('');

    const { closeModal } = useModal();

    const handleSubmit = (e) => {

        e.preventDefault();

        if (review.length < 10 || stars === 0) {
            setError('Please enter a comment with at least 10 characters and select a rating.');
            return;
        }

        dispatch(reviewsActions.createReview())



        // const newReview = {
        //     comment,
        //     rating,
        //     user: currentUser,
        // };

        // const updatedReviews = [newReview, ...reviews];

        // setSuccessMessage('Review successfully created.');

        // setComment('');
        // setRating(0);
        // setError('');

    }
    return (
        <>
            <h2>How was your stay?</h2>
            <form>
            <textarea
                value={review}
                placeholder='Leave your review here . . .'
                onChange={(e) => setReview(e.target.value)}
            />
            <label>
                Stars:
            <input
              type="number"
              min={1}
              max={5}
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
            />
          </label>
          <button onClick={handleSubmit} disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
          </form>
        </>
    )
}

export default ReviewModal;
