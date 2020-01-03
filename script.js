var apiKey = "a64170d48eba7179e009a291124e0d69";

$("#searchCity").on("click", function (event) {
  event.preventDefault();

  var cityName = $("#findCity").val();
  console.log(cityName);

  var queryURL = "http://api.openweathermap.org/data/2.5/find?q=" + cityName + "&units=imperial&apikey=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#citySearched").text(JSON.stringify(response));
    console.log(response.list[0].main.temp);

  })
})
