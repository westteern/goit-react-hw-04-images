import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, ImageSrc } from './ImageGalleryItem.styled';

import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tag } = this.props;
    const { showModal } = this.state;
    const toggleModal = this.toggleModal;
    return (
      <ImageItem>
        <ImageSrc src={webformatURL} alt={tag} onClick={toggleModal} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tag} />
          </Modal>
        )}
      </ImageItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
