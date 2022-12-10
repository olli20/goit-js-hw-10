import './css/styles.css';
var debounce = require('lodash.debounce');

const refs = {
    inputQuery: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const handleInput = (event) => {
    event.preventDefault();
        const query = event.target.value.trim();
        console.log(query);
        fetchCountries(query)
            .then(catchCountry)
            .catch(error => console.log(error));
};

refs.inputQuery.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));


const fetchCountries = (query) => {
    return fetch(`https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`)
        .then(r => r.json());
};

const catchCountry = (countriesList) => {

    console.log(countriesList);
    console.log(countriesList.length);

    if (countriesList.length === 1) {

        // const languagesObj = Object.values(countriesList[0].languages);
        // const languages = languagesObj.join(", ");

        const countryData = {
            commonName: countriesList[0].name.common,
            capital: countriesList[0].capital[0],
            population: countriesList[0].population,
            flag: countriesList[0].flags.svg,
            languages: Object.values(countriesList[0].languages).join(", "),
        };

        renderCountry(countryData);

        console.log('One country ', countryData);
    } else if (countriesList.length > 1 && countriesList.length <= 10) {
        console.log('2 - 10 countries ');
    } else if (countriesList.length > 10) {        
        console.log('Too many matches found. Please enter a more specific name.');
    };
};

const renderCountry = ({ commonName, capital, population, flag, languages}) => {
    const markup = `
    <div class="country-info__title-container">
        <img src=${flag} width='40px'>
        <h1 class="country-info__name">${commonName}<h1>
    </div>
    <ul class="country-info__list">
        <li class="country-info__list-item"><span class="country-info__list-key">Capital:</span> ${capital}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Population:</span> ${population}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Languages:</span> ${languages}</li>
    </ul>`

    refs.countryInfo.innerHTML = markup;
};