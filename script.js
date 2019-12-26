var apiKey = "a64170d48eba7179e009a291124e0d69";

var cityId = "524901";

var cityName = "london";

var testId = "api.http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&APPID=" + apiKey;
console.log(testId);

var testName = "api.http://api.openweathermap.org/data/2.5/find?q=" + cityName + "&units=imperial&APPID=" + apiKey;
console.log(testName)

// var searchWeather = function (cityName) {
//   var queryURL = "api.openweathermap.org/data/2.5/find?q=" + cityName + "&units=imperial&apikey=" + apiKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//   });
// };
// searchWeather("Tokyo");
// searchWeather("Rome");
// searchWeather("Maui");
