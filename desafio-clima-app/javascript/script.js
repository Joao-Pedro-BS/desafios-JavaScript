// Variaveis e mapeamento
const apiKey = 'ff5e90bb79e1443b864b6a801fb8cced';
const apiFlags = "https://flagsapi.com/BR/flat/64.png";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search');

const cityElement = document.querySelector('#city');
const flagElement = document.querySelector('#country');
const windElement = document.querySelector('#wind span');
const descElement = document.querySelector('#description');
const umidElement = document.querySelector('#umidity span');
const tempElement = document.querySelector('#temperature span');
const descIconElement = document.querySelector('#description-icon');
const weatherContainer = document.querySelector('#weather-data');
//Funcoes
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
}

const showWeatherData = async(city) => {
    const data = await getWeatherData(city);
    const flagCountry  = await data.sys.country;

    cityElement.innerText = data.name;
    umidElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    flagElement.setAttribute('src', `https://flagsapi.com/${flagCountry}/flat/64.png`);

    weatherContainer.classList.remove('hide');
};

// Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});