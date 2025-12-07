'use strict';

const state = {
  currentTemp: 60,
  tempDisplay: null,
  increaseBtn: null,
  decreaseBtn: null,
  cityName: 'Seattle',
  cityInput: null,
  cityDisplay: null,
  currentTempButton: false,
  landscapeDiv: null,
  skySelect: null,
  skyDisplay: null,
  gardenBackground: null,
  cityNameReset: null,
};

// wave 2
const getTempData = (temp) => {
  if (temp >= 80) {
    return {
      colorClass: 'red',
      landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    };
  }
  else if (temp >= 70) {
    return {
      colorClass: 'orange',
      landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    };
  }
  else if (temp >= 60) {
    return {
      colorClass: 'yellow',
      landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
    };
  }
  else if (temp >= 50){
    return {
      colorClass: 'green',
      landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    };
  }
  else {
    return {
      colorClass: 'yellow-green',
      landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    };
  }
};

const updateTempDisplay = () => {
  state.tempDisplay.textContent = `${state.currentTemp}°F`;
  const tempData = getTempData(state.currentTemp);

  state.tempDisplay.classList.remove('red', 'orange', 'yellow', 'green', 'yellow-green');
  state.tempDisplay.classList.add(tempData.colorClass);

  state.landscapeDiv.textContent = tempData.landscape;
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
    .get('http://localhost:5000/location',
      {params:{q: query}})
    .then((location) => {
      latitude = location.data[0].lat;
      longitude = location.data[0].lon;
      return {latitude, longitude};
    });
};

const findWeather = (latitude, longitude) => {
  return axios
    .get('http://localhost:5000/weather',
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
};

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
  state.increaseBtn.addEventListener('click', increaseTemp);
  state.decreaseBtn.addEventListener('click', decreaseTemp);
  state.currentTempButton.addEventListener('click', () => {
    updateTempFromInput(state.cityName);
  });
  state.skySelect.addEventListener('change', handleSkyChange);
  state.cityNameReset.addEventListener('click', resetCityName);
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
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempDisplay();
  handleSkyChange();
};

onLoaded();