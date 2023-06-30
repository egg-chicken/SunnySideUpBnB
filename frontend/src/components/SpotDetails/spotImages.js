const SpotImages = ({ spot}) => {
    if(!spot.SpotImages) {
        return null
    }
}

const previewImage = spot.SpotImages.find((image) => image.preview)
