// import React, { createContext, useContext, useState } from 'react';
// //import { Redirect } from "react-router-dom";
// // import {useSelector } from "react-redux";

// const ModalContext = createContext();

// export function ModalProvider({ children }) {
//   const [modalContent, setModalContent] = useState();
//   // const [onModalClose, setOnModalClose] = useState();

//   const closeModal = () => {
//     setModalContent();
//     // if (onModalClose) {
//     //   onModalClose();
//     // }
//   };

//   return (
//     <ModalContext.Provider value={{ modalContent, setModalContent }}>
//       {children}
//       {modalContent && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             {modalContent}
//           </div>
//         </div>
//       )}
//     </ModalContext.Provider>
//   );
// }

// export function useModal() {
//   return useContext(ModalContext);
// }
// import { useState } from reactRouterDom;
// import { createPortal } from "react-dom";
//import ModalContent from './ModalContent'
import React, { useContext, useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';

const ModalContext = React.createContext()

  export function ModalProvider({children}) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
      setValue(modalRef.current);
    }, [])

    return (
      <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}/>
      </>
    )
  }
  export function Modal({ onClose, children }){
    const modalNode = useContext(ModalContext);
    if(!modalNode) return null;

    return ReactDOM.createPortal(
      <div id='modal'>
        <div id='modal-background' onClick={onClose} />
          <div id='modal-content'>
            {children}
          </div>
        </div>,
      modalNode
    )
  }
