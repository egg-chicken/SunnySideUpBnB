import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD';
const LOAD_ONE = 'spots/ADD_ONE';

const load = list => ({
    type: LOAD,
    list
});

const viewOne = spot => ({
    type: LOAD_ONE,
    spot
})

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

//View a spot's detail
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const spot = await response.json();
        // console.log('%%%%%%%%%%', spot)
        dispatch(viewOne(spot));
        // return spot;
    }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
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
        case LOAD_ONE:
            newState[action.spot.id] = action.spot;
            return newState
        default:
            return state;
    }
}

export default spotsReducer;
