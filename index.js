$(window).load(function() {
  $('#loading').delay(3000).fadeOut(500);
})
$(document).ready(function(){
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather);
    } else {
      // If geolocation not available
    }
  }
  function showWeather(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    apiKey = 'f766966e845884aff1568f1c702f7b3d';
    $.ajax({
      url: 'https://api.forecast.io/forecast/'+apiKey+'/'+latitude+','+longitude,
      dataType: 'jsonp',
      success: function(data) {
        current_temperature = Math.round(data.currently.temperature);
        minimun_temperature = Math.round(data.daily.data[0].temperatureMin);
        maximun_temperature = Math.round(data.daily.data[0].temperatureMax);
        humidity = Math.round(data.currently.humidity*100);
        preciptation_intensity = (data.currently.precipIntensity*1000).toFixed(2);
        preciptation_probability = Math.round(data.currently.precipProbability*100);
        wind_speed = data.currently.windSpeed;
        wind_from = data.currently.windBearing;
        summary = data.currently.summary;
        
        $('#current_temp').html(current_temperature);
        $('#min_temp').html(minimun_temperature);
        $('#max_temp').html(maximun_temperature);
        $('#humidity').html(humidity);
        $('#weather_description').html(summary);
        $('#rain_volume').html(preciptation_intensity);
        $('#wind_speed').html(wind_speed);
        $('.wi-wind').addClass('from-'+wind_from+'-deg');
      }
    });
    $.ajax({
      url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude+'&zoom=18&addressdetails=1',
      dataType: 'json',
      success: function(data) {
        $('#city').html(data.address.city);
        $('#state').html(data.address.state);
        $('#country').html(data.address.country);
      }
    });
  }
  getLocation();
  
  // Date and Time
  d = new Date();
  hour = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
  ampm = d.getHours() >= 12 ? 'pm' : 'am';
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $('#time').html(days[d.getDay()]+', '+hour%12+' '+ampm.toUpperCase())
  
});