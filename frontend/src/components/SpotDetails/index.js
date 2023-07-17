import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import './spotDetails.css'

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const reviews = useSelector((state) => Object.values(state.reviews));
    const [isVisible, setIsVisible] = useState(false);
    const user = useSelector(state => state.session.user);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(id))
          .then(() => setIsLoaded(true))
        dispatch(reviewsActions.getAllReviews(id))
          .then(() => setIsReviewsLoaded(true))
    }, [id, dispatch]);

    useEffect(() => {
      if(isReviewsLoaded & isLoaded) {
        if(user){
          if(user.id !== spot.id){
            let target = true;
            reviews.forEach(el => {
              if(el.userId === user.id) target = false;
            });
            if(target === true) setIsVisible(true);
          }
        }
      }
    },[isReviewsLoaded, isLoaded, reviews, spot, user])
    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon")
    }

    return (
      <>
        <div className='full-page'>
          {isLoaded && isReviewsLoaded && (
            <div>
              <div className='spot-details'>
                  <h1 className='spot-name'>{spot.name}</h1>
                  <p className='location'>{spot.city}, {spot.state}, {spot.country}</p>
              </div>
              <div className='spot-images'>
                {spot?.SpotImages.map((image, index) => {
                    return (
                      <img key={image.id} className={image.preview ? 'preview-image' : `spot-image-tiles tile-image-${index}`} src={image.url} onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg';
                        e.onError = null;
                      }} alt={image.url.split('/').pop()} />
                    );
                  })
                }
              </div>
              <div className='desc-section'>
              <div className='spot-desc'>
                  <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                  <p>{spot.description}</p>
              </div>
              <div className='call-position'>
              <div className='callout-box'>
                <p className='spot-price-detail'>${spot.price} night</p>
                <div className='callout-box-rating'>&#9733;{spot.avgStarRating ? (Number.isInteger(spot.avgStarRating) ? spot.avgStarRating.toFixed(1) : spot.avgStarRating.toFixed(2)) : 'New'}{spot?.numReviews >= 1 && <span className='callout-box-rating numrev'>  &#8231; {spot?.numReviews} Review{spot?.numReviews > 1 ? 's' : ''}</span>}</div>
                <button onClick={handleClick} className='reserve-button'>Reserve</button>
              </div>
              </div>
            </div>
            </div>
          )}
          {isReviewsLoaded &&
            <div className='review-section'>
              <h3 className='review-header'> &#9733;{spot.avgStarRating ? (Number.isInteger(spot.avgStarRating) ? spot.avgStarRating.toFixed(1) : spot.avgStarRating.toFixed(2)) : 'New'}{spot?.numReviews >= 1 && <span> · {spot?.numReviews} Review{spot?.numReviews > 1 ? 's' : ''}</span>}</h3>
              <div className='bruh'>
                {isVisible &&
                <OpenModalButton
                modalComponent={<ReviewModal id={spot.id} setIsVisible={setIsVisible}/>}
                buttonText='Post Your Review'
                />}
              </div>
              {spot?.numReviews < 1 && isVisible && <div className='no-review-text'>Be the first to post a review!</div>}

              {reviews?.map(review => {
                const reviewMonth = months[new Date(review.createdAt).getMonth()]
                const year = new Date(review.createdAt).getFullYear();

                return (
                  <div key={review.id}>
                    <p className='user-firstname'>{review.User?.firstName}</p>
                    <p className='date'>{reviewMonth} {year}</p>
                    <p className='review-text'>{review.review}</p>
                    {review.userId === user?.id && <OpenModalButton
                      modalComponent={<DeleteReviewModal id={review.id} spotId={review.spotId} setIsVisible={setIsVisible}/>}
                      buttonText='Delete'
                    />}
                  </div>
                )
              })}
            </div>
          }
        </div>
      </>
      );
}

export default SpotDetails;
