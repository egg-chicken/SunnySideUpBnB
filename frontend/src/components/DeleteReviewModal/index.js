import React, { useState } from "react";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { Modal } from '../../context/Modal';

function DeleteReviewModal ({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const reviews = useSelector((state) => Object.values(state.reviews));

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewsActions.deleteReview(id))//change
            .then(closeModal)
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Yes (Delete Review)</button>
                <button onClick={closeModal}>No (Keep Review)</button>
            </form>
        </>


    )
}
export default DeleteReviewModal;
