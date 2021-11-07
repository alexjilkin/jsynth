/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../core/consts.js":
/*!****************************!*\
  !*** ../../core/consts.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sampleRate": () => (/* binding */ sampleRate),
/* harmony export */   "attackSize": () => (/* binding */ attackSize),
/* harmony export */   "releaseSize": () => (/* binding */ releaseSize)
/* harmony export */ });
const sampleRate = 22050
const attackSize = 500;
const releaseSize = 5000;

/***/ }),

/***/ "../../core/modules/createModule.js":
/*!******************************************!*\
  !*** ../../core/modules/createModule.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(func, type = 'transform') {
    let returnFunc = (u, n, freqModulation) => [u, n, freqModulation]

    if (type === 'generator') {
        returnFunc = (u, n, freqModulation, args) => {
            return func(u, n, freqModulation, args)
        }
    } else if (type === 'transform') {
        returnFunc = (u, n, args) => {
            return func(u, n, args)
        }
    }

    return {
        func: returnFunc,
        type
    }
}

/***/ }),

/***/ "../../core/modules/delay.js":
/*!***********************************!*\
  !*** ../../core/modules/delay.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setTime": () => (/* binding */ setTime),
/* harmony export */   "setDepth": () => (/* binding */ setDepth),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/consts */ "../../core/consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "../../core/modules/createModule.js");



let feedbackSize = _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate * 4 * 5;
let feedback = new Array(feedbackSize).fill(0)
let k = 0;

function delay(u, n, args) {
    const {time, depth, gain} = args;

    const delayAmountBySamples = time * _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate;
    const cyclicN = n % feedbackSize
    feedback[cyclicN] = u;
    
    for(let i = 1; i < depth; i++) {     
        const feedbackIndex = Math.round(Math.abs(cyclicN - (i * delayAmountBySamples)))
        const feedbackValue = feedback[feedbackIndex]

        u += (Math.pow(gain, i) * feedbackValue)
    }

    return u;
}

const setTime = v => time = v;
const setDepth = v => depth = v;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(delay, 'transform'));

/***/ }),

/***/ "../../core/modules/lowpass/index.js":
/*!*******************************************!*\
  !*** ../../core/modules/lowpass/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lowpass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lowpass */ "../../core/modules/lowpass/lowpass.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lowpass__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "../../core/modules/lowpass/lowpass.js":
/*!*********************************************!*\
  !*** ../../core/modules/lowpass/lowpass.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createModule */ "../../core/modules/createModule.js");


let previousResult = 0;

function lowpass(u, n, args) {
    const {frequency} = args

    const result = previousResult + ((frequency) * (u - previousResult))
    previousResult = result

    return result
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createModule__WEBPACK_IMPORTED_MODULE_0__["default"])(lowpass, 'transform', {}));

/***/ }),

/***/ "../../core/modules/oscillator.js":
/*!****************************************!*\
  !*** ../../core/modules/oscillator.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSineWave": () => (/* binding */ getSineWave),
/* harmony export */   "getSquareWave": () => (/* binding */ getSquareWave),
/* harmony export */   "getSawWave": () => (/* binding */ getSawWave),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/consts */ "../../core/consts.js");
/* harmony import */ var _createModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createModule */ "../../core/modules/createModule.js");



const amplitude = 1;
const PiDividedBySampleRate = Math.PI / _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const baseFrequency = 440;
function oscillator(u, n, freqModulation, args) {
    const {sineAmount, sawAmount, squareAmount} = args
    
    const totalAmount = Math.abs(sineAmount) + Math.abs(sawAmount) + Math.abs(squareAmount)
    return ((getSineWave(u, n, freqModulation) * Math.abs(sineAmount)) + (getSquareWave(u, n, freqModulation) * Math.abs(squareAmount)) + (getSawWave(u, n, freqModulation) * Math.abs(sawAmount))) / totalAmount

}
function getSineWave(u, n, freqModulation) {
    const frequency = baseFrequency * freqModulation
    const cyclicN= n % (~~(_jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate / frequency));

    return Math.cos(frequency * twoPiDividedBySampleRate * cyclicN) * amplitude
}

