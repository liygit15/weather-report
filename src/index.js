'use strict';

const state = {
  cityName: 'Seattle',
  cityInput: null,
  cityDisplay: null,
  currentTemp: 60,
  tempDisplay: null,
  increaseBtn: null,
  decreaseBtn: null,
  landscapeDiv: null,
  skySelect: null,
  skyDisplay: null,
  gardenBackground: null
};


// wave 2
const getTempData = (temp) => {
  if (temp >= 80) {
    return {
      colorClass: 'red',
      landscape: "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    };
  }
  if (temp >= 70) {
    return {
      colorClass: 'orange',
      landscape: "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    };
  }
  if (temp >= 60) {
    return {
      colorClass: 'yellow',
      landscape: "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    };
  }
  if (temp >= 50) {
    return {
      colorClass: 'green',
      landscape: "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    };
  }
};

const updateTempDisplay = () => {
  state.tempDisplay.textContent = `${state.currentTemp}°F`;
  const tempData = getTempData(state.currentTemp);

  state.tempDisplay.classList.remove('red', 'orange', 'yellow', 'green', 'blue');
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

//wave 5 & background from wave2

const getSkySelection = (selectedOption) => {
  if (selectedOption === 'Sunny') {
    return {
      emojis: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
      colorClass: 'sunny'
    };
  }

  if (selectedOption === 'Cloudy') {
    return {
      emojis: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
      colorClass: 'cloudy'
    };
  }

  if (selectedOption === 'Rainy') {
    return {
      emojis: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
      colorClass: 'rainy'
    };
  }

  if (selectedOption === 'Snowy') {
    return {
      emojis: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
      colorClass: 'snowy'
    };
  }
};

const handleSkyChange = () => {
  const selectedValue = state.skySelect.value;
  const skyData = getSkySelection(selectedValue);
  state.skyDisplay.textContent = skyData.emojis;
  state.gardenBackground.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
  state.gardenBackground.classList.add(skyData.colorClass);
};

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
  state.increaseBtn.addEventListener('click', increaseTemp);
  state.decreaseBtn.addEventListener('click', decreaseTemp);
  state.skySelect.addEventListener('change', handleSkyChange);
};

const loadControls = () => {
  state.cityInput = document.getElementById('cityNameInput');
  state.cityDisplay = document.getElementById('headerCityName');
  state.tempDisplay = document.getElementById('tempValue');
  state.increaseBtn = document.getElementById('increaseTempControl');
  state.decreaseBtn = document.getElementById('decreaseTempControl');
  state.landscapeDiv = document.getElementById('landscape');
  state.skySelect = document.getElementById('skySelect');
  state.skyDisplay = document.getElementById('sky');
  state.gardenBackground = document.getElementById('gardenContent');
};


const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempDisplay();
  handleSkyChange();
};


onLoaded();


