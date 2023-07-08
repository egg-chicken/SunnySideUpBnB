import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
// import React from "react";
// import { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import * as sessionActions from '../../store/session';
// import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// const LoginFormModal = () => {
//     const [credential, setCredential] = useState('');
//     const [password, setPassword] = useState('');

//     const [errors, setErrors] = useState({});

//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);
//     const history = useHistory();
//     const { closeModal } = useModal();

//     if (sessionUser) return <Redirect to="/" />;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors({});
//         return dispatch(sessionActions.login({ credential, password }))
//             .then(closeModal)
//             .then(() => history.push('/'))
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) setErrors(data.errors);
//             }
//         );
//       };

//     return (
//         <>
//             <h1>Log In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username or Email
//                     <input
//                         type="text"
//                         value={credential}
//                         onChange={(e) => setCredential(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Password
//                     <input
//                         type='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.credential && <p>{errors.credential}</p>}
//                 <button type='submit'>Log In</button>
//             </form>
//         </>
//     )
// }

// export default LoginFormModal;
