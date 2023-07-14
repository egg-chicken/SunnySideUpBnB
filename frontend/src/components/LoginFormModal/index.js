import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // console.log('!!!!errrors:', errors)
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(() => history.pushState('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-form">
      <h1 className="login-text">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="user">
          {/* Username or Email */}
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            // required
          />
        </label>
        {errors.credential && (<p>{errors.credential}</p>)}
        <label className="password">
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        {errors.password && (<p>{errors.password}</p>)}
        <div className="button-style">
        <button className='login-button' disabled={credential.length < 4 || password.length < 6} type='submit'>Log In</button>
        </div>
        <div className="demo-center">
        <button className='demo-button' onClick={(e) => {
          setCredential('demo@user.io');
          setPassword('password');
        }}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