function getSquareWave(u, n, freqModulation) {
    const frequency = baseFrequency * freqModulation
    const cyclicX = n % (~~(_jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate / frequency));

    return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (cyclicX % _jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate))) * (amplitude / 2);
  }
  
  function getSawWave(u, n, freqModulation) {
    const frequency = baseFrequency * freqModulation
    const cyclicX = n % (~~(_jsynth_core_consts__WEBPACK_IMPORTED_MODULE_0__.sampleRate / frequency));
  
    return (-1) * (amplitude / 2)  * arcctg(ctg((cyclicX) * frequency * PiDividedBySampleRate)) / Math.PI
  }

function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createModule__WEBPACK_IMPORTED_MODULE_1__["default"])(oscillator, 'generator'));

/***/ }),

/***/ "../../core/synth.js":
/*!***************************!*\
  !*** ../../core/synth.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMasterClock": () => (/* binding */ getMasterClock),
/* harmony export */   "subscribeModule": () => (/* binding */ subscribeModule),
/* harmony export */   "clearModules": () => (/* binding */ clearModules),
/* harmony export */   "waveGenerator": () => (/* binding */ waveGenerator)
/* harmony export */ });
let masterClock = 0;

const getMasterClock = () => masterClock

let modules = []
let generatingModules = []

const subscribeModule = (type, module) => {
  type === 'generator' ? subscribeGeneratingModule(module) : subscribeTransformingModule(module)
}
  

const subscribeTransformingModule = (module) => {
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
const clearModules = () => {
  modules = []
  generatingModules = []
}

function waveGenerator(triggers) {
  let wave = 0;

  Object.keys(triggers).forEach((id) => {
    const {frequencyModulation, shouldGenerate} = triggers[id]

    if (!shouldGenerate) return;

    wave = generatingModules.reduce((acc, {func, args}) => {
      return acc + func(acc, masterClock, frequencyModulation, args)
    }, wave)
  })

  wave = modules.reduce((acc, {func, args}) => {
    return func(acc, masterClock, args)
  }, wave)
  masterClock++
  
  // Decrease volume 
  const mixVolume =  0.3
  return wave * mixVolume
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsynth/core/synth */ "../../core/synth.js");
/* harmony import */ var _jsynth_core_modules_delay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsynth/core/modules/delay */ "../../core/modules/delay.js");
/* harmony import */ var _jsynth_core_modules_lowpass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsynth/core/modules/lowpass */ "../../core/modules/lowpass/index.js");
/* harmony import */ var _jsynth_core_modules_oscillator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsynth/core/modules/oscillator */ "../../core/modules/oscillator.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var availableModules = {
  delay: _jsynth_core_modules_delay__WEBPACK_IMPORTED_MODULE_1__["default"],
  lowpass: _jsynth_core_modules_lowpass__WEBPACK_IMPORTED_MODULE_2__["default"],
  oscillator: _jsynth_core_modules_oscillator__WEBPACK_IMPORTED_MODULE_3__["default"]
};
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
      var data = JSON.parse(e.data);
      triggers = data.triggers;

      if (data.isUpdated) {
        (0,_jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__.clearModules)();
        data.modules.forEach(function (_ref) {
          var name = _ref.name,
              args = _ref.args,
              type = _ref.type;
          (0,_jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__.subscribeModule)(type, _objectSpread(_objectSpread({}, availableModules[name]), {}, {
            args: args
          }));
        });
      }
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
          try {
            output[channel][i] = (0,_jsynth_core_synth__WEBPACK_IMPORTED_MODULE_0__.waveGenerator)(triggers);
          } catch (err) {
            console.log(err);
          }
        }
      }

      return true;
    }
  }]);

  return SynthWorklet;
}( /*#__PURE__*/_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor('synth', SynthWorklet);
})();

/******/ })()
;
//# sourceMappingURL=worklet.js.map