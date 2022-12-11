import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, tag } = this.props;
    return (
      <>
        <li>
          <img src={webformatURL} alt={tag} />
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
