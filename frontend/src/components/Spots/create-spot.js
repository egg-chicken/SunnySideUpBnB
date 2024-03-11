import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots';
import './css/createspot.css';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => {
            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setDescription('');
            setName('');
            setPrice('');
            setPreviewImage('');
            setImage1('');
            setImage2('');
            setImage3('');
            setImage4('');
        }
    }, []);

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
        if(description.length < 30) errors.description = 'Description needs 30 or more characters';
        if(!price) errors.price = 'Price is required';
        if(!previewImage) errors.previewImage = 'Preview Image is required';
        if(previewImage && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) errors.previewImage = 'Image URL must end in .png, .jpg, .jpeg';
        if(image1 && !image1.endsWith('.png') && !image1.endsWith('.jpg') && !image1.endsWith('.jpeg')) errors.image1 = 'Image URL must end in .png, .jpg, .jpeg';
        if(image2 && !image2.endsWith('.png') && !image2.endsWith('.jpg') && !image2.endsWith('.jpeg')) errors.image2 = 'Image URL must end in .png, .jpg, .jpeg';
        if(image3 && !image3.endsWith('.png') && !image3.endsWith('.jpg') && !image3.endsWith('.jpeg')) errors.image3 = 'Image URL must end in .png, .jpg, .jpeg';
        if(image4 && !image4.endsWith('.png') && !image4.endsWith('.jpg') && !image4.endsWith('.jpeg')) errors.image4 = 'Image URL must end in .png, .jpg, .jpeg';

        setErrors(errors);

        const spotInfo = { address, city, state, country, name, description, price, url: previewImage, spotImages: []}

        if(image1) spotInfo.spotImages.push(image1)
        if(image2) spotInfo.spotImages.push(image2)
        if(image3) spotInfo.spotImages.push(image3)
        if(image4) spotInfo.spotImages.push(image4)

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
          } else {
            setErrors({});
            dispatch(spotsActions.createSpot(spotInfo))
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
        <div className="form-create">
            <div className="Intro">
                <h2>Create a New Listing</h2>
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
                <div className="error-message">{errors.previewImage && <p className="special">{errors.previewImage}</p>}</div>
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
                    <button className='create-button'type='submit'>Create Spot</button>
                </div>
            </form>
        </div>
    )
}
export default CreateSpotForm;
