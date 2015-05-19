/*
 *
 *	Dışarı mı çıksam? v1.0
 *	- Chrome Extension
 *
 *	Halil Kaya
 *	- kayahalil@gmail.com
 *	- www.halilkaya.net
 *	- twitter.com/halilkaya
 *
 */

var city, region, country, weatherCode, weather, degree, desc, icon, img;
function getIcon(icon) { return 'http://openweathermap.org/img/w/' + icon + '.png'; }
$(document).ready(function() {
	$.post('http://l2.io/ip', function(data) {
		$.getJSON('https://jsonp.afeld.me/?url=http://ipinfo.io/' + data, function(data) {
			city = data.city;
			region = data.region;
			country = data.country;
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + region + "," + country + '&units=metric', function(data) {
				weatherCode = data.weather[0].id;
				weather = data.weather[0].main;
				degree = parseInt(data.main.temp);
				desc = data.weather[0].description;
				icon = data.weather[0].icon;
				img = getIcon(icon);
				$.getJSON('data/data.json', function(data) {
					$('#img').attr('src', img);
					$('#message').html(data[weatherCode]);
					$('#degree').html(degree + '&ordm;');
					$('#location').html(region + ', ' + country);
					$('#loading').hide();
					$('#content').show();
				})
				.fail(function() {
					$('#loading').html(':(');
				});
			})
			.fail(function() {
				$('#loading').html(':(');
			});
		}, "jsonp")
		.fail(function() {
			$('#loading').html(':(');
		});
	});
});