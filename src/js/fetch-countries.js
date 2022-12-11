const BASE_URL = 'https://restcountries.com/v3.1';
const OPTIONS = 'name,capital,population,flags,languages';

const fetchCountries = (name) => {
    return fetch(`${BASE_URL}/name/${name}?fields=${OPTIONS}`).then(r => r.json());
};

export default { fetchCountries };