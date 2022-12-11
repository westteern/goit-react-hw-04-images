import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ loadMore }) => {
  return (
    <>
      <LoadMoreBtn
        type="button"
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </LoadMoreBtn>
    </>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
