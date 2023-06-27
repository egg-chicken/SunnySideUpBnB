import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD'

const load = list => ({
    type: LOAD,
    list
});

//get the list of All Spots thunk
export const getSpots = () => async dispatch => {
    const response = await await csrfFetch('/api/session');

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list));
        return list;
    }
}

const initialState = { list: []}

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {};
            action.list.forEach(spot => {
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
