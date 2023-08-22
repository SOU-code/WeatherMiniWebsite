function updateWeather() {
  const city = document.querySelector("input[type='text']");
  const weather = document.querySelector(".weather");
  const wind = document.querySelector(".wind h3");
  const humidity = document.querySelector(".humidity h3");
  const tempareture = document.querySelector(".tempareture");
  const cityNamePlace = document.querySelector(".city-name");
  const invalid = document.querySelector(".invalid");
  const cityNotEmpty = document.querySelector(".cityNotEmpty");
  const weatherImg = document.querySelector(".weather-img img");
  const cityName = city.value;
  city.value = "";
  const apiKey = "1cc553a56d5b3189f1146b6ed62dd0f8";
  async function checkWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    if (response.status == 404) {
      invalid.style.display = "block";
      cityNotEmpty.style.display = "none";
      weather.style.display = "none";
    } else if (response.status == 400) {
      cityNotEmpty.style.display = "block";
      invalid.style.display = "none";
      weather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
      cityNamePlace.innerHTML = data.name;
      tempareture.innerHTML = Math.floor(data.main.temp - 273) + "&deg;C";
      humidity.innerHTML = data.main.humidity + "%";
      wind.innerHTML = data.wind.speed + " km/hr";
      if (data.weather[0].main == "Rain") {
        weatherImg.src = `./images/rain.png`;
      } else if (data.weather[0].main == "Clear") {
        weatherImg.src = `./images/clear.png`;
      } else if (data.weather[0].main == "Clouds") {
        weatherImg.src = `./images/clouds.png`;
      } else if (data.weather[0].main == "Drizzle") {
        weatherImg.src = `./images/drizzle.png`;
      } else if (data.weather[0].main == "Mist") {
        weatherImg.src = `./images/mist.png`;
      } else if (data.weather[0].main == "Snow") {
        weatherImg.src = `./images/snow.png`;
      }
      cityNotEmpty.style.display = "none";
      invalid.style.display = "none";
      weather.style.display = "block";
    }
  }
  checkWeather();
}
function findWeather() {
  const searchIcon = document.querySelector(".search-icon");
  searchIcon.addEventListener("click", updateWeather);
}
findWeather();
