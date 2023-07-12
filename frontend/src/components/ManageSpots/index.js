import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
        dispatch(spotsActions.getCurrentSpots())
    }, [dispatch]);

    return (
        <>
            <h2>Manage Your Spots</h2>
            <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
            <div>
                {spots && spotsArray.map((spot) => {
                    <div>

                    </div>
                })}
            </div>
        </>
    )
};

export default ManageSpots;
