import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
const CREATE_SPOT = 'spots/CREATE';
const UPDATE_SPOT = 'spots/UPDATE';
const DELETE_SPOT = 'spots/DELETE';

const load = list => ({
    type: LOAD_SPOTS,
    list
});

const loadUser = spots => ({
    type: LOAD_USER_SPOTS,
    spots
});

const viewOne = spot => ({
    type: LOAD_ONE_SPOT,
    spot
});

const createOne = spot => ({
    type: CREATE_SPOT,
    spot
});

const deleteOne = id => ({
    type: DELETE_SPOT,
    id
});

const updateOne = spot => ({
    type: UPDATE_SPOT,
    spot
});


//get the list of ALL Spots thunk
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        return list;
    }
};

//get all the current user's spots
export const getCurrentSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok){
        const spots = await response.json();
        dispatch(loadUser(spots));
        // return spots;
    }
}

//View a spot's detail
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const spot = await response.json();
        dispatch(viewOne(spot));
        return spot;
    }
};

//create a spot
export const createSpot = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });

    if(response.ok){

        const data = await response.json();

        const previewRes = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: spot.url, preview: true})
        })

        spot.spotImages.forEach(async (image) => {
            const imageRes = await csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: image, preview: false})
            });

        })

        dispatch(createOne(data))
        return data;
    }
};

//update a spot
export const updateSpot = (id, spotInfo) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotInfo)
    });

    if(response.ok) {
        const updated = await response.json();
        dispatch(updateOne(updated));
        return updated;
    }
};

//delete a spot
export const deleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        return dispatch(deleteOne(id));
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};

            action.list.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });

            return {
                ...allSpots
            }
        case LOAD_ONE_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot};
            return newState
        case LOAD_USER_SPOTS:
            const user = {};
            action.spots.Spots.forEach((spot) => {
                user[spot.id] = spot;
            })
            return user
        case CREATE_SPOT:
            newState[action.spot.id] =  action.spot;
            return newState
        case UPDATE_SPOT:
            newState[action.spot.id] = action.spot;
            return newState
        case DELETE_SPOT:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
};

export default spotsReducer;
