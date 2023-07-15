import React, { useState } from "react";
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
// import { Modal } from '../../context/Modal';

function DeleteModal({id}) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(spotsActions.deleteSpot(id))
            .then(closeModal)
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are your sure you want to remove this spot from the listings?</p>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </>
    )
    }

export default DeleteModal;
