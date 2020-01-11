const apiKey = "a64170d48eba7179e009a291124e0d69";
const days = [
  {
    id: "#dayOne",
    index: 4
  },
  {
    id: "#dayTwo",
    index: 12
  },
  {
    id: "#dayThree",
    index: 20
  },
  {
    id: "#dayFour",
    index: 28
  },
  {
    id: "#dayFive",
    index: 36
  }
];
days.forEach(day => {
  $(day.id).hide();
});

let storedCities;
let cities;

const displayStoredCities = () => {
  storedCities = localStorage.getItem("storedCities");
  cities = storedCities ? JSON.parse(storedCities) : [];
  $("#storedCities").html("");
  cities.forEach(function(cityName) {
    const cityLi = $(
      `<li class="m-1"><button class="btn btn-primary btn-block">${cityName}</button></li>`
    ).on("click", () => {
      displayWeatherForCity(cityName);
    });
    $("#storedCities").append(cityLi);
  });
};

displayStoredCities();

const displayWeatherForCity = cityName => {
  const cityURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&apikey=" +
    apiKey;

  $.ajax({
    url: cityURL,
    method: "GET"
  }).then(function(response) {
    $("#citySearched").text(response.name);
    $("#temperature").text("Temperature " + response.main.temp);
    $("#humidity").text("Humidity " + response.main.humidity);
    $("#windSpeed").text("Wind Speed " + response.wind.speed);

    // get the longitude and latitude and API link for UV index
    let lat = response.coord.lat;
    let lon = response.coord.lon;

    let uvIndexURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: uvIndexURL,
      method: "GET"
    }).then(function(response2) {
      $("#uvIndex").text("UV Index " + response2.value);
    });

    // Five Day forecast AJAX call
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&lat=${lat}&lon=${lon}&units=imperial`;
    $.ajax({
      url: forecastURL,
      method: "GET"
    }).then(function(response3) {
      days.forEach(day => {
        $(day.id).html("");
        let img = $(
          `<img src="${`http://openweathermap.org/img/w/${
            response3.list[day.index].weather[0].icon
          }.png`}" />`
        );
        $(day.id).append(
          moment(response3.list[day.index].dt_txt).format("MM-DD-YYYY")
        );
        $(day.id).append(img);
        // Didn't like the way it looked with the min/max
        // $(day.id).append($(`<p class="min-temp"></p>`).append(response3.list[day.index].main.temp_min));
        $(day.id).append(
          $(`<p class="max-temp"></p>`).append(
            response3.list[day.index].main.temp_max
          )
        );
        $(day.id).show();
      });
    });
  });
};

// The search when button is clicked
$("#searchForm").on("submit", function(event) {
  event.preventDefault();

  // What we need to find
  const cityName = $("#findCity")
    .val()
    .trim();

  // Store previous cities searched
  if (!cities.includes(cityName)) {
    cities.unshift(cityName);
    localStorage.setItem("storedCities", JSON.stringify(cities));
  }

  displayStoredCities();
  displayWeatherForCity(cityName);
});
