const apiKey = your_api_key; 

window.onload=function(){
    getWeather("Dankuni");
}

function goto(){
    window.location.href="signin.html";
}


async function getWeather(location=document.getElementById("location").value) {
    
    if (!location) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ ${data.main.temp}°C`;
        document.getElementById("weather-description").innerText =` ⛅ ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;

        const iconCode = data.weather[0].icon;
        const iconurl= `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("weather-icon").src = iconurl;
        document.getElementById("weather-icon").alt = data.weather[0].description;

        const weatherCard = document.getElementById("weather-card");
        weatherCard.classList.remove("hidden");
        setTimeout(() => {
            weatherCard.classList.add("show");
            document.getElementById("view-more").onclick = function () {
                const weatherDetails = {
                    city: data.name,
                    country: data.sys.country,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    pressure: data.main.pressure,
                    feelsLike: data.main.feels_like,
                    visibility: data.visibility,
                    icon: iconCode
                };
                localStorage.setItem("weatherDetails", JSON.stringify(weatherDetails));
                window.location.href="details.html";
            };
        }, 100);
    } catch (error) {
        console.error("Error fetching weather data", error);
    }
}




