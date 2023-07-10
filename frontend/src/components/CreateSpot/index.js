import { useEffect, useState } from "react";
import * as spotActions from '../../store/spots';
import { useSelector } from "react-redux";

const CreateSpotForm = () => {
    const user = useSelector(state => state.session.user);
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState(false);

    // useEffect(() => {
    //     const errors = {};
    // })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
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
                        required
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type='text'
                        placeholder="Address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type='text'
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type='text'
                        placeholder="STATE"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Describe your place to guests
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <input
                        type='text'
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Create a title for your spot
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type='text'
                        placeholder="Name of your spot"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
            </form>
        </>
    )
}
export default CreateSpotForm;
