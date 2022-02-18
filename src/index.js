import './sass/main.scss';
import { fetchImages } from './js/api/fetchImages';
import { createGalleryList } from './js/createGalleryList';
import { Pagination } from './js/pagination';
import imageCardTemplate from './js/galleryCard.hbs';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const nextPageRef = document.querySelector('.load-more');
// formRef.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

nextPageRef.addEventListener('click', () => {
  galleryPagination.nextPage();
});

formRef.addEventListener('submit', handleSubmit);

const renderGallery = images => {
  //   const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = data;

  const markupGallery = images
    .map(image => {
      const markup = `
        <a class="gallery-link" href="${image.largeImageURL}">
          <div class="photo-card">
            <img class="photo-card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${image.likes}</p>
              <p class="info-item"><b>Views</b>${image.views}</p>
              <p class="info-item"><b>Comments</b>${image.comments}</p>
              <p class="info-item"><b>Downloads</b>${image.downloads}</p>
            </div>
          </div>
        </a>
      `;
      return markup;
    })
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markupGallery);
};

function handleSubmit(event) {
  event.preventDefault();
  const searchReq = event.currentTarget.searchQuery.value.trim();

  //   if (searchReq === '') {
  //     return Notiflix.Notify.info('Enter search request plese!');
  //   }

  console.log(`Search request: ${searchReq}`);

  fetchImages(searchReq)
    .then(({ data }) => {
      //   console.log(data);
      renderGallery(data.hits);
    })
    .catch(error => {
      if (error.status === 404) Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}
