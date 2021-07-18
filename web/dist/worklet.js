/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../core/consts.js":
/*!******************************************************************!*\
  !*** /Users/alex./Documents/repos/jsynth-steps-2/core/consts.js ***!
  \******************************************************************/
/*! exports provided: sampleRate, attackSize, releaseSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sampleRate", function() { return sampleRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attackSize", function() { return attackSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "releaseSize", function() { return releaseSize; });
const sampleRate = 22050
const attackSize = 500;
const releaseSize = 5000;

/***/ }),

/***/ "../../core/modules/createModule.js":
/*!********************************************************************************!*\
  !*** /Users/alex./Documents/repos/jsynth-steps-2/core/modules/createModule.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(func, type = 'transform') {
    let returnFunc = (u, n, freqModulation) => [u, n, freqModulation]

    if (type === 'generator') {
        returnFunc = (u, n, freqModulation) => {
            return func(u, n, freqModulation)
        }
    } else if (type === 'transform') {
        returnFunc = (u, n, freqModulation) => {
            return func(u, n, freqModulation)
        }
    }

    return {
        func: returnFunc,
        type
    }
});

/***/ }),

/***/ "../../core/modules/delay.js":
/*!*************************************************************************!*\
  !*** /Users/alex./Documents/repos/jsynth-steps-2/core/modules/delay.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/consts */ "../../core/consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "../../core/modules/createModule.js");



const time = 0.4;
const depth = 6;
const gain = 0.6;
const feedbackSize = _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"] * 4 * depth;
const feedback = new Array(feedbackSize).fill(0)

function delay(u, n) {
    const delayAmountBySamples = time * _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"];
    const cyclicN = n % feedbackSize
    feedback[cyclicN] = u;
    
    for(let i = 1; i < depth; i++) {     
        const feedbackIndex = Math.abs(cyclicN - (i * delayAmountBySamples))
        const feedbackValue = feedback[feedbackIndex]
        
        u += (Math.pow(gain, i) * feedbackValue)
    }

    return u;
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(delay, 'transform'));

/***/ }),

/***/ "../../core/modules/oscillator.js":
/*!******************************************************************************!*\
  !*** /Users/alex./Documents/repos/jsynth-steps-2/core/modules/oscillator.js ***!
  \******************************************************************************/
/*! exports provided: getSineWave, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSineWave", function() { return getSineWave; });
/* harmony import */ var _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/consts */ "../../core/consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "../../core/modules/createModule.js");



const amplitude = 1;
const PiDividedBySampleRate = Math.PI / _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"];
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const baseFreq = 440;

function getSineWave(u, n, freqModulation) {
    const frequency = baseFreq * freqModulation
    const cyclicN= n % (~~(_jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__["sampleRate"] / frequency));
    return Math.sin(frequency * twoPiDividedBySampleRate * cyclicN) * amplitude
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(getSineWave, 'generator'));

/***/ }),

/***/ "../../core/synth.js":
/*!*****************************************************************!*\
  !*** /Users/alex./Documents/repos/jsynth-steps-2/core/synth.js ***!
  \*****************************************************************/
/*! exports provided: getMasterClock, subscribeModule, subscribeGeneratingModule, waveGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMasterClock", function() { return getMasterClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeModule", function() { return subscribeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeGeneratingModule", function() { return subscribeGeneratingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waveGenerator", function() { return waveGenerator; });
/* harmony import */ var _modules_oscillator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/oscillator */ "../../core/modules/oscillator.js");
/* harmony import */ var _modules_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/delay */ "../../core/modules/delay.js");



let masterClock = 0;

const getMasterClock = () => masterClock

let modules = []
let generatingModules = []

const subscribeModule = (module) => {
  modules.push(module)

  return () => {
    const index = modules.findIndex(_module => _module === module);
    modules = [...modules.slice(0, index), ...modules.slice(index + 1)]
  }
}

const subscribeGeneratingModule = (module) => {
  generatingModules.push(module)

  return () => {
    const index = generatingModules.findIndex(_module => _module === module);
    generatingModules = [...generatingModules.slice(0, index), ...generatingModules.slice(index + 1)]
  }
}

subscribeGeneratingModule(_modules_oscillator__WEBPACK_IMPORTED_MODULE_0__["default"])
subscribeModule(_modules_delay__WEBPACK_IMPORTED_MODULE_1__["default"])

function waveGenerator(triggers) {
  let wave = 0;

  Object.keys(triggers).forEach((id) => {
    const {frequencyModulation, shouldGenerate} = triggers[id]

    if (!shouldGenerate) return;

    wave = generatingModules.reduce((acc, {func}) => {
      return acc + func(acc, masterClock, frequencyModulation)
    }, wave)
  })

  wave = modules.reduce((acc, {func}) => {
    return func(acc, masterClock)
  }, wave)
  masterClock++
  
  // Decrease volume 
  const mixVolume =  0.2
  return wave * mixVolume

   
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/synth */ "../../core/synth.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var triggers = {};

var SynthWorklet = /*#__PURE__*/function (_AudioWorkletProcesso) {
  _inherits(SynthWorklet, _AudioWorkletProcesso);

  var _super = _createSuper(SynthWorklet);

  function SynthWorklet() {
    var _this;

    _classCallCheck(this, SynthWorklet);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.port.onmessage = function (e) {
      triggers = JSON.parse(e.data);
    };

    return _this;
  }

  _createClass(SynthWorklet, [{
    key: "process",
    value: function process(inputs, outputs, parameters) {
      var input = inputs[0];
      var output = outputs[0];

      for (var channel = 0; channel < output.length; ++channel) {
        for (var i = 0; i < output[channel].length; ++i) {
          output[channel][i] = Object(_jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__["waveGenerator"])(triggers);
        }
      }

      return true;
    }
  }]);

  return SynthWorklet;
}( /*#__PURE__*/_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor('synth', SynthWorklet);

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=worklet.js.map