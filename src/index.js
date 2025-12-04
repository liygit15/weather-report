'use strict';

const state = {
  cityName: 'Seattle',
  cityInput: null,
  cityDisplay: null,
  //have to update this to get current temp from API?
  currentTemp: 60,
  tempDisplay: null,
  increaseBtn: null,
  decreaseBtn: null,
};


// wave 2

//determine color
const getColorForTemp = (temp) => {
  if (temp >=80) return 'red';
  if (temp >= 70) return 'orange';
  if (temp >= 60) return 'yellow';
  if (temp >= 50) return 'green';
  return 'teal';
};

//determine landscape
const getLandscapeForTemp = (temp) => {
  if (temp >= 80) return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  if (temp >= 70) return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  if (temp >= 60) return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
};

//update temp display
const updateTemperatureDisplay = () => {
  state.tempDisplay.textContent = state.currentTemp + '°F';

  const color = getColorForTemp(state.currentTemp);

  state.tempDisplay.style.backgroundColor = color;
  if (color === 'yellow') {
    state.tempDisplay.style.color = 'black';
  } else {
    state.tempDisplay.style.color = 'white';
  }

  const landscape = getLandscapeForTemp(state.currentTemp);
  state.landscapeDiv.textContent = landscape;
};

//event handling
const handleIncreaseTemp = () => {
  state.currentTemp++;
  updateTemperatureDisplay();
};

const handleDecreaseTemp = () => {
  state.currentTemp--;
  updateTemperatureDisplay();
};



// wave 3
const handleCityInput = (event) => {
  state.cityName = event.target.value;
  state.cityDisplay.textContent = state.cityName;
};

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
  state.increaseBtn.addEventListener('click', handleIncreaseTemp);
  state.decreaseBtn.addEventListener('click', handleDecreaseTemp);
};

const loadControls = () => {
  state.cityInput = document.getElementById('cityNameInput');
  state.cityDisplay = document.getElementById('headerCityName');
  state.tempDisplay = document.getElementById('tempValue');
  state.increaseBtn = document.getElementById('increaseTempControl');
  state.decreaseBtn = document.getElementById('decreaseTempControl');
  state.landscapeDiv = document.getElementById('landscape');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTemperatureDisplay();
};

onLoaded();