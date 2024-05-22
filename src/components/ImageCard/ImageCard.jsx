import css from './ImageCard.module.css'

function ImageCard({photo, openModal, onAfterOpen }) {

    const handleClick = () => {
        openModal();
        onAfterOpen(photo);
    }
    return (
        <div>
            <img onClick={handleClick} src={photo.urls.small} alt={photo.alt} className={css.image} />
        </div>
    );
};

export default ImageCard
