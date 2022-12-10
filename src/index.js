import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

const handleInput = (event) => {
    event.preventDefault();
    
    const query = event.target.value.trim();

    if (query === "") {
        clearHTML();
        return;
    };

    fetchCountries(query)
        .then(handleResponse)
        .catch(onError);
};

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

// fetch data
const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(r => r.json());
};

const handleResponse = (response) => {
    if (response.status === 404) {
        clearHTML();
        on404();
        return;
    }

    if (response.length === 1) {
        clearHTML();
        const countryData = getCountryData(response);
        renderCountryCard(countryData);

    } else if (response.length > 1 && response.length <= 10) {
        clearHTML();
        renderCountriesList(response);

    } else if (response.length > 10) {        
       onOverload();
    };
};

// one counttry card
const renderCountryCard = (countryData) => {
    const markup = getCountryCardTemplate(countryData);
    refs.info.innerHTML = markup;
};

const getCountryData = (response) => {
    return {
            commonName: response[0].name.common,
            capital: response[0].capital.join(", "),
            population: response[0].population,
            flag: response[0].flags.svg,
            languages: Object.values(response[0].languages).join(", "),
        };
}

const getCountryCardTemplate = ({ commonName, capital, population, flag, languages}) => `
    <div class="country-info__title-container">
        <img class="country-info__flag" alt="The Flag of ${commonName}" src=${flag} width='35px'>
        <h1 class="country-info__name">${commonName}</h1>
    </div>
    <ul class="country-info__list list">
        <li class="country-info__list-item"><span class="country-info__list-key">Capital:</span> ${capital}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Population:</span> ${population}</li>
        <li class="country-info__list-item"><span class="country-info__list-key">Languages:</span> ${languages}</li>
    </ul>`;

// list of conutries
const getCountriesListItemTemplate = ({ commonName, flag }) => `
    <li class="country-list__list-item"><img class="country-list__flag" width="35px" src=${flag} ><span>${commonName}</span></li>`;    

const renderCountriesList = (response) => {
    let listMarkup = "";

    for (i = 0; i < response.length; i += 1) {
        const data = {
            commonName: response[i].name.common,
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
    Notify.failure("Oops, there is no country with that name");
};

const onError = () => {
    Notify.failure("Something went wrong. Please, check your internet connection, try again or try later.");
};

const onOverload = () => {
    Notify.info('Too many matches found. Please enter a more specific name.');
}