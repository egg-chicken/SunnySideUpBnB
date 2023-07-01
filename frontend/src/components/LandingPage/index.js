import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useSelector } from 'react-redux';
import './Landing.css'
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
       dispatch(getSpots())
    }, [dispatch])


    return (
        <main className='tiles-container'>
            {spots && spotsArray.map((spot) => (
                <div key={spot.id} className='spot-tile'>
                    <Link to={`/spots/${spot.id}`}>test</Link>
                    <img src={spot.url} alt='Spot Preview' className='image'title={spot.name}/>
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

                </div>
            ))}
        </main>
    )
}

export default LandingPage;
