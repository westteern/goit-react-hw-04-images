import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ContainerApp } from './App.styled';

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
      <ContainerApp>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <GlobalStyle />
      </ContainerApp>
    );
  }
}

export default App;
