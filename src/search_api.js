
const axios = require('axios').default;

export default function makeSearch( {search,apiKey,page,perPage} ) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    return axios.get(url)
        .then(response => {
         return response.data;
        }); 
};