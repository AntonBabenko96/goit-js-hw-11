import axios from "axios";
import Notiflix from 'notiflix';
const APIKEY = '33070880-37ece7646195d50eb585b4a16'
export async function getPhoto(value, num) {
   try {
     const response = axios.get('https://pixabay.com/api/', {
    params: {
        key: APIKEY,
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${num}`,
    }
})
      return response
   } catch (error) {
     Notiflix.Notify.failure(Error)
   }
}

  