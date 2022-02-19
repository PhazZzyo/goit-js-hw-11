import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImages } from './js/api/fetchImages';
import imageCardTemplate from './js/galleryCard.hbs';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

let searchReq = '';
let galleryPage = 1;

loadMoreRef.addEventListener('click', () => {
  galleryPage += 1;
  fetchImages(searchReq, galleryPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      console.log(data.hits);
      const totalPages = Math.ceil(data.totalHits / data.hits.length);
      console.log(totalPages);
      if (galleryPage >= totalPages) {
        loadMoreRef.classList.add('visualy-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(error => {
      console.log(error);
    });
});

formRef.addEventListener('submit', handleSubmit);

const renderGallery = images => {
  const imagesList = images.map(image => {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
    return { largeImageURL, webformatURL, tags, likes, views, comments, downloads };
  });
  galleryRef.insertAdjacentHTML('beforeend', imageCardTemplate(imagesList));
  // galleryRef.innerHTML = imageCardTemplate(imagesList);
  new SimpleLightbox('.gallery a').refresh();
};

function handleSubmit(event) {
  event.preventDefault();
  galleryPage = 1;
  searchReq = event.currentTarget.searchQuery.value.trim();

  if (searchReq === '') {
    return Notiflix.Notify.info('Enter search request plese!');
  }

  galleryRef.innerHTML = '';
  loadMoreRef.classList.add('visualy-hidden');

  fetchImages(searchReq, galleryPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      console.log(data.hits);
      if (data.hits.length === 0) {
        galleryRef.innerHTML = '';
        return Notiflix.Notify.failure('There is no images found with that search request');
      }
      Notiflix.Notify.success(`'Hooray! We found ${data.totalHits} images.'`);
      loadMoreRef.classList.remove('visualy-hidden');
    })
    .catch(error => {
      console.log(error);
    });
}
