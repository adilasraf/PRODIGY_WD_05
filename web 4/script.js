const APIKEY = 'c4b469446da64a62a7455412241903';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Referencing output fields
const cityNameEl = document.getElementById('city-name');
const countryNameEl = document.getElementById('countryName');
const localTimeEl = document.getElementById('loc-time');
const tempEl = document.getElementById('temp');
const supEl = document.getElementById('sup');

async function getData(KEY, city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=yes`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error("City not found or API error");
    }

    return await response.json();
}

searchBtn.addEventListener('click', async () => {
    const input = cityInput.value.trim();
    const outputCard = document.getElementById('outputCard');

    if (!input) {
        alert("Please enter a city or country name.");
        return;
    }

    try {
        const result = await getData(APIKEY, input);
        outputCard.style.visibility = 'visible';

        // Using correct backticks for template literals
        cityNameEl.innerText = `${result.location.name}, ${result.location.region}`;
        countryNameEl.innerText = `${result.location.country}`;
        tempEl.innerText = `${result.current.temp_c}`;
        supEl.innerText = '°C';
        localTimeEl.innerText = `${result.location.localtime}`;
    } catch (error) {
        outputCard.style.visibility = 'hidden';
        alert(error.message);
    }
});
