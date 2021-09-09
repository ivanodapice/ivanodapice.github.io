// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"raisin/raisin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncateLinkName = truncateLinkName;
// //////// RAISIN //////// //
const raisinLinks = [...document.querySelectorAll('.raisin-link')];
const searchInput = document.querySelector('.pp-search-input');
/**
 * Truncate link name to avoid multiline text breaking
 * it catches the container width, set a maximum character count authorized based on the container width
 * and then slice the link name at the right length
 * @returns {void} Nothing
 */

function truncateLinkName() {
  const raisinContainerWidth = document.querySelector('raisin').offsetWidth;
  let maxLength = 0;

  switch (true) {
    case raisinContainerWidth >= 120 && raisinContainerWidth <= 123:
      maxLength = 10;
      break;

    case raisinContainerWidth >= 124 && raisinContainerWidth <= 131:
      maxLength = 11;
      break;

    case raisinContainerWidth >= 132 && raisinContainerWidth <= 135:
      maxLength = 12;
      break;

    case raisinContainerWidth >= 136:
      maxLength = 13;
      break;

    default:
      maxLength = 10;
  }

  raisinLinks.forEach(link => {
    if (link.innerHTML.length > maxLength) {
      link.innerHTML = "".concat(link.innerHTML.replace(/\.[^/.]+$/, '').slice(0, Math.max(0, maxLength)), "...");
    }
  });
}
/**
 * Add an mouse over event listener on each link to display domain name inside the search module if existing
 */


raisinLinks.forEach(link => {
  link.addEventListener('mouseover', event => {
    event.preventDefault();

    if (searchInput) {
      searchInput.placeholder = link.hostname;
    }
  });
});
},{}],"clock/clock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startClockModule = startClockModule;
// //////// CLOCK //////// //
const clockContainer = document.querySelector('pp-clock-inner');
/**
 * Main exported function that sets time, date, and attaches event handler
 * @returns {void} Nothing
 */

function startClockModule() {
  displayTime();
  displayDate();
  clockContainer.addEventListener('click', toggleClockDisplay);
}
/**
 * Set and display formatted current time based on user locale
 * @returns {void} Nothing
 */


function displayTime() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const day = d.toLocaleDateString("it-IT", {
    weekday: 'short'
  }).toUpperCase();
  const hour = h < 10 ? "0".concat(h) : h;
  const minute = m < 10 ? "0".concat(m) : m;
  const second = s < 10 ? "0".concat(s) : s;
  document.querySelector('.pp-clock-time').innerHTML = "".concat(day, " : ").concat(hour, " : ").concat(minute, " : ").concat(second);
  setTimeout(displayTime, 1000);
}
/**
 * Set and display formatted current date based on user locale
 * @returns {void} Nothing
 */


function displayDate() {
  const today = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  document.querySelector('.pp-clock-date').innerHTML = today.toLocaleDateString("it-IT", options);
}
/**
 * Toggle container css class to flip the module
 * @returns {void} Nothing
 */


function toggleClockDisplay() {
  clockContainer.classList.toggle('is-flipped');
}
},{}],"search/search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSearchModule = startSearchModule;
// //////// SEARCH //////// //
const iconList = document.querySelectorAll('.pp-search-icon');
/**
 * Main exported function that attaches event handler to specified DOM elements
 * @returns {void} Nothing
 */

function startSearchModule() {
  const searchContainer = document.querySelector('pp-search');
  const buttonsContainer = document.querySelector('pp-engine-buttons');
  buttonsContainer.addEventListener('click', toggleEngineIcons);
  searchContainer.addEventListener('keypress', sendSearch);
}
/**
 * Toggle icon display based on custom html attribute found through the click event
 * @param {Object} event the event object that contains click target data
 * @returns {void} Nothing
 */


function toggleEngineIcons(event) {
  iconList.forEach(icon => {
    icon.dataset.state = 'inactive';
  });
  event.target.dataset.state = 'active';
}
/**
 * Trigger search if enter key is pressed when using the module
 * the user picked search engine is retrieved through html custom attributes
 * @param {*} event the event object that we are checking for a key press
 * @returns {void} Nothing
 */


