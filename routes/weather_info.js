const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weather_controller');

const weatherController = new WeatherController();  

router.get('/', weatherController.getWeatherInfo.bind(weatherController));

module.exports = router;