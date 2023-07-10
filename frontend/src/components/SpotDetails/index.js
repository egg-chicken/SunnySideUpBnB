import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import { useParams } from 'react-router-dom';
import './spotDetails.css'

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const reviews = useSelector((state) => Object.values(state.reviews));

    useEffect(() => {
        // console.log('!!!!spots!!!!', id)
        dispatch(spotsActions.getOneSpot(id))
          .then(() => setIsLoaded(true))
        dispatch(reviewsActions.getAllReviews(id))
          .then(() => setIsReviewsLoaded(true))
        // dispatch(getAllReviews(id))
    }, [id, dispatch]);

    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon")
    }

    return (
      <>
        <div className='full-page'>
          {isLoaded && (
            <div key={spot.id}>
              <div className='spot-details'>
                  <h1>{spot.name}</h1>
                  <p className='location'>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className='spot-desc'>
                  <p>Hosted by {spot.firstName} {spot.lastName}</p>
                  <p>{spot.description}</p>
            </div>
            <div className='spot-images'>
                {
                  spot?.SpotImages.map((image, index) => {
                    return (
                      <img className={image.preview ? 'preview-image' : `spot-image-tiles tile-image-${index}`} src={image.url} onError={(e) => {
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
          {isReviewsLoaded &&
            <div>
              <h2><i className="fa-solid fa-star"/>{spot.avgStarRating || 'New'}</h2>
              {reviews?.map(review => {
                return (
                  <div>
                    <p>{review.User?.firstName}</p>
                    <p>{review.createdAt}</p>
                    <p>{review.review}</p>
                  </div>
                )
                })
              }
            </div>
          }
        </div>
      </>
      );
}

export default SpotDetails;
