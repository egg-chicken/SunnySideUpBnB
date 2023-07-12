import { csrfFetch } from "./csrf";
// import { ValidationError } from '../backend/utils/validation.js';

const LOAD = 'spots/LOAD';
const LOAD_ONE = 'spots/ADD_ONE';
const CREATE = 'spots/CREATE';
const UPDATE = 'spots/UPDATE';
const DELETE = 'spots/DELETE';

const load = list => ({
    type: LOAD,
    list
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

const updateOne = spot => ({
    type: UPDATE,
    spot
});

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

//View a spot's detail
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const spot = await response.json();
        // console.log('%%%%%%%%%%', spot)
        dispatch(viewOne(spot));
        // return spot;
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
export const updateSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });

    if(response.ok) {
        const updated = await response.json();
        dispatch(updated(spot));
        return updated;
    }
};

//delete a spot
export const deleteSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const { id: removeItem } = await response.json();
        dispatch(deleteOne(removeItem));
        return removeItem;
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
        case CREATE:
            newState[action.spot.id] =  action.spot;
            return newState
        case UPDATE:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        case DELETE:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
