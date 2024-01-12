const queryApi = 'a26f42af7a79688b36f7437ceea8de52';

let cities = ['Berlin', 'Paris', 'Edinburgh', 'Madrid', 'Birmingham', 'London'];

for (var i=0; i < cities.length; i++) {
    const addButton = $('<button>');
    addButton.text(cities[i]);
   // addButton.attr('cityname', cities[i])
    $('.input-group-append').append(addButton);
}