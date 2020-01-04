var apiKey = "a64170d48eba7179e009a291124e0d69";
// The search when button is clicked
$("#searchCity").on("click", function (event) {
  event.preventDefault();
  // What we need to find
  var cityName = $("#findCity").val();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&apikey=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#citySearched").text(response.name);
    $("#temperature").text("Temperature " + response.main.temp);
    $("#humidity").text("Humidity " + response.main.humidity);
    $("#windSpeed").text("Wind Speed " + response.wind.speed);
  })
})




// $("#uvIndex").text(JSON.stringify(response));
