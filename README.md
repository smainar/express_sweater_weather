# Project: Express Sweater Weather

## Visit my app on Heroku:
https://salty-headland-76294.herokuapp.com/

## Intent  

Sweater Weather is a RESTful API that fetches the forecast for a specific location (city/state) and exposes six endpoints. This solo project was completed in 7 days as a requirement for the Turing School of Software and Design, Back-End Engineering Program (Module 4).

## Dependencies
* "babel-jest": "^24.9.0"
* "shelljs": "^0.8.3"
* "supertest": "^4.0.2"

## Gems Used
* bcrypt
* node-fetch
* uuidv


## GitHub Repository
https://github.com/smainar/express_sweater_weather

## Instructions
  ### How to setup:
      1. Clone the GitHub repository.
      2. Go to the directory with the new repo.  
      3. Run `npm install`
      4. Setup database:
         a) npx sequelize db:create
         b) npx sequelize db:migrate

  ### Run tests:
        1. Run `npm test`
        2. To run a single test file, example:

## Endpoints

### User Registration (Account Creation)

***Request:***
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

***Response:***
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### Login

***Request:***
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```

***Response:***
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### Forecast for City

***Request:***
```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

***Response:***
* The response below is an example that gives only 1 object in the data array for both the hourly and daily. It contains 8 hourly objects and 7 daily objects.

```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

### Favoriting Locations

***Request:***
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

***Successful Response:***
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

### Listing Favorite Locations

***Request:***
```
GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

***Response:***
```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

### Removing Favorite Locations

***Request:***
```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

***Response:***
```
status: 204
```
