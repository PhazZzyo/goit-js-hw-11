import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImages } from './js/api/fetchImages';
import imageCardTemplate from './js/galleryCard.hbs';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');
const scrollToTopButton = document.getElementById('scrollTop');

let searchReq = '';
let galleryPage = 1;
const perPage = 40;

formRef.addEventListener('submit', handleSubmit);

loadMoreRef.addEventListener('click', () => {
  galleryPage += 1;
  fetchImages(searchReq, galleryPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (galleryPage >= totalPages) {
        loadMoreRef.classList.add('visualy-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(error => {
      console.log(error);
    });
});

const renderGallery = images => {
  const imagesList = images.map(image => {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
    return { largeImageURL, webformatURL, tags, likes, views, comments, downloads };
  });
  galleryRef.insertAdjacentHTML('beforeend', imageCardTemplate(imagesList));
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

// Scroll to top

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
