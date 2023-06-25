import React, { useState } from "react";

function OpenModalButton({ buttonText, modalComponent }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={openModal}>{buttonText}</button>
      {showModal && modalComponent && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close-button">
              <i className="fas fa-times" />
            </button>
            {modalComponent}
          </div>
        </div>
      )}
    </>
  );
}

export default OpenModalButton;
