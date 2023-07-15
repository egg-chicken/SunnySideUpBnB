import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
// import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal';
import { useParams } from 'react-router-dom';
import './spotDetails.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
          if(user.id !== spot.id){
            let target = true;
            reviews.forEach(el => {
              if(el.userId === user.id) target =false;
            });
            if(target === true) setIsVisible(true);
          }
          // let target = true;
          // if(target === true) setIsVisible(true);
        }
      }
    },[isReviewsLoaded, user])
    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon")
    }

    // const review = { id, avgStarRating, stars}

    return (
      <>
        <div className='full-page'>
          {isLoaded && (
            <div >
              <div className='spot-details'>
                  <h1>{spot.name}</h1>
                  <p className='location'>{spot.city}, {spot.state}, {spot.country}</p>
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
            <div className='spot-desc'>
                  <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>
                  <p>{spot.description}</p>
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
              <h2><i className="fa-solid fa-star"/>{spot.avgStarRating ? (Number.isInteger(spot.avgStarRating) ? spot.avgStarRating.toFixed(1) : spot.avgStarRating.toFixed(2)) : 'New'}</h2>
              <p><i className="fa-solid fa-circle" style={{color: '#000000'}}/></p>
              {spot.numReviews}
              {spot?.numReviews < 1 && isVisible && <div>Be the first to post a review!</div>}
              {isVisible &&
            <OpenModalButton
            modalComponent={<ReviewModal id={spot.id} setIsVisible={setIsVisible}/>}
            buttonText='Post Your Review'
            />
          }
              {reviews?.map(review => {
                // const createdDate = new Date(review.createdAt)
                const reviewMonth = months[new Date(review.createdAt).getMonth()]
                const year = new Date(review.createdAt).getFullYear();

                return (
                  <div key={review.id}>
                    <p>{review.User?.firstName}</p>
                    <p>{reviewMonth} {year}</p>
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
