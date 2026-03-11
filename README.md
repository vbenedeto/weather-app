# Weather App

A clean, responsive weather dashboard featuring a glassmorphism UI and dynamic background themes.

### Features
* **Automatic Location:**: Detects your current city via Geolocation API on startup.
* **Global Search**: Supports searches by city name, state, or coordinates (latitude/longitude).
* **Dynamic Themes**: Backgrounds and UI Icons shift based on weather conditions (Clear, Rain, Night, etc.).
* **7-Day Forecast**: Weekly outlook with high/low temperatures and conditions.
* **Error Handling**: UI states for invalid city searches or network issues.
* **Unit Toggling**: Switch between Celsius and Fahrenheit instantly.


### Live Preview
**[View the Live App here](https://vbenedeto.github.io/weather-app/)**


### Installation & Setup
1. **Clone the repo**
   ```bash
   git clone https://github.com/vbenedeto/weather-app.git
   ```

2. **Install packages**
    ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Production build**
   ```bash
   npm run build
   ```

5. **Mock Data**
   Toggle the ***USE_MOCK_DATA*** flag in **api.js** to test without hitting API limits.
   
