import axios from 'axios';
import apiSettings from './settings';

const { BASE_URL, API_KEY, TYPE, PER_PAGE } = apiSettings;

export const fetchImages = (name, galleryPage) => {
  console.log(
    `${BASE_URL}${API_KEY}&q=${name}${TYPE}&orientation=horizontal&safesearch=true&page=${galleryPage}&${PER_PAGE}`,
  );
  return axios.get(
    `${BASE_URL}${API_KEY}&q=${name}${TYPE}&orientation=horizontal&safesearch=true&${PER_PAGE}`,
  );
};
