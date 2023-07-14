import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch} from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import './createReview.css';

function ReviewModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');

    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (review && review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        const reviewInfo = {
            id,
            review,
            stars
        };

        setErrors(errors);

        dispatch(reviewsActions.createReview(reviewInfo))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)

            })

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
