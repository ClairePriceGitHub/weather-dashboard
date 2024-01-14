const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
let cityNames = [];
let currentCityName = 'London';
const today = dayjs().format('DD/MM/YYYY');

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
};

// Function to fetch current day forecast using the current city
function currentDay(currentCityName) {
    // Add todays forecast structure and styling
    $('#today').empty();
    const todayOuterContainer = $('#today');
    const todayContainer = $('<div>').css({
        'padding': '5px',
        'border': '1px solid black'
    });
    const headerContainer = $('<div>').css({
        'display': 'flex',
        'alignItems': 'center',

    });
    const todayHeader = $('<h2 class="today-header">');
    const todayImg = $('<img class="fiveIcon" src="" height="60px">');
    const todayTemp = $('<p class="today-temp">');
    const todayWind = $('<p class="today-wind">');
    const todayHumidity = $('<p class="today-humidity">');
    todayOuterContainer.append(todayContainer);
    todayContainer.append(headerContainer, todayTemp, todayWind, todayHumidity);
    headerContainer.append(todayHeader, todayImg);
   
   // imgSpan.append(todayImg);
    // Fetch data
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.list);
       //console.log(data.list[0].weather[0].icon);
        const headerValue = data.city.name;
        const tempValue = (data.list[0].main.temp - 273.15).toFixed(2);
        const windValue = (data.list[0].wind.speed * 3.6).toFixed(2);
        const humidityValue = data.list[0].main.humidity;
        
        const icon = data.list[0].weather[0].icon;
        console.log(icon);

        if (icon === "01d") {
            $('.fiveIcon').attr('src', 'images/01_01d.png');
        } else if (icon === '01n') {
            $('.fiveIcon').attr('src', 'images/01_01n.png');
        } else if (icon === '02d') {
            $('.fiveIcon').attr('src', 'images/01_02d.png');
        } else if (icon === '02n') {
            $('.fiveIcon').attr('src', 'images/01_02n.png');
        } else if (icon === '03d' || icon === '03n') {
            $('.fiveIcon').attr('src', 'images/01_03d.png');
        } else if (icon == '04d' || icon == '04n') {
            $('.fiveIcon').attr('src', 'images/01_03d.png');
        } else if (icon === '09d' || icon === '09n') {
            $('.fiveIcon').attr('src', 'images/01_09d.png');
        } else if (icon === '10d') {
            $('.fiveIcon').attr('src', 'images/01_10d.png');
        } else if (icon === '10n') {
            $('.fiveIcon').attr('src', 'images/01_10n.png');
        } else if (icon === '11d' || icon === '11n') {
            $('.fiveIcon').attr('src', 'images/01_11d.png');
        } else if (icon === '13d' || icon === '13n') {
            $('.fiveIcon').attr('src', 'images/01_13d.png');
        } else {
            $('.fiveIcon').attr('src', 'images/01_50d.png')
        }; 

        
        todayHeader.text(`${headerValue} ${today}`);
        todayTemp.text(`Temp: ${tempValue}`);
        todayWind.text(`Wind: ${windValue} KPH`);
        todayHumidity.text(`Humidity: ${humidityValue}%`);
        
    })
};

// Function to fetch 5-Day forecast using the current city
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
        for (let i=1; i < 6; i++) {
            const fiveContainer = $('<div>');
            fiveContainer.css({
                'backgroundColor' : '#333366',
                'color' : 'white',
                'padding' : '5px',
                'width' : '18%'
            })
            const fiveSubHeader = $('<h5 class="five-header">').css('padding-bottom', '5px');
            const fiveIcon = $('<img class="fiveIcon" src="" height="50px">').css('padding-bottom', '10px');
            const fiveTemp = $('<p class="five-temp">');
            const fiveWind = $('<p class="five-wind">');
            const fiveHumidity = $('<p class="five-humidity">');
            const fiveTempVal = (data.list[i].main.temp - 273.15).toFixed(2);
            const fiveWindVal = (data.list[i].wind.speed * 3.6).toFixed(2);
            const fiveHumidityVal = data.list[i].main.humidity;
            const nextDay = dayjs().add([i], 'd').format('DD/MM/YYYY');

            icon = data.list[i].weather[0].icon;
            console.log(icon);
            if (icon === "01d") {
                $('.fiveIcon').attr('src', 'images/01_01d.png');
            } else if (icon === '01n') {
                $('.fiveIcon').attr('src', 'images/01_01n.png');
            } else if (icon === '02d') {
                $('.fiveIcon').attr('src', 'images/01_02d.png');
            } else if (icon === '02n') {
                $('.fiveIcon').attr('src', 'images/01_02n.png');
            } else if (icon === '03d' || icon === '03n') {
                $('.fiveIcon').attr('src', 'images/01_03d.png');
            } else if (icon === '04d' || icon === '04n') {
                $('.fiveIcon').attr('src', 'images/01_03d.png');
            } else if (icon === '09d' || icon === '09n') {
                $('.fiveIcon').attr('src', 'images/01_09d.png');
            } else if (icon === '10d') {
                $('.fiveIcon').attr('src', 'images/01_10d.png');
            } else if (icon === '10n') {
                $('.fiveIcon').attr('src', 'images/01_10n.png');
            } else if (icon === '11d' || icon === '11n') {
                $('.fiveIcon').attr('src', 'images/01_11d.png');
            } else if (icon === '13d' || icon === '13n') {
                $('.fiveIcon').attr('src', 'images/01_13d.png');
            } else {
                $('.fiveIcon').attr('src', 'images/01_50d.png')
            }; 


            fiveOuterContainer.append(fiveContainer);
            fiveContainer.append(fiveSubHeader, fiveIcon, fiveTemp, fiveWind, fiveHumidity);
            fiveSubHeader.text(nextDay);
            fiveTemp.text(`Temp: ${fiveTempVal} C`);
            fiveWind.text(`Wind: ${fiveWindVal} KPH`);
            fiveHumidity.text(`Humidity: ${fiveHumidityVal} %`);
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
        for (let i=0; i < cityNames.length; i++) {
            addButton(cityNames[i]);
        }
    };
};
updateDisplay(addButton);

// On click of Search button add local storage button and show forecast for corresponding city
$('.search-button').on('click', (event) => {
    event.preventDefault();
    const city = $('.weather-search').val(); 
    const cityFormat = city.charAt(0).toUpperCase() + city.slice(1);
    currentCityName = cityFormat;
    addButton(currentCityName);
    cityNames.unshift(currentCityName);
    currentDay(currentCityName);
    fiveDay(currentCityName);
    setLocalStorage();
})

// On click of any local storage button show forecast for corresponding city
$('.searched-city').on('click', (event) => {
    event.preventDefault();
    currentCityName = $(event.currentTarget).text();
    currentDay(currentCityName);
    fiveDay(currentCityName);
})