function sendSearch(event) {
  const input = document.querySelector('.pp-search-input');

  if (event.key === 'Enter') {
    const activeEngine = [...iconList].find(b => [...b.attributes][3].value === 'active');
    const activeEngineDomain = [...activeEngine.attributes][5].value;
    const url = "".concat(activeEngineDomain, "?q=").concat(input.value);
    window.open(url);
    input.value = '';
  }
}
},{}],"binance/binance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startBinanceModule = startBinanceModule;
// //////// BINANCE //////// //
let cryptoPicked = "btc ada ltc dot bch".split(' ')[0].toUpperCase();
const cryptoButtonsContainer = document.querySelector('pp-binance-selector');
const binanceLoaderContainer = document.querySelector('pp-binance-loader-container');
/**
 * Main exported module function that triggers data request, buttons list creation, chart line creation
 * footer values completion and attaches an event listener on modules buttons
 * @async
 * @returns {void} Nothing
 */

async function startBinanceModule() {
  const [klineData, tickerData] = await Promise.all([getBinanceKlinesData(), getBinanceTickerData()]);
  const binanceContainer = document.querySelector('pp-binance');
  binanceLoaderContainer.style.display = 'none';
  binanceContainer.style.display = 'flex';
  generateButtons();
  generateChartLine(klineData);
  completeFooterValues(tickerData);
  cryptoButtonsContainer.addEventListener('click', toggleButtons);
}
/**
 * GET klines data fron the binance API, used to draw the chart line
 * @async
 * @returns {Promise} Promise object
 */


async function getBinanceKlinesData() {
  const url = 'https://api.binance.com';
  const pair = "USDT";
  const klinesPath = '/api/v3/klines';
  const klinesParameters = "?symbol=".concat(cryptoPicked).concat(pair, "&interval=1d&limit=7");
  const response = await fetch("".concat(url).concat(klinesPath).concat(klinesParameters));

  if (!response.ok) {
    displayBinanceErrorOnPage(response);
    throw new Error("An error has occured: ".concat(response.status, " => ").concat(response.statusText));
  }

  return response.json();
}
/**
 * GET ticker data fron the binance API, used to get current crypto values
 * @async
 * @returns {Promise} Promise object
 */


async function getBinanceTickerData() {
  const url = 'https://api.binance.com';
  const pair = "USDT";
  const tickerPath = '/api/v3/ticker/24hr';
  const tickerParameters = "?symbol=".concat(cryptoPicked).concat(pair);
  const response = await fetch("".concat(url).concat(tickerPath).concat(tickerParameters));

  if (!response.ok) {
    displayBinanceErrorOnPage(response);
    throw new Error("An error has occured: ".concat(response.status, " => ").concat(response.statusText));
  }

  return response.json();
}
/**
 * Create and display a list of buttons based on user ENV variables choices
 * @returns {void} Nothing
 */


function generateButtons() {
  const symbolsList = "btc ada ltc dot bch".split(' ');
  symbolsList.forEach(symbol => {
    const newButton = document.createElement('button');
    cryptoButtonsContainer.append(newButton);
    newButton.className = 'binance-selector-button';
    newButton.dataset.state = 'inactive';
    newButton.innerHTML = symbol;
  });
  cryptoButtonsContainer.firstChild.dataset.state = 'active';
}
/**
 * Generate a chart line in SVG based on binance tickler API data.
 * @param {Array} data An array of arrays with choosen symbol data listed by days
 * @returns {void} Nothing
 */


function generateChartLine(data) {
  const filteredData = data.map(value => Number(value[1]));
  const svg = document.querySelector('.binance-chart-svg');
  const svgContainerWidth = document.querySelector('pp-binance-chart').offsetWidth;
  const svgContainerHeight = 130;
  const maxCryptoValue = Math.max(...filteredData);
  const minCryptoValue = Math.min(...filteredData);

  const xAxisPixelvalues = index => svgContainerWidth / (filteredData.length - 1) * index;

  const yAxisPixelValues = value => Math.round((value - minCryptoValue) * svgContainerHeight / (maxCryptoValue - minCryptoValue));

  const pixelCoordinatesArray = filteredData.map((value, index) => [xAxisPixelvalues(index), yAxisPixelValues(value)]);
  const svgPath = pixelCoordinatesArray.map(pixel => pixel[0] === 0 ? "M ".concat(pixel[0], ",").concat(pixel[1]) : "L ".concat(pixel[0], " ").concat(pixel[1])).join(' ');
  const svgCode = "\n    <defs>\n      <linearGradient id=\"gradient\" x1=\"0%\" x2=\"100%\">\n        <stop offset=\"0%\" stop-color=\"var(--module-background)\" />\n        <stop offset=\"20%\" stop-color=\"var(--main)\" />\n        <stop offset=\"80%\" stop-color=\"var(--main)\" />\n        <stop offset=\"100%\" stop-color=\"var(--module-background)\" />\n      </linearGradient>\n    </defs>\n    <path d=\"".concat(svgPath, "\" transform=\"translate(0, 10)\" stroke=\"url(#gradient)\" fill=\"none\" stroke-width=\"7\" stroke-linejoin=\"round\" />\n  ");
  svg.innerHTML = svgCode;
}
/**
 * Add lastPrice and priceCHange data on module footer
 * @param {Object} data An object of various current data about the choosen symbol
 * @returns {void} Nothing
 */


