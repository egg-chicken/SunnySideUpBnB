import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';
// import { getAllReviews } from '../../store/reviews';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    // const reviews = useSelector((state) => state.reviews);
    // const reviewsArr = Object.values(reviews);
    // console.log(reviewsArr, '<------ reviews');

    useEffect(() => {
       dispatch(getSpots())
    }, [dispatch]);

    const defaultImage = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688021244/airbnb-proj/spot1/334f322b2b69306444da7210fcc5ad6c-cc_ft_768_zbx09n.webp'

    return (
        <main className='tiles-container'>
            {spots && spotsArray.map((spot) => (
                <div key={spot.id} className='tooltip'>
                    <div className='spot-tile'>
                        <Link className='spot-id' to={`/spots/${spot.id}`}>
                        <p className='tooltiptext'>{spot.name}</p>
                                <img src={spot.previewImage || defaultImage} alt='Spot Preview' className='image'title={spot.name}/>

                        <div className='spot-details'>

                            <div className='local-rating'>
                                <p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
                                <p className='spot-rating'>
                                    <i className="fa-solid fa-star"/>
                                    {`${spot.rating}` || 'New'}
                                </p>
                            </div>
                            <p className='spot-price'>{`$${spot.price} night`}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default LandingPage;
