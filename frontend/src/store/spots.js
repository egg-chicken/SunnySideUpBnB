import { csrfFetch } from "./csrf";
// import { ValidationError } from '../backend/utils/validation.js';

const LOAD = 'spots/LOAD';
const LOAD_ONE = 'spots/ADD_ONE';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
const CREATE = 'spots/CREATE';
const UPDATE = 'spots/UPDATE';
const DELETE = 'spots/DELETE';

const load = list => ({
    type: LOAD,
    list
});

const loadUser = spots => ({
    type: LOAD_USER_SPOTS,
    spots
});

const viewOne = spot => ({
    type: LOAD_ONE,
    spot
});

const createOne = spot => ({
    type: CREATE,
    spot
});

const deleteOne = spot => ({
    type: DELETE,
    spot
});

// const updateOne = spot => ({
//     console.log('updatedaction!!!!', spot)
//     type: UPDATE,
//     spot
// });
const updateOne = spot => {
    return {
    type: UPDATE,
    spot
    }
};

//get the list of All Spots thunk
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
        const list = await response.json();
        console.log('!!!!!!!!!!!!!!!!', list)
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
        return spots;
    }
}

//View a spot's detail
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const spot = await response.json();
        // console.log('%%%%%%%%%%', spot)
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
    // console.log('!!!!!Updating spot:!!!', spot);
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotInfo) //spot.id
    });

    if(response.ok) {
        const updated = await response.json();
        console.log('UPDATEDDDDDDD', updated)
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
        // const remove = await response.json();
        return dispatch(deleteOne(id));
        // return remove;
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD:
            const allSpots = {};

            action.list.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });

            return {
                ...allSpots
            }
        case LOAD_ONE:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot};
            return newState
        case LOAD_USER_SPOTS:
            const user = {};
            action.spots.Spots.forEach((spot) => {
                user[spot.id] = spot;
            })
            return user
        case CREATE:
            newState[action.spot.id] =  action.spot;
            return newState
        case UPDATE:
            newState[action.spot.id] = action.spot;
            return newState
        case DELETE:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
};

export default spotsReducer;
