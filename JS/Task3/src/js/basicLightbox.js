import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

function isOpenLightboxHandle(e) {
  const imageURL = e.target;
  if (imageURL.nodeName === 'IMG') {
    const showLightbox = basicLightbox.create(`
    <img src=${imageURL.getAttribute('data-origin-url')} alt="">
`);
    showLightbox.show();
  }
}

export default isOpenLightboxHandle;
