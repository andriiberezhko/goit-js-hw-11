
const axios = require('axios').default;

export default async function  makeSearch({baseUrl,search,apiKey,page,perPage} ) {
    const url = `${baseUrl}&key=${apiKey}&q=${search}&page=${page}&per_page=${perPage}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
    // return axios.get(url)
    //     .then(response => {
    //         if (response.status !== 200) {
                
    //             throw new Error(response.statusText);
    //         };
    //      return response.data;
    //     }); 
};
