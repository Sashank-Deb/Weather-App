## ["Haze Weather" Mobile App](https://sashank-deb.github.io/Weather-App/)

A responsive weather app with a dark-mode interface, current conditions, and a five-day forecast. It is built with React and OpenWeather.

Check out the Web App: https://haze-weather.web.app/ <br/>
(Works across phones, tablets, and desktop screens.)

## Setup

1. Create an OpenWeather API key at [OpenWeather](https://openweathermap.org/api).
2. Copy `.env.example` to `.env.local`.
3. Set `REACT_APP_OPENWEATHER_API_KEY` to your key.
4. Install dependencies with `npm install`, then run `npm start`.

The app uses OpenWeather's Current Weather and 5 day / 3 hour Forecast APIs, which are available on its free tier. API keys are intentionally kept out of source control.

![Sunny Day](https://user-images.githubusercontent.com/69194538/128396973-d8dc02a8-a569-4228-914d-e60400c252af.png)
![Clear Sky](https://user-images.githubusercontent.com/69194538/128396905-64673a0c-6143-4de8-ad7b-67a2775cb0c6.png)
![Overcast](https://user-images.githubusercontent.com/69194538/128396927-325e0a7e-f1dd-4e15-8008-3da2d1da0dd8.png)
![Rain and Humid](https://user-images.githubusercontent.com/69194538/128396953-0b920707-e792-485f-9079-01441871316c.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
