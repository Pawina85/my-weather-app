const weatherForm = document.querySelector("weatherForm")
const cityInput = document.querySelector("cityInput")
const card = document.querySelector("card")
const apiKey = "256fe6798e64376d68df8988cf59c598"


weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){

    }
    else{
        displayError("Please enter a city")
    }
}

)

async function getWeatherData(city){

}
function displayWeatherInfo(data){

}
function getWeatherEmoji(weatherId){

}
function  displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent =message;
    errorDisplay.classList.add("msgDisplay")

    card.textContent = ""
    card.computedStyleMap.display = "flex"
    card.appendChild(errorDisplay);

}