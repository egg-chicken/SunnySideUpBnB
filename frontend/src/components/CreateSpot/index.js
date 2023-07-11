import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import './createspot.css'

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector(state => state.session.user);
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2,setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     return () => {
    //         setCountry('');
    //         setStreetAddress('');
    //         setCity('');
    //         setState('');
    //         setDescription('');
    //         setTitle('');
    //         setPrice('');
    //         setPreviewImage('');
    //         setImage1('');
    //         setImage2('');
    //         setImage3('');
    //         setImage4('');
    //         setErrors({});
    //       };
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if(!country) errors.country = 'Country is required';
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(description.length < 30){
            errors.description = 'Description needs 30 or more characters';
        }
        if(!price) errors.price = 'Price is required';
        if(!previewImage) errors.previewImage = 'Preview Image is required';
        // if(image1 && !image1.endsWith('.png') && !image1.endsWith('.jpg') && !image1.endsWith('.jpeg')) errors.image1 = 'Image URL must end in .png, .jpg, .jpeg';
        // if(image2 && !image2.endsWith('.png') && !image2.endsWith('.jpg') && !image2.endsWith('.jpeg')) errors.image2 = 'Image URL must end in .png, .jpg, .jpeg';
        // if(image3 && !image3.endsWith('.png') && !image3.endsWith('.jpg') && !image3.endsWith('.jpeg')) errors.image3 = 'Image URL must end in .png, .jpg, .jpeg';
        // if(image4 && !image4.endsWith('.png') && !image4.endsWith('.jpg') && !image4.endsWith('.jpeg')) errors.image4 = 'Image URL must end in .png, .jpg, .jpeg';

        const spotInfo = { address, city, state, country, name, description, price, previewImage, image1, image2, image3, image4}

        if (Object.keys(errors).length === 0) {
            setErrors(errors);
          } else {
            setErrors({});
            dispatch(spotActions.createSpot(spotInfo))
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
                    <h2>Create a New Spot</h2>
                    <p>Where's your place located?</p>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Country
                        <input
                            type='text'
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.country && <p>{errors.country}</p>}
                    <label>
                        Street Address
                        <input
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // required
                    />
                    </label>
                    {errors.address && <p>{errors.address}</p>}
                    <label>
                        City
                        <input
                            type='text'
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.city && <p>{errors.city}</p>}
                    <label>
                        State
                        <input
                            type='text'
                            placeholder="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.state && <p>{errors.state}</p>}
                    <label>
                        Describe your place to guests
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <input
                            type='text'
                            placeholder="Please write at least 30 characters"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                    <label>
                        Create a title for your spot
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type='text'
                            placeholder="Name of your spot"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                    <label>
                        Set a base price for your spot
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <input
                            type='number'
                            placeholder="Price per night (USD)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            // required
                        />
                    </label>
                    {errors.price && <p>{errors.price}</p>}
                    <label>
                        Liven up your spot with photos
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            type='text'
                            placeholder="Preview Image URL"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            // required
                        />
                        <input
                            type='text'
                            placeholder="Image URL"
                            value={image1}
                            onChange={(e) => setImage1(e.target.value)}
                            // required
                        />
                        <input
                            type='text'
                            placeholder="Image URL"
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                            // required
                        />
                        <input
                            type='text'
                            placeholder="Image URL"
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                            // required
                        />
                        <input
                            type='text'
                            placeholder="Image URL"
                            value={image4}
                            onChange={(e) => setImage4(e.target.value)}
                            // required
                        />
                    </label>
                    <div>
                        <button type='submit'>Create Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateSpotForm;
