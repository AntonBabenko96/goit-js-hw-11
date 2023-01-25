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
let numCard = 1;
loadMore.style.display = 'none'
function onBtnSearch(e) {
    e.preventDefault();
    numCard = 0;
    pageNumber = 1;
    const inputValue = searchInput.value;
       if (inputValue.trim() !== '' && inputValue !== valueSave) {
           getPhoto(inputValue, pageNumber).then(foundData => {
            gallery.innerHTML = ''
            if (foundData.data.hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            else if (foundData.data.totalHits <= 40) {
                makeMurkup(foundData.data.hits);
                Notiflix.Notify.success(`"Hooray! We found ${foundData.data.totalHits} images."`);
                numCard += 40;
                valueSave = inputValue
                loadMore.style.display = 'none'
            }
            else {
                makeMurkup(foundData.data.hits);
                Notiflix.Notify.success(`"Hooray! We found ${foundData.data.totalHits} images."`);
                loadMore.style.display = 'flex'
                numCard += 40;
                valueSave = inputValue
            }
            // console.log(valueSave)
        })
           
    } else {
        Notiflix.Notify.failure('The search field is not filled');
    }
    
};

function btnLoadMore(e) {
    e.preventDefault;
    pageNumber++
    numCard += 40;
    if (valueSave !== '') {
        getPhoto(valueSave, pageNumber).then(foundData => {
            if (numCard < foundData.data.totalHits) {
                makeMurkup(foundData.data.hits);
                Notiflix.Notify.success(`Add new photo`);
                // console.log(numCard)
            } else {
                makeMurkup(foundData.data.hits);
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                loadMore.style.display = 'none';
            }
        })
       
    } 
    
};
searchForm.addEventListener("submit", onBtnSearch);
loadMore.addEventListener("click", btnLoadMore);