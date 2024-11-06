import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

import DayCard from './DayCard';

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */
  
  const [weather, setWeather] = useState(null);
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */

  let todaysAQI;
  let todaysWeather;
  let weekData;

  // function that sets the AQI for today
  function getAQI() {
    let apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}`;

    fetch(apiCall)
      .then((response) => response.json())
      .then((data) => {
        todaysAQI = data.list[0].main.aqi;
      })
      .then(() => getTodaysWeather())
  }

  // function that sets the weather for today
  function getTodaysWeather() {
    let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;

    fetch(apiCall)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        todaysWeather = {
          temp: data.main.temp,
          type: data.weather[0].main,
          icon: data.weather[0].icon,
        }
      })
      .then(() => getWeekWeather());
  }

  // function that fetches the 5-day weather data for this city
  function getWeekWeather() {
    let apiCall = `http://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;
    
    fetch(apiCall)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        weekData = data;
      })
      .then(() => setUpWeather());
  }

  function setUpWeather() {
    let newWeather = {
      aqi: todaysAQI,
      todayTemp: todaysWeather.temp,
      todayType: todaysWeather.type,
      todayIcon: todaysWeather.type,
      week: weekData,
    }
    console.log(newWeather);
    console.log(newWeather.week.list[1])
    setWeather(newWeather);
  }

  useEffect(() => { 
    if (props.selectedCity.lat == undefined) {
      return;
    }
    getAQI();
  }, [props.selectedCity]);
  
  
  return (
    <div id="main-container">
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */}

        {weather && weather.week && 
        
        <div id='today-header-container'> 
          <p id="today-date" className="day-date">{formatDate(0)}</p>
          <h3 id="today-weather-for">{"Weather for " + props.selectedCity.fullName}</h3>
        </div>

        &&

        <div id='today-weather-container'> 
          <div id="today-weather-container-left">
            <p id='today-weather'>{weather.todayType}</p>
            <h1 id='today-temp'>{Math.trunc(weather.todayTemp) + "°"}</h1>
            <p id='today-aqi'>{"API: " + weather.aqi}</p>
          </div>
          <img id='today-icon' src={"./icons/" + weather.todayIcon + ".svg"} alt=""/>
        </div>

        &&
          <div id='week-container'>
            <DayCard elem={weather.week.list[12]} date={formatDate(1)} />
            <DayCard elem={weather.week.list[20]} date={formatDate(2)} />
            <DayCard elem={weather.week.list[28]} date={formatDate(3)} />
            <DayCard elem={weather.week.list[36]} date={formatDate(4)} />
            <DayCard elem={weather.week.list[44]} date={formatDate(5)} />
          </div>
        }

      </div>
    </div>
  );
}


export default MainContainer;

