import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
       dispatch(getSpots())
    }, [dispatch]);


    const defaultImage = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg'

    return (
        <main className='tiles-container'>
            {spots && spotsArray.map((spot) => (
                <div key={spot.id} className='spot-tile'>
                    <div  className='tooltip'>
                        <Link className='spot-id' to={`/spots/${spot.id}`}>
                            <p className='tooltiptext'>{spot.name}</p>
                            <img src={spot.previewImage || defaultImage} alt='Spot Preview' className='image'title={spot.name}/>
                            <div className='spot-details'>
                                <div className='local-rating'>
                                    <p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
                                    <p className='spot-rating'>
                                        <i className="fa-solid fa-star"/>
                                        {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(2)) : 'New'}
                                    </p>
                                </div>
                                <p className='spot-price'><span className='price-child'>{`$${spot.price}`}</span> night</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default LandingPage;