function completeFooterValues(data) {
  const differenceValue = document.querySelector('.binance-difference-value');
  const currentValue = document.querySelector('.binance-current-value');
  const pairSymbol = "$";
  const lastPrice = Number(data.lastPrice);
  const priceChange = Number(data.priceChange);
  differenceValue.innerHTML = "".concat(priceChange, "<span class=\"binance-money-unit\">").concat(pairSymbol, "</span>");
  currentValue.innerHTML = "".concat(lastPrice, "<span class=\"binance-money-unit\">").concat(pairSymbol, "</span>");
}
/**
 * If one of binance HTTP requests fail, get error response and display info on the page
 * @param {Object} response the error response from the API
 * @returns {void} Nothing
 */


function displayBinanceErrorOnPage(response) {
  const binanceErrorContainer = document.querySelector('pp-binance-error-container');
  const binanceErrorCode = document.querySelector('.binance-error-code');
  binanceErrorCode.innerHTML = response.status;
  binanceLoaderContainer.style.display = 'none';
  binanceErrorContainer.style.display = 'flex';
}
/**
 * If a button is clicked, his state is changed and HTTP requests are called again
 * @async
 * @param {Object} event Data about the clicked button
 * @returns {void} Nothing
 */


async function toggleButtons(event) {
  const buttonsList = document.querySelectorAll('.binance-selector-button');
  buttonsList.forEach(button => {
    button.dataset.state = 'inactive';
  });
  event.target.dataset.state = 'active';
  cryptoPicked = event.target.innerHTML.toUpperCase();
  const [klineData, tickerData] = await Promise.all([getBinanceKlinesData(), getBinanceTickerData()]);
  generateChartLine(klineData);
  completeFooterValues(tickerData);
}
},{}],"openweather/openweather.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startOpenWeatherModule = startOpenWeatherModule;
// //////// WEATHER //////// //
const openweatherInner = document.querySelector('pp-openweather-inner');
const loaderContainer = document.querySelector('pp-openweather-loader-container');
/**
 * Main exported module function that trigger data request, DOM elements collection, DOM elements filling
 * add an event listener on module and display it
 * @async
 * @returns {void} Nothing
 */

async function startOpenWeatherModule() {
  const [dom, data] = await Promise.all([catchOpenWeatherDomElements(), getOpenWeatherData()]);
  fillOpenWeatherDomElements(data, dom);
  openweatherInner.addEventListener('click', toggleOpenWeatherDisplay);
  loaderContainer.style.display = 'none';
  dom.container.style.display = 'flex';
}
/**
 * GET data fron the openWeather API
 * @async
 * @returns {Promise} Promise object
 */


async function getOpenWeatherData() {
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const city = "Pompei";
  const units = "metric";
  const apiKey = "470643540996736faadf629a5dd64f71";
  const response = await fetch("".concat(url, "?q=").concat(city, "&units=").concat(units, "&APPID=").concat(apiKey));

  if (!response.ok) {
    displayOpenWeatherErrorOnPage(response);
    throw new Error("An error has occured: ".concat(response.status, " => ").concat(response.statusText));
  }

  return response.json();
}
/**
 * GET DOM elements that will later be filled with data
 * @async
 * @returns {Promise} Promise object that resolved with DOM elements contained in an object
 */


async function catchOpenWeatherDomElements() {
  return {
    container: document.querySelector('pp-openweather'),
    temperature: document.querySelector('.temp-value'),
    humid: document.querySelector('.humid-value'),
    icons: [...document.querySelectorAll('.pp-openweather-icon')],
    cityName: document.querySelector('.city-value'),
    sunrise: document.querySelector('.openweather-back-sunrise'),
    sunset: document.querySelector('.openweather-back-sunset')
  };
}
/**
 * Fill targeted DOM elements with openweather API data
 * @param {Object} data data from the openwaether API
 * @param {Object} dom DOM elements
 * @returns {void} Nothing
 */


