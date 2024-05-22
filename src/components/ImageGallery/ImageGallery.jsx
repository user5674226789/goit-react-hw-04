import ImageCard from '../ImageCard/ImageCard'
import css from './ImageGallery.module.css'

function ImageGallery({data, openModal, onAfterOpen}) {
    return (
        <ul className={css.gallery}>
            {data.map(photo => {
                return (
                    <li key={photo.id} className={css.galleryItem}>
                        <ImageCard
                            photo={photo}
                            openModal={openModal}
                            onAfterOpen={onAfterOpen}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default ImageGallery
