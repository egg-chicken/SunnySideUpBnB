import { csrfFetch } from "./csrf";
import { getOneSpot } from "./spots";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

//review action creators
const load = reviews => ({
    type: LOAD_REVIEWS,
    reviews
});

const addReview = review => ({
    type:  CREATE_REVIEW,
    review
});

const removeReview = id => ({
    type: DELETE_REVIEW,
    id
})

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
export const createReview = (payload) => async dispatch => {
    const { id, review, stars } = payload
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review, stars})
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        dispatch(getOneSpot(id));
        dispatch(getAllReviews(id));
        return response;
    }

};

//delete a review using id
export const deleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        const res = await response.json();
        dispatch(removeReview(id));
        return res;
    }
};


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_REVIEWS:
            const mapRev = {}
            action.reviews.Reviews.forEach(review => {
                mapRev[review.id] = review;
            });
            return mapRev;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.id];
            return newState
        default:
            return newState;
    }
}

export default reviewsReducer;
