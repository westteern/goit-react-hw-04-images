import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImage from 'api/fatchImages';

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
        };
        if (prevQuery !== searchQuery) {
          this.setState({ images: newImages, page: 1 });
        };
        

      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      };
    };
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <ul>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id}>
              <img src={webformatURL} alt={tags} />
            </li>
          ))}
        </ul>
      </>
    );
  };
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;