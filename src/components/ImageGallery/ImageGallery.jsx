import { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { GalleryGrid } from './ImageGallery.styled';

import fetchImage from 'api/fatchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';

const ImageGallery = ({ searchQuery }) => {
  const [newQuery, setNewQuery] = useState(searchQuery);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery !== newQuery) {
      // console.log('спрацював 1');
      async function fetchData() {
        try {
          setLoading(true);
          const updateData = await fetchImage(searchQuery, 1);
          const totalImages = updateData.totalHits;
          setTotalHits(totalImages);
          if (totalImages === 0) {
            setImages([]);
            toast.info('No image found. Refine the search parameters.');
          }
          if (totalImages > 0) {
            setImages([]);
            setImages(updateData.hits);
            toast.success(`We found ${totalImages} pictures for your request!`);
          }
        } catch (error) {
          console.log(error);
          toast.error('Oops! Something is wrong. Try reloading the page');
        } finally {
          setLoading(false);
          setPage(1);
          setNewQuery(searchQuery);
        }
      }
      fetchData();
    }
  }, [newQuery, searchQuery]);

  useEffect(() => {
    if (searchQuery === newQuery && page > 1) {
      // console.log('спрацював 2');
      async function updateData() {
        try {
          setLoading(true);
          const updateData = await fetchImage(newQuery, page);
          setImages(prevState => [...prevState, ...updateData.hits]);
        } catch (error) {
          console.log(error);
          toast.error('Oops! Something is wrong. Try reloading the page');
        } finally {
          setLoading(false);
        }
      }
      updateData();
    }
  }, [page, newQuery, searchQuery]);

  useLayoutEffect(() => {
    if (searchQuery !== newQuery) {
      goToTop();
    }
    if (searchQuery === newQuery && page > 1) {
      goToNextPage();
    }
  });

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToNextPage = () => {
    window.scrollBy({
      top: window.innerHeight - 165,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {page === 1 && loading && <Loader />}
      <GalleryGrid>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tag={tags}
          />
        ))}
      </GalleryGrid>
      {images.length !== 0 && images.length !== totalHits && !loading && (
        <Button loadMore={onLoadMore}></Button>
      )}
      {page > 1 && loading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
