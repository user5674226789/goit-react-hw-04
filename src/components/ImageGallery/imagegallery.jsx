import ImageCard from '../ImageCard/ImageCard'
import css from './ImageGallery.module.css'

function ImageGallery({data}) {
    return (
        <ul>
            {data.map(photo => {
                return (
                    <li key={photo.id} >
                        <ImageCard
                            url={photo.urls}
                            alt={photo.alt_description}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default ImageGallery
