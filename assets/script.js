const apiKey = 'a26f42af7a79688b36f7437ceea8de52';
const lat = 51.509865;
const lon = -0.118092;
const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;




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
})