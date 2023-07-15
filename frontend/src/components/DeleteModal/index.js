import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotsActions from "../../store/spots";

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
