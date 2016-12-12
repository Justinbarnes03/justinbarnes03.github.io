var returned;

$('#query').keyup(function(){
  // All code will be inside of this block
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
    console.log(data);
    returned = data;

    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON



  // Intercept the menu link clicks
  $("#searchResults").on("click", "a", function(evt) {
    evt.preventDefault();

    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    index = $(this).index("a");
    console.log(index);
    console.log(returned);
    getData(returned.RESULTS[index -2 ].lat, returned.RESULTS[index - 2].lon);
      document.getElementById("searchResults").style.display="none";

}); // end keyup
    
});

function getData(lat, long) {
  $.ajax({
    url : 'https://api.wunderground.com/api/83b68104044eacaf/geolookup/conditions/forecast/q/' + lat + ',' + long + '.json',
    dataType : "jsonp",
    success : function(data){
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp = Math.round(data.current_observation.temp_f);
      var high = Math.round(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      var low = Math.round(data.forecast.simpleforecast.forecastday[0].low.fahrenheit);
      var summary = data.current_observation.weather;
      var add1 = data.current_observation.feelslike_f;
      var add2 = data.current_observation.wind_mph;
      var add3 = data.current_observation.visibility_mi;
      $('#location').text(location);
        $('#title').text(location + ' | Weather Home');
      $('#currentTemp').text(temp + "°F");
      $('#high').text("High " + high + "°F");
      $('#low').text("Low " + low + "°F");
      $('#summary').text(summary);
      $('#add1').text("Feels Like: " + add1 + "°F");
      $('#add2').text("Windspeed: " + add2 + " mph");
      $('#add3').text("Visibility: " + add3 + " mi");
    }
  });
}

// A function for changing a string to TitleCase
function toTitleCase(str) {
  return str.replace(/\w+/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                            });
};