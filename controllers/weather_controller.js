const path = require('path');
const rScript = require('r-script');

class WeatherController {
    constructor() {
        this.api_url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";
        this.r_script_path = path.join(__dirname, 'weather_analysis.R');
    }

    async getWeatherInfo(req, res) {
        try {
            const response = await fetch(this.api_url);
            const data = await response.json();

            console.log("Data received from API:");
            console.log(JSON.stringify(data.hourly, null, 2));

            const input = {
                timestamps: data.hourly.time,
                temperatures: data.hourly.temperature_2m.map(String) // Convert to strings
            };

            console.log("Input being sent to R script:");
            console.log(JSON.stringify(input, null, 2));

            const result = rScript(this.r_script_path)
                .data(input) 
                .callSync();

            console.log("R script result:");
            console.log(JSON.stringify(result, null, 2));

            res.json({
                weatherData: data.hourly,
                analysis: result
            });
        } catch (error) {
            console.error("Error in getWeatherInfo:", error);
            res.status(500).json({ error: "Failed to process weather data" });
        }
    }
}

module.exports = WeatherController;