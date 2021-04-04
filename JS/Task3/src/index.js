import './style.css';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';

import itemCardTempt from './templates/itemCard.hbs';
import apiService from './js/apiService';
import isOpenLightboxHandle from './js/basicLightbox';

PNotify.defaults.delay = 1000;

const refs = {
  gallery: document.querySelector('.gallery'),
  inputForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('button[type="button"]'),
  upwardBtn: document.querySelector('.button-upward'),
  borderObserver: document.querySelector('.border-observer'),
};

const toTot = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const insertItemCard = (item) => {
  const markup = itemCardTempt(item);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

const axiosArticles = () => {
  apiService
    .fetchArticles()
    .then(res => {
      insertItemCard(res);
      if (!res.length) {
        PNotify.info({
          text: 'No results were found for your request.',
        });
      }
    })
    .catch((error) => {
      PNotify.error({
        text: error.message,
      });
    });
};

const handleSubmit = (e) => {
  e.preventDefault();

  refs.gallery.innerHTML = '';

  const input = refs.inputForm.elements.query;

  if (!input.value) {
    PNotify.info({
      text: 'No results were found for your request.',
    });
    return;
  }

  apiService.searchQuery = input.value;

  apiService.resetPage();

  axiosArticles();
};

const infinScroll = (target) => {
  const options = {
    rootMargin: '20px 0px',
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      axiosArticles();
    }
  }, options);

  observer.observe(target);
};

refs.inputForm.addEventListener('submit', handleSubmit);

refs.gallery.addEventListener('click', isOpenLightboxHandle);

refs.upwardBtn.addEventListener('click', toTot);

infinScroll(refs.borderObserver);

axiosArticles();
