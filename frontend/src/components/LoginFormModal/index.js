import React, { useState } from "react";
import LoginFormPage from "../LoginFormPage";
//import { useSelector } from "react-redux";
//import { Redirect, useHistory } from "react-router-dom";
//import * as sessionActions from '../../store/session';

import { Modal } from "../../context/Modal";

function LoginFormModal({onButtonClick}) {
    const [showModal, setShowModal] = useState(false);
    //const session= useSelector(sessionActions);
    //const history = useHistory();

    //if(session) return <Redirect to='/' />;

    // const onClickHandler = () => {
    //     setShowModal(true);
    //     onButtonClick();
    // }
    return (
        <>
        <button onClick={() => {setShowModal(true)
        onButtonClick()}}>Log In</button>
        {showModal && (
            <Modal onClose={() => {
                setShowModal(false);
            }} >
                <LoginFormPage/>
            </Modal>
        )}
        </>
    );

}

export default LoginFormModal
