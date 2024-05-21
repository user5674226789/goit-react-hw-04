import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import { getImages } from "./img-api";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";



export default function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(false);
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [selectedImageUrl, setSelectedImageUrl] = useState("");

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
      async function getPhoto() {
        try {
          setLoading(true);
          setError(false);
          const data = await getImages(searchQuery, page);
          setTotalPage(page < Math.ceil(data.total / 15));
          setImages(data.results);
        } catch (error) {
          setError(true);
        }
      }
    getPhoto();
    async function fetchImages() {
      try {
        setImages((prevState) => [...prevState, ...images]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [page, searchQuery]);

  const handleSearch = async (searchImg) => {
    setSearchQuery(searchImg);
    setPage(1);
    setImages([]);
  };

  const hendleLoadMore = async () => {
    setPage(page + 1);
   
  };
// modal
    const openModal = (imageUrl) => {
      setSelectedImageUrl(imageUrl);
      setModalIsOpen(true);
    };

  const closeModal = () => {
      setSelectedImageUrl("");
      setModalIsOpen(false);
  };


  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {totalPage && <LoadMoreBtn onClick={hendleLoadMore} />}

      {loading && <Loader />}

   
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}
