import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';

const load = reviews => ({
    type: LOAD,
    reviews
});

//get all the spots reviews
export const getAllReviews = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews;
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD:
            const mapRev = {}
            action.reviews.Reviews.forEach(review => {
                mapRev[review.id] = review;
            });
            return mapRev;
        default:
            return newState;
    }
}

export default reviewsReducer;
