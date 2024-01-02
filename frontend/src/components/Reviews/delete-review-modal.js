import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewsActions from "../../store/reviews";

function DeleteReviewModal ({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewsActions.deleteReview(id))
            .then(closeModal)
    };

    return (
        <>
            <div className="login-form">
            <h2 className="login-text">Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <form onSubmit={handleSubmit}>
                <button className='create-button' type='submit'>Yes (Delete Review)</button>
                <button className='keep-button delete-style' onClick={closeModal}>No (Keep Review)</button>
            </form>
            </div>
        </>


    )
}

export default DeleteReviewModal;
