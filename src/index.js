'use strict';

const state = {
  cityName: 'Seattle',
  cityInput: null,
  cityDisplay: null,
};


















// wave 3
const handleCityInput = (event) => {
  state.cityName = event.target.value;
  state.cityDisplay.textContent = state.cityName;
};

const registerEvents = () => {
  state.cityInput.addEventListener('input', handleCityInput);
};

const loadControls = () => {
  state.cityInput = document.getElementById('cityNameInput');
  state.cityDisplay = document.getElementById('headerCityName');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
};

onLoaded();