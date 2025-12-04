// Add your API key here (get one free from openweathermap.org)
const apiKey = "256fe6798e64376d68df8988cf59c598"; // Your OpenWeatherMap API key

console.log("🚀 Script loaded successfully!");

// Get DOM elements
const weatherForm = document.querySelector(".search-form");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

console.log("📍 DOM elements:", { weatherForm, cityInput, card });

// Add event listener to form
weatherForm.addEventListener("submit", async (event) => {
    console.log("🔥 Form submitted!");

    event.preventDefault(); // Prevent page reload
    
    const city = cityInput.value.trim();
    
    if (city) {
        try {
           // Show loading state
           displayLoading();
           const weatherData = await getWeatherData(city);
           displayWeather(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message || "Error fetching weather data");
        }
    } else {
        displayError("Please enter a city name");
    }
});

async function getWeatherData(city) {
   console.log(`Getting weather for: ${city}`);
   
   try {
       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
       console.log("API URL:", apiUrl);
       
       const response = await fetch(apiUrl);
       console.log("Response:", response);
       
       if (!response.ok) {
           throw new Error(`Weather API error: ${response.status}`);
       }
       
       const data = await response.json();
       console.log("Weather data:", data);
       
       return {
           city: data.name,
           temperature: Math.round(data.main.temp) + "°C",
           feelsLike: Math.round(data.main.feels_like) + "°C",
           humidity: data.main.humidity + "%",
           condition: data.weather[0].description,
           icon: getweatherEmoji(data.weather[0].main)
       };
   } catch (error) {
       console.error("Error fetching weather:", error);
       throw error;
   }
}

function displayWeather(data) {
    // Clear previous content
    card.innerHTML = "";
    
    // Create weather display elements
    card.innerHTML = `
        <div class="iconDisplay">${data.icon}</div>
        <h1 class="cityDisplay">${data.city}</h1>
        <div class="temDisplay">${data.temperature}</div>
        <div class="condDisplay">${data.condition}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <span class="detail-label">Humidity</span>
                <span class="detail-value">${data.humidity}</span>
            </div>
            <div class="weather-detail">
                <span class="detail-label">Feels Like</span>
                <span class="detail-value">${data.feelsLike || data.temperature}</span>
            </div>
        </div>
    `;
    
    // Show the card
    card.style.display = "block";
}

function displayLoading() {
    card.innerHTML = `
        <div class="loadingDisplay">
            <span>☁️</span>
            <span>Getting weather...</span>
        </div>
    `;
    card.style.display = "block";
}

function getweatherEmoji (condition){
    // Return clear, simple emoji based on weather condition
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) return "☀️";
    if (conditionLower.includes("cloud")) return "☁️";
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) return "🌧️";
    if (conditionLower.includes("snow")) return "❄️";
    if (conditionLower.includes("storm") || conditionLower.includes("thunder")) return "⛈️";
    if (conditionLower.includes("mist") || conditionLower.includes("fog")) return "🌫️";
    return "🌤️"; // Default partly cloudy
}
function displayError(message) {
    card.innerHTML = `
        <div class="errorDisplay">
            ❌ ${message}
        </div>
    `;
    card.style.display = "block";
}
