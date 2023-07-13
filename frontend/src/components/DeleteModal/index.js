import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
// import { useModal } from "../../context/Modal";
import { Modal } from '../../context/Modal';

function DeleteModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();
  const [showModal, setShowModal] = useState(false)


  const deleteHandler = async () => {
    const deleted = dispatch(sessionActions.deleteSpot(spot.id))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

    if(deleted) history.push('/spots/current');
  };

  return (
    <>
        <button onClick={(e) => { setShowModal(true)}}>Delete</button>
        {showModal && (
            <>
            <Modal  onClose={() => setShowModal(false)}>
                <div>
                    <h1>Confirm Delete</h1>
                    {errors.length > 0 && <p className="errors">{errors}</p>}
                    <div>Are your sure you want to remove this spot from the listings?</div>
                    <button onClick={deleteHandler}>Yes (Delete Spot)</button>
                    <button onClick={(e) => setShowModal(false)}>No (Keep Spot)</button>
                </div>

            </Modal>
            </>
        )}

    </>
  );
}

export default DeleteModal;
