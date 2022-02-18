import axios from 'axios';
import apiSettings from './settings';
// import { apiService } from './apiService';

const { BASE_URL, API_KEY, TYPE, PER_PAGE } = apiSettings;

export const fetchImages = name => {
  console.log(
    `${BASE_URL}${API_KEY}&q=${name}${TYPE}&orientation=horizontal&safesearch=true&${PER_PAGE}`,
  );
  return axios.get(
    `${BASE_URL}${API_KEY}&q=${name}${TYPE}&orientation=horizontal&safesearch=true&${PER_PAGE}`,
  );
  // return axios.get(`${movieApiUrl}/movie/popular?api_key=${movieKey}&page=${page}`);
};
