function forecastIcon(iconArr) {
    $('.fiveIcon').each(function(i) {
        if (iconArr[i] === '01d' || iconArr[i] === '01n') {
            $(this).attr('src', 'images/01_01d.png');
        } else if (iconArr[i] === '02d' || iconArr[i] === '02n') {
                $(this).attr('src', 'images/01_02d.png');
        } else if (iconArr[i] === '03d' || iconArr[i] === '03n') {
            $(this).attr('src', 'images/01_03d.png');
        } else if (iconArr[i] === '04d' || iconArr[i] === '04n') {
            $(this).attr('src', 'images/01_03d.png');
        } else if (iconArr[i] === '09d' || iconArr[i] === '09n') {
            $(this).attr('src', 'images/01_09d.png');
        } else if (iconArr[i] === '10d' || iconArr[i] === '10n') {
                $(this).attr('src', 'images/01_10d.png');
        } else if (iconArr[i] === '11d' || iconArr[i] === '11n') {
            $(this).attr('src', 'images/01_11d.png');
        } else if (iconArr[i] === '13d' || iconArr[i] === '13n') {
            $(this).attr('src', 'images/01_13d.png');
        } else {
            $(this).attr('src', 'images/01_50d.png')
        }; 
    });
}
