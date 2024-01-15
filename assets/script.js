// Initial variables
const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const today = dayjs().format('DD/MM/YYYY');
let cityNames = [];
let currentCityName = 'London';
let iconArr = [];

// General styling
$('.weather-header').css({
    'backgroundImage': 'linear-gradient(to right, cornflowerblue, #333366)'
})
$('.input-group').css('display', 'block');
$('.weather-search').css({
    'display': 'block',
    'width': '100%',
    'height': '6vh',
    'borderRadius': '5px',
    'paddingLeft': '5px'
});
$('.search-button').css({
    'backgroundColor': 'cornflowerblue',
    'width': '100%',
    'marginTop': '15px'
})
$('.form').css({
    'borderBottom': '1px'
})
$('<h2>').css('margin', '0px')

// Initialise default city forecast
currentDay(currentCityName);
fiveDay(currentCityName);

// Function to add buttons below search button 
function addButton(currentCityName) {
    const cityButton = $('<button class="searched-city">').text(currentCityName);
    cityButton.css({
        'width': '100%',
        'height': '5vh',
        'backgroundColor': 'lightGrey',
        'borderRadius' : '5px',
        'border' : 'none',
        'margin-bottom' : '15px'
    });
    cityButton.insertAfter($('.hr'));
    //$('.input-group-append').append(cityButton);
};

// Function to fetch current day forecast using the current city
function currentDay(currentCityName) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       //console.log(data.list);
       //console.log(data.list[0].weather[0].icon);
        // Add todays forecast structure and styling
        $('#today').empty();
        const icon = data.list[0].weather[0].icon;
        const todayOuterContainer = $('#today');
        const todayContainer = $('<div>').css({
            'padding': '5px',
            'border': '1px solid black'
        });
        const headerContainer = $('<div>').css({
            'display': 'flex',
            'alignItems': 'end',
            'marginBottom': '8px'
        });
        const headerValue = data.city.name;
        const tempValue = (data.list[0].main.temp - 273.15).toFixed(2);
        const windValue = (data.list[0].wind.speed * 3.6).toFixed(2);
        const humidityValue = data.list[0].main.humidity;
        const todayHeader = $('<h2 class="today-header">').text(`${headerValue} ${today}`);
        const todayImg = $('<img class="fiveIcon" src="" height="60px">');
        const todayTemp = $('<p class="today-temp">').text(`Temp: ${tempValue} °C`);
        const todayWind = $('<p class="today-wind">').text(`Wind: ${windValue} KPH`);
        const todayHumidity = $('<p class="today-humidity">').text(`Humidity: ${humidityValue}%`);
        todayOuterContainer.append(todayContainer);
        todayContainer.append(headerContainer, todayTemp, todayWind, todayHumidity);
        headerContainer.append(todayHeader, todayImg);
        iconArr.push(icon);
    })
};

// Function to fetch 5-Day forecast using the current city
function fiveDay(currentCityName) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        $('#forecast').empty();
        const fiveHeader = $('<h4>').text('5-Day Forecast:');
        const fiveOuterContainer = $('<div>');
        fiveOuterContainer.css({
            'display' : 'flex',
            'justifyContent' : 'space-between'
        });
        $('#forecast').append(fiveHeader, fiveOuterContainer);
        for (let i=1; i < 6; i++) {
            const nextDay = dayjs().add([i], 'd').format('DD/MM/YYYY');
            const fiveContainer = $('<div>');
            fiveContainer.css({
                'backgroundColor' : '#333366',
                'color' : 'white',
                'padding' : '5px',
                'width' : '18%'
            })
            const fiveTempVal = (data.list[i].main.temp - 273.15).toFixed(2);
            const fiveWindVal = (data.list[i].wind.speed * 3.6).toFixed(2);
            const fiveHumidityVal = data.list[i].main.humidity;
            const fiveSubHeader = $('<h5 class="five-header">').css('padding-bottom', '5px').text(nextDay);
            const fiveIcon = $('<img class="fiveIcon" src="" height="50px">').css('padding-bottom', '10px');
            const fiveTemp = $('<p class="five-temp">').text(`Temp: ${fiveTempVal} °C`);
            const fiveWind = $('<p class="five-wind">').text(`Wind: ${fiveWindVal} KPH`);
            const fiveHumidity = $('<p class="five-humidity">').text(`Humidity: ${fiveHumidityVal} %`);
            fiveOuterContainer.append(fiveContainer);
            fiveContainer.append(fiveSubHeader, fiveIcon, fiveTemp, fiveWind, fiveHumidity);
            icon = data.list[i].weather[0].icon;
            iconArr.push(icon);
            forecastIcon(iconArr);
        };
    })
};

// Function to save to local storage
function setLocalStorage() {
    localStorage.setItem('cityNames', JSON.stringify(cityNames));
};

// Function to check if there is local storage saved data and update display
function updateDisplay(addButton) {
    var stored = JSON.parse(localStorage.getItem('cityNames'));
    if (stored) {
        cityNames = stored;
        for (let i = cityNames.length - 1; i >= 0; i--) {
            addButton(cityNames[i]);
        }
    };
};
updateDisplay(addButton);

// Removes last child if local store buttons greater than 6
function sixButtonsMax(cityNames) {
    const numButtons = $('.searched-city').length;
    if (numButtons > 6) {
        $('.input-group-append > :last-child').remove();
        cityNames.pop();
    };
};

// On click of Search button add local storage button and show forecast for corresponding city
$('.search-button').on('click', (event) => {
    event.preventDefault();
    const city = $('.weather-search').val(); 
    const cityFormat = city.charAt(0).toUpperCase() + city.slice(1);
    currentCityName = cityFormat;
    if (city) {
        addButton(currentCityName);
        cityNames.unshift(currentCityName);
        currentDay(currentCityName);
        fiveDay(currentCityName);
        iconArr.splice(0, iconArr.length);
        sixButtonsMax(cityNames);
    };
    $('.weather-search').val('');
    setLocalStorage();
});

// On click of any local storage button show forecast for corresponding city
$('.searched-city').on('click', (event) => {
    event.preventDefault();
    currentCityName = $(event.currentTarget).text();
    currentDay(currentCityName);
    fiveDay(currentCityName);
    iconArr.splice(0, iconArr.length);
});


