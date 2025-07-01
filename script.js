document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning("Carregando...");

        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f27a37ef7f7ab754ae3bff3762c7ef07&units=metric&lang=pt_br`;

        let result = await fetch(URL);
        let json = await result.json();
        
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAgle: json.wind.deg,
            });
        }
        
        else {
            clearInfo();
            showWarning("Não encontramos esta localização.");
        }

    }

    else {
        clearInfo();
    }
})

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAgle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg 
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}