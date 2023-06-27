import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])


//     return (
//         <main>
//             {spots.map((spot) => (
//                 <div key={spot.id}>
//                     <img src={spot.url} alt={spot.name} />
//                     <p>{`${spot.city}, ${spot.state}`}</p>
//                     <p>{spot.name}</p>
//                     <p>{spot.rating || 'New'}</p>
//                     <p>{`${spot.price} night`}</p>
//                 </div>
//             ))}
//         </main>
//     )
    return (
        <main>
            {`${spots}`}
        </main>

    )
}

export default LandingPage;
