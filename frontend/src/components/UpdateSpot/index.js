import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const user = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spot[id]);
    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [image1, setImage1] = useState(spot?.SpotImages ? spot?.SpotImages[1].url : '');
    const [image2, setImage2] = useState(spot?.SpotImages ? spot?.SpotImages[2].url : '');
    const [image3, setImage3] = useState(spot?.SpotImages ? spot?.SpotImages[3].url : '');
    const [image4, setImage4] = useState(spot?.SpotImages ? spot?.SpotImages[4].url : '');
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
                setPreviewImage(spotdetail?.SpotImages[0].url)
                setImage1(spotdetail?.SpotImages[1].url)
                setImage2(spotdetail?.SpotImages[2].url)
                setImage3(spotdetail?.SpotImages[3].url)
                setImage4(spotdetail?.SpotImages[4].url)
            })

    }, [dispatch, id]);


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
        // let spotId;
        // spotId = await dispatch(spotsActions.createSpot(spotInfo))
        // history.push(`/spots/${spotId}`)

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
                        <button type='submit'>Update Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateSpotForm;
