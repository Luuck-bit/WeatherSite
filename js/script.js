const tempIcon = {
    "clear sky": "wi wi-day-sunny",
    "few clouds": "wi wi-day-cloudy",
    "scattered clouds": "wi wi-cloud",
    "broken clouds": "wi wi-cloudy",
    "shower rain": "wi wi-showers",
    "rain": "wi wi-rain",
    "heavy rain": "wi wi-rain",
    "thunderstorm with rain": "wi wi-thunderstorm",
    "thunderstorm": "wi wi-thunderstorm",
    "snow": "wi wi-snow",
    "mist": "wi wi-fog"
};





const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();
const dayIndex = today.getDay();

const apiKey = ``;
const locate = document.getElementById('places');
const form = document.getElementById('locationForm');
const currentlyLocation = document.getElementById('currentlyLocate');
const stateOfPlace = document.getElementById('state');
const windSpeedSection = document.getElementById('wind_speed');
const temperature = document.getElementById('temperature');
const nextDaysSection = document.getElementById('nextDays');
const currentlyDay = document.getElementById('currentlyDay');
const titleLocation = document.getElementById('titleLocation');




form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectPlace = locate.value;
    currentlyLocation.innerHTML = `${selectPlace}`
    
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${selectPlace}&key=${apiKey}`

    
    
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.data && data.data[0]) {
            titleLocation.innerHTML = `<h1>My currently Locate:</h1>`
            const currentData = data.data[0];
            const temperatureLocate = currentData.temp;
            temperature.innerHTML = `<h1>${temperatureLocate}°C</h1>`;
            const state = currentData.weather.description; 
            const iconState = state.toLowerCase();
            stateOfPlace.innerHTML = `${state} <i class="${tempIcon[iconState]}"></i>`; 
            const wind = currentData.wind_spd;
            windSpeedSection.innerHTML = `Wind Speed: ${wind} Km/H`;


            const nextDays = data.data.slice(1, 6)
            nextDaysSection.innerHTML = '';

            nextDays.forEach((day, index) => {
                    const article = document.createElement('article');
                    const dayDate = new Date(day.valid_date).toLocaleDateString();
                    const maxTemp = day.app_max_temp;
                    const minTemp = day.app_min_temp;
                    const weatherDescription = day.weather.description;
                    const iconNextDays = weatherDescription.toLowerCase();
                    

                    const dayOfWeek = weekDays[(dayIndex + index + 1) % 7];
                    
                    console.log(data)
                    article.innerHTML = `
                        <h2>${dayOfWeek}</h2>
                        <h3>${dayDate}</h3>
                        <p><strong>Max Temp:</strong> ${maxTemp}°C</p>
                        <p><strong>Min Temp:</strong> ${minTemp}°C</p>
                        <h2>${weatherDescription}<br> <i class="${tempIcon[iconNextDays]}"></i></h2>
                    `;
                    nextDaysSection.appendChild(article);

                    currentlyDay.innerHTML = `${weekDays[dayIndex]}`
            })

        } else {
            console.error(`API Error: ${data.error.info}`);
            temperature.innerHTML = `<h1>Falha ao Carregar as informações de ${selectPlace}</h1>`;
        }
    })
    .catch(error => {
        console.error('Request failed', error);
        temperature.innerHTML = `<h1>Erro ao acessar os dados de ${selectPlace}</h1>`;
    });

        

    
})


