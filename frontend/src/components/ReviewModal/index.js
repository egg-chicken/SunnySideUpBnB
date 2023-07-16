import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import './createReview.css';

function ReviewModal({id, setIsVisible}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const { closeModal } = useModal();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if (review && review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        // if (Object.keys(errors).length > 0) {
        //     setErrors(errors);
        //     return;
        // }

        const payload = {
            id,
            review,
            stars
        };

        // console.log('!!!!REVIEW!!!!!', payload)

        setErrors(errors);

        dispatch(reviewsActions.createReview(payload))
            .then(closeModal)
            .then(() => setIsVisible(false))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)

            });
            return setErrors({
                review: 'Review already exists for this spot'
              })

    }

    const handleButton = e => {
        setReview(e.target.value)
        setIsDisabled(e.target.value.length < 10 || stars === 0);
    }

    return (
        <>
            <div className='parent-review'>
                <h2>How was your stay?</h2>
                {errors && errors.review && <p className="error">{errors.review}</p>}
                {errors && errors.stars && <p className="error">{errors.stars}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={review}
                        placeholder='Leave your review here . . .'
                        onChange={handleButton}
                        // onChange={(e) => setReview(e.target.value)}
                    />
                    <div className='star-rating-container'>
                        {[1, 2, 3, 4, 5].map((star, index) => {
                            index += 1
                            return (
                                <button
                                    type = 'button'
                                    key={index}
                                    id={`star-${index}`}
                                    className={index <= (hover || stars) ? 'star-button on' : 'star-button off'}
                                    onClick={() => setStars(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(index)}
                                >
                                    <span className='star-symbol'>&#9733;</span>
                                </button>
                            )
                        })}
                        <label htmlFor='star-ratings' className='star-name'>Stars</label>
                    </div>

                    <button type='submit'
                            onClick={handleSubmit}
                            // disabled={review.length < 10 || stars === 0}
                            // className='submit-button'
                            className={`submit-button ${isDisabled ? 'accent': ''}`}
                    >
                                Submit Your Review
                    </button>
            </form>
          </div>
        </>
    )
}

export default ReviewModal;
