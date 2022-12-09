import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
  };

  render() {
    return (
      <>
        <ul></ul>
      </>
    );
  }
}

export default ImageGallery;