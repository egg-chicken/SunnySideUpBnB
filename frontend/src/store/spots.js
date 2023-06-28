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
        console.log('!!!!!!!!!!!!!!!!', list)
        dispatch(load(list));
        return list;
    }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD:
            const allSpots = {};

            action.list.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });

            return {
                ...allSpots,
                ...state
            }

        default:
            return state;
    }
}

export default spotsReducer;
