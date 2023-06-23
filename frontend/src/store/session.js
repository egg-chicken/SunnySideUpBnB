//This file will contain all the actions specific to the session user's information and the session user's Redux reducer.
import { csrfFetch } from "./csrf";

//Action types:
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

//Action creators:
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

const initialState = { user: null };

export default function sessionReducer(state = initialState, action){
    let newState;
    switch(action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState
        default:
            return state;
    }
}
