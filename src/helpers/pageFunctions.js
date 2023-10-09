import { getWeatherByCity, searchCities } from './weatherAPI';

function createElement(tagName, className, textContent = '') {
  const element = document.createElement(tagName);
  element.classList.add(...className.split(' '));
  element.textContent = textContent;
  return element;
}

function clearChildrenById(elementId) {
  const citiesList = document.getElementById(elementId);
  while (citiesList.firstChild) {
    citiesList.removeChild(citiesList.firstChild);
  }
}

function createCityElement(cityInfo) {
  const {
    name, country, temp, condition, icon,
  } = cityInfo;

  const cityElement = createElement('li', 'city');

  const headingContainer = createElement('div', 'city-heading');
  const nameElement = createElement('h2', 'city-name', name);
  const countryElement = createElement('p', 'city-country', country);
  headingContainer.appendChild(nameElement);
  headingContainer.appendChild(countryElement);

  const weatherContainer = createElement('div', 'weather-container');
  const tempElement = createElement('p', 'city-temp', `${temp}º`);
  const conditionElement = createElement('p', 'city-condition', condition);
  weatherContainer.appendChild(conditionElement);
  weatherContainer.appendChild(tempElement);

  const iconElement = createElement('img', 'weather-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const infoContainer = createElement('div', 'city-info-container');
  infoContainer.appendChild(weatherContainer);
  infoContainer.appendChild(iconElement);

  cityElement.appendChild(headingContainer);
  cityElement.appendChild(infoContainer);

  return cityElement;
}

export default async function handleSearch(event) {
  event.preventDefault();
  clearChildrenById('cities');

  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value;

  const cities = await searchCities(searchValue);

  const citiesWeather = cities.map(async (city) => {
    const weatherInfo = await getWeatherByCity(city.url);
    const { temp, condition, icon } = weatherInfo;
    return {
      name: city.name,
      country: city.country,
      temp,
      condition,
      icon,
    };
  });

  const weatherData = await Promise.all(citiesWeather);

  const citiesList = document.getElementById('cities');

  weatherData.forEach((cityInfo) => {
    const cityElement = createCityElement(cityInfo);
    citiesList.appendChild(cityElement);
  });
}
