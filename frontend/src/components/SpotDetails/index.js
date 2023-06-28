import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id])

    useEffect(() => {
        console.log('!!!!spots!!!!', id)
        dispatch(getOneSpot(id));
    }, [id, dispatch]);

    // return (
    //     <>
    //         <div className='spot-details'>
    //             {/* <h1>{spotId.name}</h1> */}
    //             test
    //         </div>
    //     </>
    // )
    return (
        <div className='spot-details'>
          {spot ? (
            <>
              <h1>{spot.name}</h1>
              {/* Render other spot details */}
            </>
          ) : (
            <p>Loading spot details...</p>
          )}
        </div>
      );
}

export default SpotDetails;
