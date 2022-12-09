import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';

import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';


class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() { 
    const onSubmit = this.handleSubmit;
    const searchQuery = this.state.searchQuery;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <GlobalStyle />
      </>
    );
  }    
};

export default App;