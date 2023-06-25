import React, { createContext, useContext, useState } from 'react';
//import { Redirect } from "react-router-dom";
// import {useSelector } from "react-redux";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState();
  const [onModalClose, setOnModalClose] = useState();

  const closeModal = () => {
    setModalContent();
    if (onModalClose) {
      onModalClose();
    }
  };

  return (
    <ModalContext.Provider value={{ modalContent, setModalContent, setOnModalClose, closeModal }}>
      {children}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
