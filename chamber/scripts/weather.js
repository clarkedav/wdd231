const apiKey = "f8901de04b8522c172bf2c79c5f9d933";
const city = "Lagos";

async function getWeather() {
    const currentContainer = document.getElementById("weather-current");
    const forecastContainer = document.getElementById("weather-forecast");

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const [forecastResponse, currentResponse] = await Promise.all([
            fetch(forecastUrl),
            fetch(currentUrl)
        ]);

        if (!forecastResponse.ok || !currentResponse.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const forecastData = await forecastResponse.json();
        const currentData = await currentResponse.json();

        const current = forecastData.list[0];
        const forecast = forecastData.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

        const iconCode = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

        currentContainer.innerHTML = `
            <h2 class="section-heading">Current Weather</h2>
            <div class="weather-current-flex">
                <img src="${iconUrl}" alt="${current.weather[0].description}" class="weather-icon">
                <div class="weather-current-info">
                    <p><strong>Now:</strong> <strong>${current.main.temp.toFixed(1)}°F</strong>, ${current.weather[0].description}</p>
                    <p><strong>High:</strong> <strong>${current.main.temp_max.toFixed(1)}°F</strong> | <strong>Low:</strong> <strong>${current.main.temp_min.toFixed(1)}°F</strong></p>
                    <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
                    <p><strong>Sunrise:</strong> ${sunrise}</p>
                    <p><strong>Sunset:</strong> ${sunset}</p>
                </div>
            </div>
        `;

        forecastContainer.innerHTML = `
            <h2 class="section-heading">Weather Forcast</h2>
            <ul>
                ${forecast.map(day => `
                    <li style="margin-bottom: 0.5rem;">
                        ${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}:
                        <strong>${day.main.temp.toFixed(1)}°F</strong>, ${day.weather[0].main}
                    </li>
                `).join("")}
            </ul>
        `;
    } catch (err) {
        currentContainer.innerHTML = "<p>Unable to fetch current weather data.</p>";
        forecastContainer.innerHTML = "";
        console.error("Weather API error:", err);
    }
}

getWeather();
