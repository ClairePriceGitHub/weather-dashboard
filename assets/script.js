const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const cityName = 'London';
const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;



// Function to add button below search button
function addButton(cityName) {
    const addButton = $('<button>');
    addButton.css({
        'width': '100%',
        'height': '5vh',
        'backgroundColor': 'lightGrey',
        'borderRadius' : '5px',
        'border' : 'none',
        'margin-bottom' : '15px'
    });
    addButton.text(cityName);
    $('.input-group-append').append(addButton);
}

// On click add button and reassign city name
$('.search-button').on('click', (event, cityName) => {
    event.preventDefault();
    const weatherSearch = $('.weather-search');
    if (weatherSearch.val()) {
        cityName = weatherSearch.val(); 
    } 
    addButton(cityName);
})



// Fetch based on London as default
fetch(queryUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
  
    console.log(data);
    console.log(data.list[0]);
    console.log('temp: ' + data.list[0].main.temp);
    console.log('humidity: ' + data.list[0].main.humidity + '%');
    console.log('wind: ' + data.list[0].wind.speed);

const todayOuterContainer = $('#today');
const todayContainer = $('<div>').css('border', '5px');
todayContainer.css({
    'padding': '5px',
    'border': '1px solid black'
})

const todayHeader = $('<h2 class="today-header">').text(cityName);

const tempValue = data.list[0].main.temp;
const windValue = data.list[0].wind.speed;
const humidityValue = data.list[0].main.humidity;
const todayTemp = $('<p class="today-temp">').text(`Temp: ${tempValue}`);
const todayWind = $('<p class="today-wind">').text(`Wind: ${windValue} KPH`);
const todayHumidity = $('<p class="today-humidity">').text(`Humidity: ${humidityValue}%`);

todayOuterContainer.append(todayContainer);
todayContainer.append(todayHeader, todayTemp, todayWind, todayHumidity);





})



// const forecast = ['', '', '', '', ''];
// for (var i=0; i < forecast.length; i++) {
//     const futureDay =  
// };