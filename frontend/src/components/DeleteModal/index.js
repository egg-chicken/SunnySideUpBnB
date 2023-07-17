import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotsActions from "../../store/spots";
import './deleteModal.css'

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
        <div className="login-form">
            <h2 className="login-text">Confirm Delete</h2>
            <p>Are your sure you want to remove this spot from the listings?</p>
            <form onSubmit={handleSubmit}>
                <button className='create-button' type='submit'>Yes (Delete Spot)</button>
                <button className='keep-button' onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </div>
        </>
    )
    }

export default DeleteModal;
