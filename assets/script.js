const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const cityNames = [];
let currentCityName = 'London';
const today = dayjs().format('DD/MM/YYYY');



// Initialise default city forecast
currentDay(currentCityName);
fiveDay(currentCityName);

// Function to save to local storage
function setLocalStorage() {
    localStorage.setItem('city names', JSON.stringify(cityNames));
};




// // Function to check if there is local storage saved data 
// function updateDisplay() {
//     var $getTimeSlots = JSON.parse(localStorage.getItem('city names'));
//     if ($getTimeSlots) {
//         $('.row #input').each(function(index) {
//             $(this).text($getTimeSlots[index].input);
//         });  
//     }
// };
// updateDisplay();


// Function to add buttons below search button 
function addButton(currentCityName) {
    const addButton = $('<button class="searched-city">');
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
};


// Function to fetch using the current city
function currentDay(currentCityName) {
    // Add todays forecast structure and styling
    $('#today').empty();
    const todayOuterContainer = $('#today');
    const todayContainer = $('<div>');
    todayContainer.css({
        'padding': '5px',
        'border': '1px solid black'
    });
    const todayHeader = $('<h2 class="today-header">').css('paddingBottom', '7px');
    const todayTemp = $('<p class="today-temp">');
    const todayWind = $('<p class="today-wind">');
    const todayHumidity = $('<p class="today-humidity">');
    todayOuterContainer.append(todayContainer);
    todayContainer.append(todayHeader, todayTemp, todayWind, todayHumidity);
    // Fetch data
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const headerValue = data.city.name;
        const tempValue = data.list[0].main.temp;
        const windValue = data.list[0].wind.speed;
        const humidityValue = data.list[0].main.humidity;
        todayHeader.text(`${headerValue} ${today}`);
        todayTemp.text(`Temp: ${tempValue}`);
        todayWind.text(`Wind: ${windValue} KPH`);
        todayHumidity.text(`Humidity: ${humidityValue}%`);
    })
};


function fiveDay(currentCityName) {
    // Adds 5-Day forecast structure and styling
    $('#forecast').empty();
    const fiveHeader = $('<h4>').text('5-Day Forecast:');
    const fiveOuterContainer = $('<div>');
    fiveOuterContainer.css({
        'display' : 'flex',
        'justifyContent' : 'space-between'
    });
    $('#forecast').append(fiveHeader, fiveOuterContainer);
    // Fetch data
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i=1; i < 6; i++) {
            const fiveContainer = $('<div>');
            fiveContainer.css({
                'backgroundColor' : '#333366',
                'color' : 'white',
                'padding' : '5px',
                'width' : '18%'
            })
            const fiveSubHeader = $('<h5 class="five-header">');
            const weatherImg = $('<img src="images/1530370_weather_clouds_hail_hailstone_snow_icon.png" height="60px">');
            
            const fiveTemp = $('<p class="five-temp">');
            const fiveWind = $('<p class="five-wind">');
            const fiveHumidity = $('<p class="five-humidity">');
            fiveOuterContainer.append(fiveContainer);
            fiveContainer.append(fiveSubHeader, weatherImg, fiveTemp, fiveWind, fiveHumidity);
            let fiveTempVal = data.list[i].main.temp;
            let fiveWindVal = data.list[i].wind.speed;
            let fiveHumidityVal = data.list[i].main.humidity;
            let nextDay = new dayjs().add([i], 'd').format('DD/MM/YYYY');
            fiveSubHeader.text(nextDay);
            fiveTemp.text(`Temp: ${fiveTempVal} C`);
            fiveWind.text(`Wind: ${fiveWindVal} KPH`);
            fiveHumidity.text(`Humidity: ${fiveHumidityVal} %`);
        };
    })
};


// On click add button and reassign city name
$('.search-button').on('click', (event) => {
    event.preventDefault();
    const weatherSearch = $('.weather-search');
    currentCityName = weatherSearch.val(); 
    cityNames.push(currentCityName);
    addButton(currentCityName);
    currentDay(currentCityName);
    fiveDay(currentCityName);
    setLocalStorage();
})




