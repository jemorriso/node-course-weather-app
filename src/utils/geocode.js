const request = require('request');

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) +  ".json?access_token=pk.eyJ1IjoiamVycnlsb3ZlIiwiYSI6ImNrMXkyZzQ3dzBmdTczaG80Y28wbmJqdWEifQ.0G0G2AilyPYkRE4EhACBnA";

    // using object property shorthand for url
    request({ url, json: true }, (error, { body }) => {
        // pass error to callback so this function is more flexible - handle errors in callback instead of conditional branching
        if (error) { 
            // 2nd parameter becomes undefined
            callback('Unable to connect to location services.'); 
        }
        else if (body.features.length === 0) {
            callback('Unable to find location.');
        }
        else {
            // note that since we are using object destructuring in the parameter of the callback,
                // these labels need to have the same names
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;