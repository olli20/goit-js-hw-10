import '../css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetch-countries';
import getRefs from './get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const handleInput = (event) => {
    event.preventDefault();
    
    const query = event.target.value.trim();

    if (query === "") {
        clearHTML();
        return;
    };

    API.fetchCountries(query)
        .then(handleResponse)
        .catch(onError);
};

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

const handleResponse = (response) => {
    if (response.status === 404) {
        clearHTML();
        on404();
        return;
    };

    if (response.length === 1) {
        clearHTML();
        renderCountryCard(response);

    } else if (response.length > 1 && response.length <= 10) {
        clearHTML();
        renderCountriesList(response);

    } else if (response.length > 10) { 
        clearHTML();
        onOverload();
    };
};


// one country card
const getCountryCardTemplate = ({ officialName, capital, population, flag, languages}) => `
    <div class="country-info__title-container">
        <img class="country-info__flag" alt="The Flag of ${officialName}" src=${flag} width='20px'>
        <h1 class="country-info__name">${officialName}</h1>
    </div>
    <ul class="country-info__list list">
        <li class="country-info__list-item"><span class="country-info__list-key">Capital:</span> ${capital}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Population:</span> ${population}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Languages:</span> ${languages}</li>
    </ul>`;

const renderCountryCard = (response) => {
    const countryData = {
            officialName: response[0].name.official,
            capital: response[0].capital.join(", "),
            population: response[0].population,
            flag: response[0].flags.svg,
            languages: Object.values(response[0].languages).join(", "),
        };

    const markup = getCountryCardTemplate(countryData);
    refs.info.innerHTML = markup;
};

// list of countries
const getCountriesListItemTemplate = ({ officialName, flag }) => `
    <li class="country-list__list-item">
        <img class="country-list__flag" alt="The Flag of ${officialName}" width="20px" src=${flag} >
        <span>${officialName}</span>
    </li>`;    

const renderCountriesList = (response) => { 
    let listMarkup = "";

    for (let i = 0; i < response.length; i += 1) {
        const data = {
            officialName: response[i].name.official,
            flag: response[i].flags.svg,
        };

        listMarkup += getCountriesListItemTemplate(data);
    };
    
    refs.list.innerHTML = listMarkup;
};

// other funcs
const clearHTML = () => {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
};

const on404 = () => {
    Notify.failure('Oops, there is no country with that name');
};

const onError = () => {
    Notify.failure('Something went wrong. Please, check your internet connection.');
};

const onOverload = () => {
    Notify.info('Too many matches found. Please enter a more specific name.');
}