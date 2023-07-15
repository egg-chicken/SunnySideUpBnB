import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import './createReview.css';

function ReviewModal({id}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if (review && review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        const payload = {
            id,
            review,
            stars
        };

        // console.log('!!!!REVIEW!!!!!', payload)

        setErrors(errors);

        dispatch(reviewsActions.createReview(payload))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)

            })

    }

    return (
        <>
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    placeholder='Leave your review here . . .'
                    onChange={(e) => setReview(e.target.value)}
                />
                <div className='star-rating'>
                    {[1, 2, 3, 4, 5].map((star, index) => {
                        index += 1
                        return (
                            <button
                                type = 'button'
                                key={index}
                                className={index <= (hover || stars ? 'star-button on' : 'star-button off')}
                                onClick={() => setStars(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(index)}
                            >
                                 {/* <i className="fa-regular fa-star"/> */}
                                 &#9733;
                            </button>
                        )
                    })}
                    <p>Stars</p>
                </div>

                <button onClick={handleSubmit} disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
          </form>
        </>
    )
}

export default ReviewModal;
