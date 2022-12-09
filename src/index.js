import './css/styles.css';
var debounce = require('lodash.debounce');

const refs = {
    inputQuery: document.querySelector('#search-box'),
};

const DEBOUNCE_DELAY = 300;
const handleInput = (event) => {
    event.preventDefault();
        const query = event.target.value;
        console.log(query);
        fetchCountries(query)
            .then(renderCountry)
            .catch(error => console.log(error));
};

refs.inputQuery.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));



const fetchCountries = (query) => {
    return fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(r => r.json());
};

const renderCountry = (countriesList) => {

    console.log(countriesList);
    console.log(countriesList.length);
    if (countriesList.length === 1) {
        console.log('One country ');
    } else if (countriesList.length > 1 && countriesList.length <= 10) {
        console.log('2 - 10 countries ');
    } else if (countriesList.length > 10) {
        console.log('too much ');
    };
};