import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ContainerApp } from './App.styled';
import { ToastContainer } from 'react-toastify';

import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ContainerApp>
      <SearchBar onSubmit={setSearchQuery} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </ContainerApp>
  );
};

export default App;
