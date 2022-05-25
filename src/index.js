import './sass/main.scss';
import Notiflix from 'notiflix';
import makeSearch from './search_api';
import marckupTpl from './cardTpl';
import { config } from './config_api';

// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.5.min.css";




const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};



refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.classList.add('disabled');
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit (event) {
    event.preventDefault();
    if (config.search !== event.currentTarget.elements.searchQuery.value ) {
        config.search = event.currentTarget.elements.searchQuery.value;
        config.page = 1;
        refs.loadMoreBtn.classList.add('disabled');
        clearMarckUp();
    }
   
   
    
    return makeSearch(config).then(data => {
        config.totalHits = data.totalHits - config.perPage;
        console.log(config.totalHits);
            if (data.totalHits === 0) {
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        };
        config.page += 1;
        refs.loadMoreBtn.classList.remove('disabled');
        makeMarckUp(data);         
           
    });
    
};

function onLoadMoreBtnClick() {
    // console.log(config);
    makeSearch(config).then(data => {
        config.totalHits -= config.perPage;
        makeMarckUp(data);
    });
    console.log(config.totalHits);
    config.page += 1;


};

function makeMarckUp(data) {
    const searchElement = data.hits.map(marckupTpl).join('');
    refs.gallery.insertAdjacentHTML('beforeend', searchElement);  
};

function clearMarckUp() {
    refs.gallery.innerHTML = ' ';
}

