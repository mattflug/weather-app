var searchCity = document.getElementById("search-btn");
searchCity.addEventListener("click", getCurrentWeather);
var searchFor = document.getElementById("search-for");
function getCurrentWeather() {
  var cityName = searchFor.value;
  const currentWeatherUrl =
    "https://api.weatherbit.io/v2.0/current?key=f6e3606f15de4913b926b9194fa43e8f&units=I&city=" +
    cityName;
  fetch(currentWeatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var icon = data.data[0].weather.icon.slice(1);
      document.querySelector(
        ".top-section"
      ).innerHTML = ` <div class="card" style="width: 18rem">
            <img id="icon-1" src="https://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title" id="date-1">${data.data[0].city_name}</h5>
              <h6>${data.data[0].datetime}</h6>
              <p id="temp1">temp: ${data.data[0].temp} </p>
              <p id="wind1">Wind: ${data.data[0].wind_spd}</p>
              <p id="humidity1">Humidity: ${data.data[0].rh} </p>
              <p>UV:${data.data[0].uv}</p>

            </div>
          </div>`;
      var previousSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
      if (previousSearch.indexOf(cityName) === -1) {
        previousSearch.push(cityName);
        localStorage.setItem("weatherAPI", JSON.stringify(previousSearch));
        displayLocalStorrage();
      }
      getCurrentWeather1(cityName);
      // var cityEl = document.getElementById("city-name");
      // var tempEl = document.getElementById("temp");
      // var windEl = document.getElementById("wind");
      // var humidityEl = document.getElementById("humidity");
      // var uvEl = document.getElementById("uv");
      // cityEl.textContent = data.data[0].city_name;
      // tempEl.textContent = data.data[0].temp;
      // windEl.textContent = data.data[0].wind_spd;
      // humidityEl.textContent = data.data[0].rh;
      // uvEl.textContent = data.data[0].uv;
    });
}

function getCurrentWeather1(cityName) {
  const currentWeatherUrl1 = `https://api.weatherbit.io/v2.0/forecast/daily?&days=5&city=${cityName}&key=f6e3606f15de4913b926b9194fa43e8f`;
  fetch(currentWeatherUrl1)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var html = "";
      for (i = 0; i < 5; i++) {
        var icon = data.data[i].weather.icon.slice(1);

        html += `
         <div class="card" style="width: 18rem">
            <img id="icon-1" src="https://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h6>${data.data[i].datetime}</h6>
              <p id="temp1">temp: ${data.data[i].temp} </p>
              <p id="wind1">Wind: ${data.data[i].wind_spd}</p>
              <p id="humidity1">Humidity: ${data.data[i].rh} </p>
              <p>UV:${data.data[i].uv}</p>

            </div>
          </div>
        `;
      }
      document.querySelector(".bottom-section").innerHTML = html;
    });
}

function displayLocalStorrage() {
  var previousSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
  let element = "";
  for (let index = 0; index < previousSearch.length; index++) {
    element += `<button type="button" class="btn btn-secondary">${previousSearch[index]}</button>`;
  }
  document.getElementById("side").innerHTML = element;
}

displayLocalStorrage();
