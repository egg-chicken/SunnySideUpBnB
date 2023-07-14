import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
// import createReview from '../ReviewModal';
import { useParams } from 'react-router-dom';
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

    useEffect(() => {
        // console.log('!!!!spots!!!!', id)
        dispatch(spotsActions.getOneSpot(id))
          .then(() => setIsLoaded(true))
        dispatch(reviewsActions.getAllReviews(id))
          .then(() => setIsReviewsLoaded(true))
        // dispatch(getAllReviews(id))
    }, [id, dispatch]);

    useEffect(() => {
      if(isReviewsLoaded) {
        if(user){
          let target = true;
          if(target === true) setIsVisible(true);
        }
      }
    })
    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon")
    }

    return (
      <>
        <div className='full-page'>
          {isLoaded && (
            <div >
              <div className='spot-details'>
                  <h1>{spot.name}</h1>
                  <p className='location'>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className='spot-desc'>
                  <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                  <p>{spot.description}</p>
            </div>
            <div className='spot-images'>
                {
                  spot?.SpotImages.map((image, index) => {
                    return (
                      <img key={image.id} className={image.preview ? 'preview-image' : `spot-image-tiles tile-image-${index}`} src={image.url} onError={(e) => {
                        e.target.src = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg';
                        e.onError = null;
                      }} alt={image.url.split('/').pop()} />
                    );
                  })
                }
            </div>
            <div className='callout-box'>
                <p>${spot.price} night</p>
                <div>
                  <i className="fa-solid fa-star"/>
                  <p>{spot.avgStarRating}</p>
                </div>
                <button onClick={handleClick} className='reserve-button'>Reserve</button>
            </div>
            </div>
          )}
          {/* {isReviewsLoaded && */}
            <div>
              <h2><i className="fa-solid fa-star"/>{spot?.avgStarRating || 'New'}</h2>
              {reviews?.map(review => {
                return (
                  <div key={review.id}>
                    <p>{review.User?.firstName}</p>
                    <p>{review.createdAt}</p>
                    <p>{review.review}</p>
                  </div>
                )
                })
              }
            </div>
          {/* // <OpenModalButton modalComponent={<createReview setIsVisible={setIsVisible}/>} />} */}

        </div>
      </>
      );
}

export default SpotDetails;
