import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './spotDetails.css'

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id])

    useEffect(() => {
        // console.log('!!!!spots!!!!', id)
        dispatch(getOneSpot(id));
    }, [id, dispatch]);

    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon...")
    }

    return (
        <div className='parent'>
          {spot ? (
            <>
              <div className='div1'>
                  <h1>{spot.name}</h1>
                  <p>{spot.city}, {spot.state}, {spot.country}</p>
              </div>
              <div className='div2'>
                  <img src={spot.url} alt={spot.name} className='image-detail-spot'/>
              </div>
              <div className='div3'>
                <img src={spot.url} alt={spot.name} className='image-detail-spot'/>
              </div>
              <div className='div4'>
                <img src={spot.url} alt={spot.name} className='image-detail-spot'/>
              </div>
              <div className='div5'>
                <img src={spot.url} alt={spot.name} className='image-detail-spot'/>
              </div>
              <div className='div6'>
                <img src={spot.url} alt={spot.name} className='image-detail-spot'/>
              </div>
              <div className='div8'>
                <p>Hosted by {spot.firstName} {spot.lastName}</p>
                <p>{spot.description}</p>
              </div>
              <div className='div7'>
                {/* <i className="fa-solid fa-star"/> */}
                <p>Reviews . . .</p>
              </div>
              <div className='callout-box'>
                <p>Price: ${spot.price} night</p>
                {/* <i className="fa-solid fa-star"/> */}
                <button onClick={handleClick} className='reserve-button'>Reserve</button>
              </div>
            </>
          ) : (
            <p>Loading spot details...</p>
          )}
        </div>
      );
}

export default SpotDetails;
