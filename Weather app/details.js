window.onload = function () {
    const weatherDetails = JSON.parse(localStorage.getItem("weatherDetails"));

    if (!weatherDetails) {
        showalert("No weather details found!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("city-name").innerText = `${weatherDetails.city}, ${weatherDetails.country}`;
    document.getElementById("temperature").innerText = `🌡️ Temperature: ${weatherDetails.temperature}°C`;
    document.getElementById("weather-description").innerText = `⛅ ${weatherDetails.description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${weatherDetails.humidity}%`;
    document.getElementById("wind-speed").innerText = `💨 Wind Speed: ${weatherDetails.windSpeed} m/s`;
    document.getElementById("pressure").innerText = `🔽 Pressure: ${weatherDetails.pressure} hPa`;
    document.getElementById("feels-like").innerText = `🔥 Feels Like: ${weatherDetails.feelsLike}°C`;
    document.getElementById("visibility").innerText = `👀 Visibility: ${weatherDetails.visibility} meters`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`;
};

function goBack() {
    window.location.href = "index.html";
}