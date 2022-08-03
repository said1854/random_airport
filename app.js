//Config
const express = require('express');
const bodyParser = require('body-parser');
const fetch = (...args) =>
    import('node-fetch').then(({
        default: fetch
    }) => fetch(...args));
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const flightRadar = process.env.FLIGHTRADAR

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
////////////////////////////////////
const url = 'https://flight-radar1.p.rapidapi.com/airports/list';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': flightRadar,
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
};

let russiaAirports = [];

app.get("/", (req, res) => {
    fetch(url, options)
        .then(res => res.json())
        .then((json) => {
            let i = Math.floor(Math.random() * 4760);
            let j = Math.floor(Math.random() * 4760);
            let k = Math.floor(Math.random() * 4760);
            let randomAirport = json.rows[i];
            for (let i = 0; i < json.rows.length; i++) {
                if (json.rows[i].country === "Russia")
                    russiaAirports.push(`lat : ${json.rows[i].lat}`, `lon : ${json.rows[i].lon}`);
            }
            console.log(randomAirport);
            // console.log(typeof russiaAirports, russiaAirports[0], russiaAirports[1], russiaAirports.length);
            res.render("home", {
                name: json.rows[i].name,
                lat: json.rows[i].lat,
                lon: json.rows[i].lon,
                alt: Math.floor(json.rows[i].alt / 3.2808399),
                list: russiaAirports,
                correctCountry: json.rows[i].country,
                wrongCountry1: json.rows[j].country,
                wrongCountry2: json.rows[k].country
            })
        })
        .catch(err => {
            console.log(err);
        })
    russiaAirports = [];
})





app.get("/elevation", (req, res) => {
    res.render("elevation")
});










app.listen(port, (req, res) => {
    console.log(`Server is running on port:${port}`);
})