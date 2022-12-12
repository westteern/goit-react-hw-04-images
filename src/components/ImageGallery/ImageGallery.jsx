import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryGrid } from './ImageGallery.styled';

import fetchImage from 'api/fatchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    totalImages: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { searchQuery } = this.props;
    const { page } = this.state;
    const prevQuery = prevProps.searchQuery;
    const prevPage = prevState.page;
    const updatePage = prevQuery !== searchQuery ? 1 : page;
    if (prevQuery !== searchQuery || prevPage < page) {
      try {
        this.setState({ loading: true });
        const updateData = await fetchImage(searchQuery, updatePage);
        const newImages = updateData.hits;
        const totalImages = updateData.totalHits;
        if (newImages.length === 0 && totalImages === 0) {
          toast.info('No image found. Refine the search parameters.');
        }
        if (prevQuery !== searchQuery && totalImages !== 0) {
          toast.success(`We found ${totalImages} pictures for your request!`);
          this.setState({
            images: newImages,
            page: 1,
            totalImages: totalImages,
          });
          this.goToTop();
        }
        if (prevPage !== page && page !== 1) {
          this.setState({ images: [...this.state.images, ...newImages] });
          this.goToNextPage();
        }
      } catch (error) {
        console.log(error);
        toast.error('Oops! Something is wrong. Try reloading the page');
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  goToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  goToNextPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight - 165,
        behavior: 'smooth',
      });
    }, 0);
  };

  render() {
    const { images, loading, page, totalImages } = this.state;
    const onLoadMore = this.onLoadMore;
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
        {images.length !== 0 && images.length !== totalImages && !loading && (
          <Button loadMore={onLoadMore}></Button>
        )}
        {page > 1 && loading && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