function fillOpenWeatherDomElements(data, dom) {
  dom.icons.forEach(icon => {
    if (icon.getAttribute('data-type').includes(data.weather[0].main.toLowerCase())) {
      icon.dataset.state = 'show';
    } else {
      icon.dataset.state = 'hide';
    }
  });
  dom.cityName.innerHTML = "Pompei" || "Pompei";
  dom.temperature.innerHTML = data.main.temp > 0 && data.main.temp < 10 ? "0".concat(Math.round(data.main.temp), "\xB0") : "".concat(Math.round(data.main.temp), "\xB0");
  dom.humid.innerHTML = "".concat(data.main.humidity, "%");
  dom.sunrise.innerHTML = formatTimestamp(data.sys.sunrise);
  dom.sunset.innerHTML = formatTimestamp(data.sys.sunset);
}
/**
 * If openweather HTTP request fails, get error response and display info on the page
 * @param {Object} response the error response from the API
 * @returns {void} Nothing
 */


function displayOpenWeatherErrorOnPage(response) {
  const errorContainer = document.querySelector('pp-openweather-error-container');
  const errorCode = document.querySelector('.openweather-error-code');
  errorCode.innerHTML = response.status;
  loaderContainer.style.display = 'none';
  errorContainer.style.display = 'flex';
}
/**
 * Format timestamp to human readable hours and minutes
 * @param {Number} stamp timestamp found in API response for sunrise and sunset
 * @returns {string} time in hours and minutes
 */


function formatTimestamp(stamp) {
  const date = new Date(stamp * 1000);
  let h = date.getHours();
  let m = date.getMinutes();
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return "".concat(h, ":").concat(m);
}
/**
 * Add/remove class on dom element for flipping whole module
 * @returns {void} Nothing
 */


function toggleOpenWeatherDisplay() {
  openweatherInner.classList.toggle('is-flipped');
}
},{}],"unsplash/unsplash.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startUnsplashModule = startUnsplashModule;
// //////// UNSPLASH //////// //
const unsplashLoaderContainer = document.querySelector('pp-unsplash-loader-container');
/**
 * Main module function that trigger data request, DOM elements collection and DOM elements filling
 * @async
 * @returns {void} Nothing
 */

async function startUnsplashModule() {
  const data = await getUnsplashData();
  const image = document.querySelector('.unsplash-small');
  const unsplashContainer = document.querySelector('pp-unsplash');
  image.src = data.urls.small;
  unsplashLoaderContainer.style.display = 'none';
  unsplashContainer.style.display = 'flex';
}
/**
 * GET data fron the unsplash API
 * @async
 * @returns {Promise} Promise object
 */


async function getUnsplashData() {
  const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  const orientation = 'landscape';
  const collectionId = "789734";
  const url = 'https://api.unsplash.com/';
  const path = 'photos/random/';
  const parameters = "client_id=".concat(apiKey, "&orientation=").concat(orientation, "&collections=").concat(collectionId);
  const response = await fetch("".concat(url).concat(path, "?").concat(parameters));

  if (!response.ok) {
    displayUnsplashErrorOnPage(response);
    throw new Error("An error has occured: ".concat(response.status, " => ").concat(response.statusText));
  }

  return response.json();
}
/**
 * If unsplash HTTP request fails, get error response and display info on the page
 * @param {Object} response the error response from the API
 * @returns {void} Nothing
 */


function displayUnsplashErrorOnPage(response) {
  const unsplashErrorContainer = document.querySelector('pp-unsplash-error-container');
  const unsplashErrorCode = document.querySelector('.unsplash-error-code');
  unsplashErrorCode.innerHTML = response.status;
  unsplashLoaderContainer.style.display = 'none';
  unsplashErrorContainer.style.display = 'flex';
}
},{}],"stormglass/stormglass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startStormglassModule = startStormglassModule;
// //////// STORMGLASS //////// //
const stormglassLoaderContainer = document.querySelector('pp-stormglass-loader-container');
/**
 * Main exported module function that triggers data request, DOM elements collection, DOM elements filling
 * and display the module
 * @async
 * @returns {void} Nothing
 */

async function startStormglassModule() {
  const [dom, data] = await Promise.all([catchStormglassDomElements(), getStormglassData()]);
  fillStormglassDomElements(dom, data);
  stormglassLoaderContainer.style.display = 'none';
  dom.stormglassContainer.style.display = 'flex';
}
/**
 * GET data fron the stormglass API
 * @async
 * @returns {Promise} Promise object
 */


