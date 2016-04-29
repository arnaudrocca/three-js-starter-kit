/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = new _app2.default();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _scene = __webpack_require__(3);

	var _scene2 = _interopRequireDefault(_scene);

	var _cube = __webpack_require__(4);

	var _cube2 = _interopRequireDefault(_cube);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function () {

	    /**
	     * @constructor
	     */

	    function App() {
	        _classCallCheck(this, App);

	        this.width = window.innerWidth;
	        this.height = window.innerHeight;

	        this.scene = new _scene2.default();
	        this.cube = new _cube2.default(200);

	        this.scene.add(this.cube.mesh);

	        var root = document.body.querySelector('.app');
	        root.appendChild(this.scene.renderer.domElement);

	        this.addListeners();
	    }

	    /**
	     * @method
	     * @name onResize
	     * @description Triggered when window is resized
	     */


	    _createClass(App, [{
	        key: 'onResize',
	        value: function onResize() {

	            this.width = window.innerWidth;
	            this.height = window.innerHeight;

	            this.scene.resize(this.width, this.height);
	        }

	        /**
	         * @method
	         * @name addListeners
	         */

	    }, {
	        key: 'addListeners',
	        value: function addListeners() {

	            window.addEventListener('resize', this.onResize.bind(this));
	            TweenMax.ticker.addEventListener('tick', this.update.bind(this));
	        }

	        /**
	         * @method
	         * @name update
	         * @description Triggered on every TweenMax tick
	         */

	    }, {
	        key: 'update',
	        value: function update() {

	            this.cube.update();

	            this.scene.render();
	        }
	    }]);

	    return App;
	}();

	exports.default = App;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {

	    /**
	     * @constructor
	     */

	    function Scene() {
	        _classCallCheck(this, Scene);

	        this.width = window.innerWidth;
	        this.height = window.innerHeight;

	        this.scene = new THREE.Scene();

	        this.renderer = new THREE.WebGLRenderer({ antialias: true });
	        this.renderer.setSize(this.width, this.height);
	        this.renderer.setClearColor(0x111111);

	        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 2000);
	        this.camera.position.z = 1000;
	    }

	    /**
	     * @method
	     * @name add
	     * @description Add a child to the scene
	     * @param {object} child - A THREE object
	     */


	    _createClass(Scene, [{
	        key: "add",
	        value: function add(child) {

	            this.scene.add(child);
	        }

	        /**
	         * @method
	         * @name remove
	         * @description Remove a child from the scene
	         * @param {object} child - A THREE object
	         */

	    }, {
	        key: "remove",
	        value: function remove(child) {

	            this.scene.remove(child);
	        }

	        /**
	         * @method
	         * @name render
	         * @description Renders/Draw the scene
	         */

	    }, {
	        key: "render",
	        value: function render() {

	            this.renderer.render(this.scene, this.camera);
	        }

	        /**
	         * @method
	         * @name resize
	         * @description Resize the scene according to screen size
	         * @param {number} newWidth
	         * @param {number} newHeight
	         */

	    }, {
	        key: "resize",
	        value: function resize(newWidth, newHeight) {

	            this.camera.aspect = newWidth / newHeight;
	            this.camera.updateProjectionMatrix();

	            this.renderer.setSize(newWidth, newHeight);
	        }
	    }]);

	    return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cube = function () {

	    /**
	     * @constructor
	     */

	    function Cube(size) {
	        _classCallCheck(this, Cube);

	        this.geometry = new THREE.BoxGeometry(size, size, size), this.material = new THREE.MeshBasicMaterial({
	            wireframe: true,
	            wireframeLinewidth: 2
	        });

	        this.mesh = new THREE.Mesh(this.geometry, this.material);
	    }

	    /**
	     * @method
	     * @name update
	     * @description Triggered on every TweenMax tick
	     */


	    _createClass(Cube, [{
	        key: "update",
	        value: function update() {

	            var rotation = .01;

	            this.mesh.rotation.x += rotation;
	            this.mesh.rotation.y += rotation;
	            this.mesh.rotation.z += rotation;
	        }
	    }]);

	    return Cube;
	}();

	exports.default = Cube;

/***/ }
/******/ ]);