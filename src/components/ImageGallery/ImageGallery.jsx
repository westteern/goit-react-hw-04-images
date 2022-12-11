import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryGrid } from './ImageGallery.styled';

import fetchImage from 'api/fatchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { searchQuery } = this.props;
    const { page } = this.state;
    const prevQuery = prevProps.searchQuery;
    const prevPage = prevState.page;
    const updatePage = prevQuery !== searchQuery ? 1 : page;
    if (prevQuery !== searchQuery || prevPage !== page) {
      try {
        this.setState({ loading: true });
        const updateData = await fetchImage(searchQuery, updatePage);
        const newImages = await updateData.hits;
        if (newImages.length === 0) {
          alert('No image found. Refine the search parameters.');
          this.setState({ loading: false });
        }
        if (prevQuery !== searchQuery) {
          this.setState({ images: newImages, page: 1 });
        }
        if (prevPage !== page && page !== 1) {
          this.setState({ images: [...this.state.images, ...newImages] });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, loading, page } = this.state;
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
        {images.length !== 0 && !loading && (
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