async function getStormglassData() {
  const currentISODate = new Date().toISOString().slice(0, 13);
  const apiKey = "a6f39b94-112c-11ec-a9e0-0242ac130002-a6f39c0c-112c-11ec-a9e0-0242ac130002";
  const lat = "40.7457400";
  const lng = "14.4969800";
  const url = 'https://api.stormglass.io/v2/';
  const path = 'weather/point';
  const parameters = ['waterTemperature', 'waveDirection', 'waveHeight', 'wavePeriod', 'windDirection', 'windSpeed'];
  const response = await fetch("".concat(url).concat(path, "?lat=").concat(lat, "&lng=").concat(lng, "&params=").concat(parameters), {
    headers: {
      Authorization: apiKey
    }
  });

  if (!response.ok) {
    displayStormglassErrorOnPage(response);
    throw new Error("An error has occured: ".concat(response.status, " => ").concat(response.statusText));
  }

  const jsonResponse = await response.json();
  return jsonResponse.hours.find(h => h.time.includes(currentISODate));
}
/**
 * Get DOM elements that will later be filled with data
 * @async
 * @returns {Promise} Promise object that resolved with DOM elements contained in an object
 */


async function catchStormglassDomElements() {
  return {
    stormglassContainer: document.querySelector('pp-stormglass'),
    spotName: document.querySelector('.header-spot'),
    waterTemporary: document.querySelector('.watertemp-value'),
    windDirection: document.querySelector('.winddir-icon'),
    windSpeed: document.querySelector('.windspeed-value'),
    waveHeight: document.querySelector('.waveheight-value'),
    wavePeriod: document.querySelector('.waveperiod-value'),
    wavedir: document.querySelector('.wavedir-icon')
  };
}
/**
 * Fill targeted DOM elements with stormglass API data
 * @param {Object} data data from the stormglass API
 * @param {Object} dom DOM elements collection
 * @returns {void} Nothing
 */


async function fillStormglassDomElements(dom, data) {
  dom.spotName.innerHTML = "pompei-na";
  dom.waterTemporary.innerHTML = "".concat(Math.round(data.waterTemperature.meto || data.waterTemperature.noaa || data.waterTemperature.sg), "\xB0");
  dom.windDirection.style.transform = "rotate(".concat(data.windDirection.icon || data.windDirection.noaa || data.windDirection.sg, "deg)");
  dom.windSpeed.innerHTML = "".concat(data.windSpeed.icon || data.windSpeed.noaa || data.windSpeed.sg, "<span class=\"pp-stormglass-unit\">m/s</span>");
  dom.waveHeight.innerHTML = "".concat(data.waveHeight.icon || data.waveHeight.dwd, "<span class=\"pp-stormglass-unit\">m</span>");
  dom.wavePeriod.innerHTML = "".concat(Math.round(data.wavePeriod.icon || data.wavePeriod.noaa), "<span class=\"pp-stormglass-unit\">s</span>");
  dom.wavedir.style.transform = "rotate(".concat(data.waveDirection.icon || data.waveDirection.noaa || data.waveDirection.meteo, "deg)");
}
/**
 * If stormglass HTTP request fails, get error response and display info on the page
 * @param {Object} response the error response from the API
 * @returns {void} Nothing
 */


function displayStormglassErrorOnPage(response) {
  const stormglassErrorContainer = document.querySelector('pp-stormglass-error-container');
  const stormglassErrorCode = document.querySelector('.stormglass-error-code');
  const stormglassErrorMesage = document.querySelector('.stormglass-error-message');
  stormglassErrorCode.innerHTML = response.status;
  stormglassErrorMesage.innerHTML = response.statusText;
  stormglassLoaderContainer.style.display = 'none';
  stormglassErrorContainer.style.display = 'flex';
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _raisin = require("./raisin/raisin.js");

var _clock = require("./clock/clock.js");

var _search = require("./search/search.js");

var _binance = require("./binance/binance.js");

var _openweather = require("./openweather/openweather.js");

var _unsplash = require("./unsplash/unsplash.js");

var _stormglass = require("./stormglass/stormglass.js");

// //////// INDEX //////// //
// Raisin
(0, _raisin.truncateLinkName)(); // Clock

(0, _clock.startClockModule)(); // Search

(0, _search.startSearchModule)(); // Binance

(0, _binance.startBinanceModule)(); // Openweather

(0, _openweather.startOpenWeatherModule)(); // Unsplash

(0, _unsplash.startUnsplashModule)(); // Stormglass

(0, _stormglass.startStormglassModule)();
},{"./raisin/raisin.js":"raisin/raisin.js","./clock/clock.js":"clock/clock.js","./search/search.js":"search/search.js","./binance/binance.js":"binance/binance.js","./openweather/openweather.js":"openweather/openweather.js","./unsplash/unsplash.js":"unsplash/unsplash.js","./stormglass/stormglass.js":"stormglass/stormglass.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37725" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map