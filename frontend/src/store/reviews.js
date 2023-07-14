import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';

const CREATE_REVIEW = 'reviews/ADD';

const load = reviews => ({
    type: LOAD,
    reviews
});

const addReview = review => ({
    type:  CREATE_REVIEW,
    review
});

//get all the spot reviews
export const getAllReviews = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews;
    }
}

//create a review
export const createReview = (id, spotInfo) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(spotInfo)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data
    }

};

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
        case CREATE_REVIEW:
            // return {...state, [action.review.id]: action.review}
            newState[action.review.id] = action.review;
            return newState;
        default:
            return newState;
    }
}

export default reviewsReducer;
