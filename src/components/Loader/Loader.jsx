import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrape } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrape>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderWrape>
  );
};

export default Loader;
