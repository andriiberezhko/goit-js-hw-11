import './sass/main.scss';
import Notiflix from 'notiflix';
import makeSearch from './js/search_api';
import marckupTpl from './js/cardTpl';
import { config } from './js/config_api';
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

function onSearchFormSubmit(event) {
    event.preventDefault();
    if (!inputFieldValidation(event)) {
        return;
    } ;      
    makeSearch( config).then(data => {        
        if (data.totalHits === 0) {
            config.search = '';
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        };       
        config.page += 1;
        refs.loadMoreBtn.classList.remove('disabled');
        config.totalHits += config.perPage;
        event.target.reset();
        makeMarckUp(data);             
    })
        .catch(error => errorHandling());    
};

function onLoadMoreBtnClick() {
    
    makeSearch( config).then(data => {
        config.totalHits += config.perPage;
        
        makeMarckUp(data);
        if (config.totalHits >= data.totalHits) {
            refs.loadMoreBtn.classList.add('disabled');
            config.search = '';
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        };
        
    })
        .catch(error => errorHandling());
    
    config.page += 1;


};

function makeMarckUp(data) {
    const searchElement = data.hits.map(marckupTpl).join('');
    refs.gallery.insertAdjacentHTML('beforeend', searchElement);  
};

function clearMarckUp() {
    refs.gallery.innerHTML = ' ';
};

function inputFieldValidation(event) {
    if (event.currentTarget.elements.searchQuery.value.trim() === '') {
        clearMarckUp();
        refs.loadMoreBtn.classList.add('disabled');
        Notiflix.Notify.failure("Введи что нибудь!!!");
        return false;
    };    
    if (event.currentTarget.elements.searchQuery.value.trim() !== config.search) {
                
        config.search = event.currentTarget.elements.searchQuery.value;
        config.page = 1;
        refs.loadMoreBtn.classList.add('disabled');
        config.totalHits = 0;
        clearMarckUp();
        return true;
    };    
};

function errorHandling() {
    clearMarckUp();
            config.search = '';
            refs.loadMoreBtn.classList.add('disabled');
        return Notiflix.Notify.failure("Что то пошло не так((("); 
};


