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
  landscapeDiv: null
};


// wave 2
const getTextColor = (temp) => {
  if (temp >= 80) return 'red';
  if (temp >= 70) return 'orange';
  if (temp >= 60) return 'yellow';
  if (temp >= 50) return 'green';
  return 'blue';
};

const getLandscapeForTemp = (temp) => {
  if (temp >= 80) return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  if (temp >= 70) return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  if (temp >= 60) return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
};

const updateTempDisplay = () => {
  state.tempDisplay.textContent = `${state.currentTemp}°F`;
  
  state.tempDisplay.classList.remove('red', 'orange', 'yellow', 'green', 'blue');

  const color = getTextColor(state.currentTemp);
  state.tempDisplay.classList.add(color);

  const landscape = getLandscapeForTemp(state.currentTemp);
  state.landscapeDiv.textContent = landscape
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

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
  state.increaseBtn.addEventListener('click', increaseTemp);
  state.decreaseBtn.addEventListener('click', decreaseTemp);
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
  updateTempDisplay();

};
















//wave 5


onLoaded();





//wave 5
