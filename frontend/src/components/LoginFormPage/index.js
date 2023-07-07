import React from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
      };

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
                <div className="group-inputs">
                <label className="user">
                    {/* Username or Email */}
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className="password">
                    {/* Password */}
                    <input
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                </div>
                {errors.credential && <p>{errors.credential}</p>}
                <div className="size-button">
                <button className='login-button' type='submit'>Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LoginFormPage;
