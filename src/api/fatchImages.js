import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30721488-ec9ca19b7cca22464bcdf3786';

export default async function fetchImage(userInput, pageNumber) {
  try {
    const responce = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: userInput,
        imageType: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${pageNumber}`,
        per_page: '12',
      },
    });
    //   return await responce.data;
      console.log(responce.data);
  } catch (error) {
      console.log(error);
  }
}


