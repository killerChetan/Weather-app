const apiKey = '4df68410e855fe78de62d7e02e8ced8c';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#locationInput");
const searchBtn = document.querySelector("#searchButton");
const loading = document.querySelector("#loading");
let error1 = document.querySelector("#error");

//async function
async function checkWeather(city) {
  loading.style.display = "block";
  try {
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    console.log(data);

    const location = document.querySelector("#location");
    const temp = document.querySelector("#temp");
    const windSpeed = document.querySelector("#windSpeed");
    const humidity = document.querySelector("#humidity");
    const description = document.querySelector("#description");

    location.innerText = `${data.name}`;
    temp.innerHTML = `temp : ${data.main.temp}°C`;
    windSpeed.innerHTML = `wind-speed : ${data.wind.speed} km/h`;
    description.innerHTML = `description : ${data.weather[0].main}`;
    humidity.innerHTML = `humidity : ${data.main.humidity}%`;

    let emoji = document.querySelector("#emoji");
    if (data.weather[0].main == "Drizzle") {
      emoji.innerHTML = "🌦️";
    } else if (data.weather[0].main == "Clear") {
      emoji.innerHTML = "☀️";
    } else if (data.weather[0].main == "Clouds") {
      emoji.innerHTML = "☁️";
    } else if (data.weather[0].main == "Rain") {
      emoji.innerHTML = "🌧️";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji.innerHTML = "️⛈️";
    } else {}
  } catch (error) {
    error1.innerHTML = `<h4>${error.message}</h4>`;
    if (error.message) {
      document.querySelector(".Weather").style.height = "0px";
      document.querySelector(".Weather").style.overflow = "hidden";
    }
  }
  finally {
    loading.style.display = "none";
  }
}

searchBtn.addEventListener("click", (e) => {
  console.log(e)
  checkWeather(searchBox.value.trim());
  document.querySelector(".Weather").style.display = "block";
  document.querySelector(".Weather").style.height = ""
  document.querySelector(".Weather").style.overflow = "visible";
  error1.innerHTML = ""
});