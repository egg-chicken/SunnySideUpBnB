import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
// import SpotGrid from '../SpotGrid';
import { Link } from 'react-router-dom';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
        dispatch(spotsActions.getCurrentSpots())
    }, [dispatch]);

    const defaultImage = 'https://res.cloudinary.com/dc5lrkblw/image/upload/v1688368793/airbnb-proj/No-Image-Placeholder_wthyue.svg'
    return (
        <>
            <h2>Manage Your Spots</h2>
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
                                <p className='spot-price'>{`$${spot.price} night`}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </main>
        </>
    )
};

export default ManageSpots;