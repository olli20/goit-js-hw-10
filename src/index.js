import './css/styles.css';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};


const handleInput = (event) => {
    event.preventDefault();
    
    const query = event.target.value.trim();
    console.log(query);

    if (query === "") {
        clearHTML();
        return;
    };

    fetchCountries(query)
        .then(handleResponse)
        .catch(error => console.log("Error"));
};

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));




// відправляємо запит і отримуємо відповідь сервера
const fetchCountries = (query) => {
    return fetch(`https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`)
        .then(r => r.json());
};

// перевіряємо відповідь сервера і вибираємо дію
const handleResponse = (response) => {
    // якщо пришла помилка 404


    // якщо повернувся масив з однією країною
    if (response.length === 1) {

        // очищюємо в HTML елемент зі списком країн
        refs.list.innerHTML = "";

        // формуємо об'єкт з даними про країну
        const countryData = {
            commonName: response[0].name.common,
            capital: response[0].capital.join(", "),
            population: response[0].population,
            flag: response[0].flags.svg,
            languages: Object.values(response[0].languages).join(", "),
        };

        renderCountryCard(countryData);

        console.log('One country ', countryData);

    // якщо повернулось від 2 до 10 країн
    } else if (response.length > 1 && response.length <= 10) {
        refs.info.innerHTML = "";

        renderCountriesList(response);

        console.log('2 - 10 countries ');

    // якщо повернулось більше 10 країн
    } else if (response.length > 10) {        
        console.log('Too many matches found. Please enter a more specific name.');
    };
};

// рендеримо розмітку однієї країни
const renderCountryCard = (countryData) => {
    const markup = getCountryCardTemplate(countryData);
    refs.info.innerHTML = markup;
};

// генеруємо розмітку картки однієї країни
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

// геренуємо розмітку рядка спику країни
const getCountriesListItemTemplate = ({ commonName, flag }) => `
    <li><img class="country-list__flag" width="35px" src=${flag} ><span>${commonName}</span></li>`;    


// геренуємо і рендеримо розмітку спику країни
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

const clearHTML = () => {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
};