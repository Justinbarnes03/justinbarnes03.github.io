// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
   function getData(lat, long) {
    $.ajax({
      url : 'https://api.wunderground.com/api/83b68104044eacaf/geolookup/conditions/q/' + lat + ',' + long + '.json',
      dataType : "jsonp",
      success : function(data){
        console.log(data);
        var location = data.location.city + ', ' + data.location.state;
        var temp = Math.round(data.current_observation.temp_f);
        var summary = data.current_observation.weather;
        var feelsLike = data.current_observation.feelslike_f;
        var windspeed = data.current_observation.wind_mph;
        var visibility = data.current_observation.visibility_mi;
        $('#cityDisplay').text(location);
        $('title').text(location + ' | Weather Home');
        $('#currentTemp').text(temp + "°F");
        $('#summary').text(summary);
        $('#add1').text("Feels Like: " + feelsLike + "°F");
        $('#add2').text("Windspeed: " + windspeed + " mph");
        $('#add3').text("Visibility: " + visibility + " mi");
        $("#cover").fadeOut(250);
      }
    });
  }
// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                              });
  }
});
