import { useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch]);

    return (
        <>
            <h2>Manage Your Spots</h2>

        </>
    )
};

export default ManageSpots;
