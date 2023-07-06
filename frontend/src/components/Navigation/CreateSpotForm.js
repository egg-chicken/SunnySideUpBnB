import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateSpotForm = () => {
    const history = useHistory();
    const [form, setForm] = useState({
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        description: '',
        title: '',
        price: '',
        previewImage: '',
    })

    
    return null;
}

export default CreateSpotForm;
