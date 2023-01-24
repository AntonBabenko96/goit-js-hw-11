export const gallery = document.querySelector(".gallery");
import { getPhoto } from './getPhoto.js'
import Notiflix from 'notiflix';
import { makeMurkup } from "./makeMurkup.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form input[name='searchQuery']");
const loadMore = document.querySelector(".load-more");

let valueSave = '';
let pageNumber = 1;
loadMore.style.display = 'none'

function onBtnSearch(e) {
    e.preventDefault();
    const inputValue = searchInput.value;
       if (inputValue.trim() !== '' && inputValue !== valueSave) {
        gallery.innerHTML = ''
        getPhoto(inputValue, pageNumber).then(foundData => {
            if (foundData.data.hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                makeMurkup(foundData.data.hits);
                Notiflix.Notify.success(`"Hooray! We found ${foundData.data.totalHits} images."`);
                loadMore.style.display = 'flex'
            }
            // console.log(valueSave)
        })
           valueSave = inputValue
    } else {
        Notiflix.Notify.failure('The search field is not filled');
    }
    
};
let numCard = 40;
function btnLoadMore(e) {
    e.preventDefault;
    const inputValue = searchInput.value;
    pageNumber++
   
    if (inputValue !== '') {
        getPhoto(inputValue, pageNumber).then(foundData => {
            if (numCard <= foundData.data.totalHits) {
                 makeMurkup(foundData.data.hits);
                 Notiflix.Notify.success(`Add new photo`);
                 loadMore.style.display = 'flex'
                numCard += 40;
                // console.log(numCard)
            } else {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                loadMore.style.display = 'none';

            }
        })
    } 
    
};
searchForm.addEventListener("submit", onBtnSearch);
loadMore.addEventListener("click", btnLoadMore);