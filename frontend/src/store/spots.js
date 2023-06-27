import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD'

const load = list => ({
    type: LOAD,
    list
});

//get the list of All Spots thunk
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        return list;
    }
}

const initialState = { list: []}
// const initialState = {}

const spotsReducer = (state = initialState, action) => {
    //let newState;
    //let newState = {...state}
    switch (action.type) {
        case LOAD:
            const allSpots = {};

            action.list.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            //newState = {...allSpots, ...state}
            // return {
            //     ...allSpots,
            //     ...state
            // }
            //return newState

            return allSpots;
        default:
            return state;
    }
}

export default spotsReducer;
