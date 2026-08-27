// API configuration
const apikey = "0069d85a58796c0ef2c647a19377b8a0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");
const healthAlert = document.getElementById("healthAlert");
const alertContent = document.getElementById("alertContent");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("img");

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    // Update theme icon
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTIuNzkgQTkgOSAwIDEgMSAxMS4yMSAzIDcgNyAwIDAgMCAyMSAxMi43OXoiPjwvcGF0aD48L3N2Zz4=";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNMTIgMnYyTTEyIDIwdjJNNi4zNCA2LjM0bC0uNzEuNzFNNy44NCAxNi4xNmwtLjcxLjcxTTIgMTJoMk0yMCAxMmgzTTYuMzQgMTcuNjZsLS43MS0uNzFNMTYuMTYgNy44NGwtLjcxLS43MSI+PC9wYXRoPjwvc3ZnPg==";
        localStorage.setItem("theme", "light");
    }
}

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTIuNzkgQTkgOSAwIDEgMSAxMS4yMSAzIDcgNyAwIDAgMCAyMSAxMi43OXoiPjwvcGF0aD48L3N2Zz4=";
}

themeToggle.addEventListener("click", toggleTheme);

// Weather data fetching
async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if (response.status === 404) {
            errorContainer.style.display = "block";
            weatherContainer.style.display = "none";
            healthAlert.style.display = "none";
            return;
        }

        const data = await response.json();
        console.log(data);

        // Update weather information
        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        windSpeed.textContent = data.wind.speed + " km/h";

        // Update weather icon based on condition
        const weatherCondition = data.weather[0].main;
        console.log(weatherCondition)
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "./image/clouds.png"

        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "./image/clear.png"

        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "./image/rain.png"

        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "./image/drizzle.png"

        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "./image/mist.png"

        } else if (weatherCondition === "Snow") {
            weatherIcon.src = "./image/snow.png"

        } else {
            weatherIcon.src = "./image/unknown weather.png"
        }

        // Generate health alerts
        generateHealthAlerts(data);

        // Show weather information
        errorContainer.style.display = "none";
        weatherContainer.style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
        healthAlert.style.display = "none";
    }
}

// Health alerts generation
function generateHealthAlerts(data) {
    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    let alerts = [];

    // Temperature-based alerts
    if (temp > 30) {
        alerts.push("High temperature: Stay hydrated and avoid prolonged sun exposure.");
    } else if (temp < 5) {
        alerts.push("Low temperature: Dress in layers to stay warm and prevent hypothermia.");
    }

    // Weather condition alerts
    if (condition === "Rain" || condition === "Drizzle") {
        alerts.push("Rainy conditions: Use umbrella and be cautious on slippery surfaces.");
    } else if (condition === "Snow") {
        alerts.push("Snowfall: Drive carefully and dress warmly to prevent frostbite.");
    }

    // Humidity alerts
    if (humidity > 80) {
        alerts.push("High humidity: May feel warmer than actual temperature. Stay hydrated.");
    } else if (humidity < 30) {
        alerts.push("Low humidity: May cause dry skin and respiratory discomfort. Use moisturizer.");
    }

    // Wind alerts
    if (wind > 20) {
        alerts.push("Strong winds: Secure loose objects and be cautious outdoors.");
    }

    // UV index (simulated)
    const uvIndex = Math.floor(Math.random() * 11); // Random UV index for demo
    if (uvIndex > 7) {
        alerts.push(`High UV index (${uvIndex}): Use sunscreen and wear protective clothing.`);
    } else if (uvIndex > 5) {
        alerts.push(`Moderate UV index (${uvIndex}): Consider sun protection during midday.`);
    }

    // Show alerts if any
    if (alerts.length > 0) {
        alertContent.innerHTML = alerts.join("<br>");
        healthAlert.style.display = "block";
    } else {
        healthAlert.style.display = "none";
    }
}

// Event listeners
searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim()) {
        checkWeather(searchInput.value);
    }
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        checkWeather(searchInput.value);
    }
});

// Initialize with default city
checkWeather("germany");