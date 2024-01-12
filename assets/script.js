const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const cityNames = [];
let currentCityName = 'London';
currentCity(currentCityName);




// Adds todays forecast structure and styling
const todayOuterContainer = $('#today');
const todayContainer = $('<div>').css('border', '5px');
todayContainer.css({
    'padding': '5px',
    'border': '1px solid black'
})
const todayHeader = $('<h2 class="today-header">');
const todayTemp = $('<p class="today-temp">');
const todayWind = $('<p class="today-wind">');
const todayHumidity = $('<p class="today-humidity">');
todayOuterContainer.append(todayContainer);
todayContainer.append(todayHeader, todayTemp, todayWind, todayHumidity);





// Function to add buttons below search button including styling
function addButton(currentCityName) {
    const addButton = $('<button>');
    addButton.css({
        'width': '100%',
        'height': '5vh',
        'backgroundColor': 'lightGrey',
        'borderRadius' : '5px',
        'border' : 'none',
        'margin-bottom' : '15px'
    });
    addButton.text(currentCityName);
    $('.input-group-append').append(addButton);
}


// Function to fetch using the current city
function currentCity(currentCityName) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.list[0]);
        // console.log('temp: ' + data.list[0].main.temp);
        // console.log('humidity: ' + data.list[0].main.humidity + '%');
        // console.log('wind: ' + data.list[0].wind.speed);
        const headerValue = data.city.name;
        const tempValue = data.list[0].main.temp;
        const windValue = data.list[0].wind.speed;
        const humidityValue = data.list[0].main.humidity;
        todayHeader.text(headerValue);
        todayTemp.text(`Temp: ${tempValue}`);
        todayWind.text(`Wind: ${windValue} KPH`);
        todayHumidity.text(`Humidity: ${humidityValue}%`);
    })
}


// const forecast = ['', '', '', '', ''];
// for (var i=0; i < forecast.length; i++) {
//     const futureDay =  
// };


// On click add button and reassign city name
$('.search-button').on('click', (event) => {
    event.preventDefault();
    const weatherSearch = $('.weather-search');
    currentCityName = weatherSearch.val(); 
    cityNames.push(currentCityName);
    addButton(currentCityName);
    currentCity(currentCityName);
})

//console.log(cityName);


