import { gallery } from "./index.js";
export function makeMurkup(data) {
    const maurkup = data.map((el) => {
        return `<div class="photo-card">
       <a href='${el.largeImageURL}'>
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <span>${el.likes}</span></b>
    </p>
    <p class="info-item">
      <b>Vievs: <span>${el.views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span>${el.comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span>${el.downloads}</span></b>
    </p>
  </div>
</div>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', maurkup)
    let photo = new SimpleLightbox('.gallery a');
};