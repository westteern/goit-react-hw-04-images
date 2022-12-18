import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setsearchQuery] = useState('');

  const handleInput = e => {
    const inputValue = e.currentTarget.value.toLowerCase();
    setsearchQuery(inputValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('This field can`t be empty');
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <BiSearch
            style={{
              width: '20',
              height: '20',
              verticalAlign: 'middle',
            }}
          />
        </SearchFormBtn>
        <SearchFormInput
          onChange={handleInput}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <span>Search</span>
      </SearchForm>
    </SearchbarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
