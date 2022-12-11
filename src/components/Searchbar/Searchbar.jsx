import PropTypes from 'prop-types';
import { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleInput = e => {
    const inputValue = e.currentTarget.value.toLowerCase();
    this.setState({ searchQuery: inputValue });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('This field can`t be empty');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    const onChange = this.handleInput;
    const onSubmit = this.handleSubmit;
    const inputValue = this.state.searchQuery;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={onSubmit}>
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
            onChange={onChange}
            value={inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <span>Search</span>
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
