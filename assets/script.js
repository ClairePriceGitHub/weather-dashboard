const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const lat = 51.509865;
const lon = -0.118092;
const cityName = 'london';
//const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;




$('.search-button').on('click', (event) => {
    event.preventDefault();
    const addButton = $('<button>');
    addButton.css({
        'width': '100%',
        'height': '5vh',
        'backgroundColor': 'lightGrey',
        'borderRadius' : '5px',
        'border' : 'none',
        'margin-bottom' : '15px'
    });
    const weatherSearch = $('.weather-search');
    let input = weatherSearch.val();  
    addButton.text(input);
    $('.input-group-append').append(addButton);
})

fetch(queryUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(queryUrl);
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

const todayHeader = $('<h2 class="today-header">').text('London');

const tempValue = data.list[0].main.temp;
const windValue = data.list[0].wind.speed;
const humidityValue = data.list[0].main.humidity;
const todayTemp = $('<p class="today-temp">').text(`Temp: ${tempValue}`);
const todayWind = $('<p class="today-wind">').text(`Wind: ${windValue} KPH`);
const todayHumidity = $('<p class="today-humidity">').text(`Humidity: ${humidityValue}%`);

todayOuterContainer.append(todayContainer);
todayContainer.append(todayHeader, todayTemp, todayWind, todayHumidity);



// const forecast = ['', '', '', '', ''];
// for (var i=0; i < forecast.length; i++) {
//     const futureDay =  
// };

})

