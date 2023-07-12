import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import CreateSpotForm from "../CreateSpot";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const UpdateSpotForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(id));
    }, [dispatch])
    
    return (
        <CreateSpotForm />
    )
}

export default UpdateSpotForm;
