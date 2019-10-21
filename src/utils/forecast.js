const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/8bde3e040509a3bdc3dc2d08ccdebb0f/" + latitude + "," + longitude + "?units=si";
    
    // using object property shorthand for url
    // request callback should have parameter for error and response - can use object destructuring on the response object to make it a lot cleaner
    request( { url, json: true}, (error, { body }) => {
        // pass error to callback so this function is more flexible - handle errors in callback instead of conditional branching
        if (error) { 
            // 2nd parameter becomes undefined
            callback('Unable to connect to weather services.'); 
        }
        else if (body.error) {
            callback('Unable to find location.');
        } else {
            const currentWeather = body.currently;
            const forecast = 
                body.daily.data[0].summary + 
                " It is currently " + currentWeather.temperature + " degrees Celsius out. " +
                "There is a " + currentWeather.precipProbability + "% chance of rain.";

            callback(undefined, forecast);
        }
    });
}

module.exports = forecast;