'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Module = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _string = require('../helpers/string');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Module = exports.Module = function (_Component) {
	_inherits(Module, _Component);

	function Module() {
		_classCallCheck(this, Module);

		var _this = _possibleConstructorReturn(this, (Module.__proto__ || Object.getPrototypeOf(Module)).apply(this, arguments));

		_this.__controllers = {};

		if (_this.database) {
			var db = _this.app.getComponent('Database');
			db.initInstance(_this.database.instanceName, _this.database);
			_this.$db = db.getInstance(_this.database.instanceName);
		}
		return _this;
	}

	_createClass(Module, [{
		key: 'getController',
		value: function getController(name) {
			if (!this.__controllers[name]) {
				var controllerPath = _path2.default.join(this.basePath, 'controllers', (0, _string.ucfirst)(name) + 'Controller.js');
				if (_fs2.default.existsSync(controllerPath)) {
					this.__controllers[name] = require(controllerPath);
				} else {
					throw new Error('Controller "' + name + '" in module "' + this.constructor.name + '" not found');
				}
			}

			return this.__controllers[name];
		}
	}, {
		key: 'runAction',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(route) {
				var controller, action, $controller;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								controller = route.controller, action = route.action;
								$controller = this.getController(controller);

								if ($controller[action + 'Action']) {
									_context.next = 4;
									break;
								}

								throw new Error('Action "' + (action + 'Action') + '" in controller "' + controller + '" not found');

							case 4:
								_context.next = 6;
								return $controller[action + 'Action'](route, this);

							case 6:
								return _context.abrupt('return', _context.sent);

							case 7:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function runAction(_x) {
				return _ref.apply(this, arguments);
			}

			return runAction;
		}()
	}, {
		key: 'boot',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.$db) {
									_context2.next = 3;
									break;
								}

								_context2.next = 3;
								return this.initModels();

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function boot() {
				return _ref2.apply(this, arguments);
			}

			return boot;
		}()
	}, {
		key: 'initModels',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								return _context3.abrupt('return', this.app.getComponent('Database').initModels(_path2.default.join(this.basePath, 'models'), this.database.instanceName));

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function initModels() {
				return _ref3.apply(this, arguments);
			}

			return initModels;
		}()
	}]);

	return Module;
}(_Component2.Component);