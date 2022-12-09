import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';

import SearchBar from './Searchbar';


class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() { 
    const onSubmit = this.handleSubmit;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <GlobalStyle />
      </>
    );
  }    
};

export default App;