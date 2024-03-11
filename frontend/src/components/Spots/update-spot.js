import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../store/spots';

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const spot = useSelector((state) => state.spot[id]);
    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [name, setName] = useState(spot?.name || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
    const [image1, setImage1] = useState(spot?.SpotImages ? spot?.SpotImages[1] : '');
    const [image2, setImage2] = useState(spot?.SpotImages ? spot?.SpotImages[2] : '');
    const [image3, setImage3] = useState(spot?.SpotImages ? spot?.SpotImages[3] : '');
    const [image4, setImage4] = useState(spot?.SpotImages ? spot?.SpotImages[4] : '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(id))
            .then(spotdetail => {
                setCountry(spotdetail?.country)
                setAddress(spotdetail?.address)
                setCity(spotdetail?.city)
                setState(spotdetail?.state)
                setDescription(spotdetail?.description)
                setName(spotdetail?.name)
                setPrice(spotdetail?.price)
            })

    }, [dispatch, id, history]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if(!country) errors.country = 'Country is required';
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(!name) errors.name = 'Name is required';
        if(!price) errors.price = 'Price is required';
        if(!description) errors.description = 'Description is required';
        if(description.length < 30){
            errors.description = 'Description needs 30 or more characters';
        }
        if(!price) errors.price = 'Price is required';

        setErrors(errors);

        const spotInfo = { address, city, state, country, name, description, price, url: previewImage, spotImages: []}

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
              } else {
                setErrors({});
                dispatch(spotsActions.updateSpot(id, spotInfo))
                    .then((spot) => {
                        history.push(`/spots/${spot.id}`)
                    })
                    .catch(async (res) => {
                        const data = await res.json()
                        if(data && data.errors) setErrors(data.errors)
                    })
              }
    }

    return (
        <>
        <div className="form-create">
            <div className="Intro">
                <h2>Update Your Listing</h2>
                <p className="text">Where's your place located?</p>
                <p className="intro-text">Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="align-create">
                <div className="error-message">{errors.country && <p className="special">{errors.country}</p>}</div>
                <label className="label-create">
                     Country
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                </div>
                <div className="align-create">
                <div className="error-message">{errors.address && <p className="special">{errors.address}</p>}</div>
                <label className="label-create">
                    Street Address
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                />
                </label>
                </div>
                <div className="error-message">{errors.city && <p className="special">{errors.city}</p>}</div>
                <div className="error-message">{errors.state && <p className="special">{errors.state}</p>}</div>
                <div className="organize-create">
                <div className="align-create">
                <label className="label-create-small city">
                    City
                    <input
                        className="input-create-small"
                        type='text'
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                </div>
                <div className="align-create">
                <label className="label-create-small state">
                    State
                    <input
                        className="input-create-small"
                        type='text'
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                </div>
                </div>
                <div className="align-create">
                <label className="label-create border-create">
                <div className="error-message">{errors.description && <p className="special">{errors.description}</p>}</div>
                <p className="text">Describe your place to guests</p>
                    <p className="intro-text">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        className="input-create"
                        type='text'
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                </div>
                <div className="align-create">
                <label className="label-create border-create">
                <div className="error-message">{errors.name && <p className="special">{errors.name}</p>}</div>
                    <p className="text">Create a title for your spot</p>
                    <p className="intro-text">Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                </div>
                <div className="align-create">
                <label className="label-create border-create">
                <div className="error-message">{errors.price && <p className="special">{errors.price}</p>}</div>
                <p className="text">Set a base price for your spot</p>
                    <p className="intro-text">Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input
                        className="input-create"
                        type='number'
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                </div>
                <p className="border-create"></p>
                <div className="align-create">
                <label className="label-create">
                <p className="text">Liven up your spot with photos</p>
                    <p className="intro-text">Submit a link to at least one photo to publish your spot.</p>
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Preview Image URL"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Image URL"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                    />
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Image URL"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                    />
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Image URL"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                    />
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Image URL"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                    />
                </label>
                </div>
                <p className="border-create"></p>
                <div className="align-create-button">
                    <button className='create-button'type='submit'>Update Spot</button>
                </div>
            </form>
        </div>
    </>
    )
}

export default UpdateSpotForm;
