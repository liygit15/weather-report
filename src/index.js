'use strict';

const state = {
  currentTemp: 60,
  tempDisplay: null,
  increaseBtn: null,
  decreaseBtn: null,
  cityName: 'Seattle',
  cityInput: null,
  cityDisplay: null,
  currentTempButton: null,
  landscapeDiv: null,
  skySelect: null,
  skyDisplay: null,
  gardenBackground: null,
  cityNameReset: null,
  tempConvertBt: null,
  isCelsius: false
};

// wave 2
const getTextColor = (temp) => {
  if (state.isCelsius) {
    if (temp >= 27) return 'red';
    if (temp >= 21) return 'orange';
    if (temp >= 16) return 'yellow';
    if (temp >= 10) return 'green';
    return 'teal';
  } else {
    if (temp >= 80) return 'red';
    if (temp >= 70) return 'orange';
    if (temp >= 60) return 'yellow';
    if (temp >= 50) return 'green';
    return 'teal';
  }
};

const getLandscapeForTemp = (temp) => {
  if (state.isCelsius) {
    if (temp >= 27) return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    if (temp >= 21) return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    if (temp >= 16) return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    if (temp >= 80) return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    if (temp >= 70) return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    if (temp >= 60) return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }
};

const updateTempDisplay = () => {
  const unit = state.isCelsius ? '°C' : '°F';
  state.tempDisplay.textContent = `${state.currentTemp}${unit}`;

  state.tempDisplay.classList.remove('red', 'orange', 'yellow', 'green', 'teal');

  const color = getTextColor(state.currentTemp);
  state.tempDisplay.classList.add(color);

  const landscape = getLandscapeForTemp(state.currentTemp);
  state.landscapeDiv.textContent = landscape;
};

const increaseTemp = () => {
  state.currentTemp++;
  updateTempDisplay();
};

const decreaseTemp = () => {
  state.currentTemp--;
  updateTempDisplay();
};

// wave 3
const handleCityInput = (event) => {
  state.cityName = event.target.value;
  state.cityDisplay.textContent = state.cityName;
};

// wave 4
const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/location',
      {params:{q: query}})
    .then((location) => {
      latitude = location.data[0].lat;
      longitude = location.data[0].lon;
      return {latitude, longitude};
    });
};

const findWeather = (latitude, longitude) => {
  return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/weather',
      {params: {lat:latitude, lon:longitude}})
    .then((weather) => {
      const Kelvintemp = weather.data.main.temp;
      const Ftemp = Math.round((Kelvintemp - 273.15) * (9 / 5) + 32);
      return Ftemp;
    });
};

const getTempFromInput = (query) => {
  return findLatitudeAndLongitude(query)
    .then((location) => {
      return findWeather(location.latitude, location.longitude);
    })
    .then((Ftemp) => {
      state.currentTemp = Ftemp;
      state.isCelsius = false;
      return state.currentTemp;
    })
    .catch((error) => {
      console.log('Something went wrong!', error);
    });
};

const updateTempFromInput = (query) => {
  return getTempFromInput(query)
    .then(() => updateTempDisplay());
};

//wave 5 & background from wave2
const getSkySelection = (selectedOption) => {
  if (selectedOption === 'Sunny') {
    return {
      emojis: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
      weatherClass: 'sunny'
    };
  }
  else if (selectedOption === 'Cloudy') {
    return {
      emojis: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
      weatherClass: 'cloudy'
    };
  }
  else if (selectedOption === 'Rainy') {
    return {
      emojis: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
      weatherClass: 'rainy'
    };
  }
  else if (selectedOption === 'Snowy') {
    return {
      emojis: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
      weatherClass: 'snowy'
    };
  }

  return {
    emojis: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
    weatherClass: 'sunny'
  };
};

const handleSkyChange = () => {
  const selectedValue = state.skySelect.value;
  const skyData = getSkySelection(selectedValue);
  state.skyDisplay.textContent = skyData.emojis;
  state.gardenBackground.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
  state.gardenBackground.classList.add(skyData.weatherClass);
};

// wave 6
const resetCityName = () => {
  state.cityInput.value = 'Seattle';
  state.cityDisplay.textContent = 'Seattle';
  state.cityName = 'Seattle';
};

// enhancements
const tempConvert = () => {
  if (!state.isCelsius) {
    state.currentTemp = Math.round((state.currentTemp - 32) * 5 / 9);
    state.isCelsius = true;
  } else {
    state.currentTemp = Math.round((state.currentTemp * 9 / 5) + 32);
    state.isCelsius = false;
  }
  updateTempDisplay();
};

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
  state.increaseBtn.addEventListener('click', increaseTemp);
  state.decreaseBtn.addEventListener('click', decreaseTemp);
  
  state.currentTempButton.addEventListener('click', () => {
    const cityName = state.cityInput.value;
    updateTempFromInput(cityName);
  });
  
  state.skySelect.addEventListener('change', handleSkyChange);
  state.cityNameReset.addEventListener('click', resetCityName);
  state.tempConvertBt.addEventListener('click', tempConvert);
};

const loadControls = () => {
  state.cityInput = document.getElementById('cityNameInput');
  state.cityDisplay = document.getElementById('headerCityName');
  state.tempDisplay = document.getElementById('tempValue');
  state.increaseBtn = document.getElementById('increaseTempControl');
  state.decreaseBtn = document.getElementById('decreaseTempControl');
  state.currentTempButton = document.getElementById('currentTempButton');
  state.landscapeDiv = document.getElementById('landscape');
  state.skySelect = document.getElementById('skySelect');
  state.skyDisplay = document.getElementById('sky');
  state.gardenBackground = document.getElementById('gardenContent');
  state.cityNameReset = document.getElementById('cityNameReset');
  state.tempConvertBt = document.getElementById('temp_conversion_bt');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempDisplay();
  updateTempFromInput(state.cityName);
  handleSkyChange();
  state.cityInput.value = state.cityName;
  state.cityDisplay.textContent = state.cityName;
};

onLoaded();