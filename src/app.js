const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
//hbs.registerPartials(path.join(__dirname, '../templates/partials'));

console.log(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jeremy Morrison'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Jeremy Morrison"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Do you need help?',
        title: 'Help',
        name: "Jeremy Morrison"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided in query string'
        });
    }

    // default empty object if cannot find location
        // this is still a problem even with the 2nd if statement in geocode, because passing only 1 parameter means
        // that the 2nd one is passed, but undefined. You can't destructure undefined!!!!!
    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecast,
                address: req.query.address
            });
        });
    });

    // res.send({
    //     forecast: "It's always sunny in Philly",
    //     location: 'Philly',
    //     address: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        page: '404 help page',
        title: '404',
        name: "Jeremy Morrison"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        page: '404 page',
        title: '404',
        name: "Jeremy Morrison"
    });
})

app.listen(8000, () => {
    console.log("app listening on port", 8000);
});