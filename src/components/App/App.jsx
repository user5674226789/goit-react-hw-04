import React from 'react'
import { useState, useEffect } from 'react'
import { getPhotos } from '../unsplash-api'
import toast, { Toaster } from 'react-hot-toast'
import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from '../ImageGallery/ImageGallery'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import ImageModal from '../ImageModal/ImageModal'
import css from './App.module.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
   const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    async function fetchPhoto() {
      try {
        setIsLoad(true);
        setIsError(false);
        const { results, total_pages } = await getPhotos(searchQuery, page);
        setPhotos(prevState => [...prevState, ...results]);
        setShowBtn(total_pages && total_pages !== page);
      } catch {
        // toast.error("Error fetching. Please try again!");
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    }
    fetchPhoto();

  }, [searchQuery, page]);

   const handleSearch = async (photo) => {
     setSearchQuery(photo);
     setPage(1);
     setPhotos([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal(photo) {
    setModalImage(photo);
  }

  return (
    <>
      <header>
        <SearchBar onSearch={handleSearch} />
        {isError && (<ErrorMessage />)}
      </header>
      <div>
        <Toaster containerStyle={{ position: 'relative', }} reverseOrder={true} />
        {photos.length > 0 && <ImageGallery data={photos} openModal={openModal} onAfterOpen={afterOpenModal}/>}
        {isLoad && (<Loader />)}
        {showBtn && (<LoadMoreBtn onLoadMore={handleLoadMore} />)}
        {modalIsOpen && <ImageModal closeModal={closeModal} modalIsOpen={modalIsOpen} photo={modalImage} />}
      </div>
    </>
  )
};

export default App
