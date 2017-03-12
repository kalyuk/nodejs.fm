'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Application = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _WebServer = require('./WebServer');

var _Router = require('./Router');

var _Response = require('./Response');

var _ErrorHandler = require('./ErrorHandler');

var _Database = require('./Database');

var _ConsoleRender = require('./ConsoleRender');

var _Request = require('./Request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = exports.Application = function () {
	function Application(configPath) {
		_classCallCheck(this, Application);

		this.__webServer = null;
		this.__components = {};
		this.__modules = {};
		this.__boot = null;
		this.components = {
			WebServer: _WebServer.WebServer,
			Router: _Router.Router,
			Response: _Response.Response,
			ErrorHandler: _ErrorHandler.ErrorHandler,
			Database: _Database.Database,
			ConsoleRender: _ConsoleRender.ConsoleRender,
			Request: _Request.Request
		};
		this.config = {
			components: {},
			modules: {}
		};
		this.args = {
			env: 'development',
			route: ''
		};

		console.log('Running application'); // eslint-disable-line no-console
		this.parseArgs();
		this.loadConfig(configPath);
		global.APP = this;
		this.router = this.getComponent('Router');
		this.request = this.getComponent('Request');
		this.errorHandler = this.getComponent('ErrorHandler');
		this.isDevelopment = this.args.env === 'development';
		this.__boot = this.boot();
	}

	_createClass(Application, [{
		key: 'boot',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var _this = this;

				var promises;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								console.log('Running application boot'); // eslint-disable-line no-console

								promises = [];


								Object.keys(this.config.modules).forEach(function (moduleName) {
									promises.push(_this.getModule(moduleName).boot());
								});

								return _context.abrupt('return', Promise.all(promises));

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function boot() {
				return _ref.apply(this, arguments);
			}

			return boot;
		}()
	}, {
		key: 'parseArgs',
		value: function parseArgs() {
			var _this2 = this;

			process.argv.forEach(function (val) {
				var tmp = val.split('=');
				_this2.args[tmp[0]] = tmp[1];
			});
		}
	}, {
		key: 'loadConfig',
		value: function loadConfig(configPath) {
			if (_fs2.default.existsSync(configPath)) {
				var configFile = require(configPath).default();
				if (configFile.default) {
					Object.assign(this.config, configFile.default);
				}

				if (configFile[this.args.env]) {
					Object.assign(this.config, configFile[this.args.env]);
				}
			}
		}
	}, {
		key: 'handleRequest',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
				var isCommand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				var route, response, result, _error, error;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								route = this.router.match(req.method.toLowerCase(), req.url.toLowerCase());


								if (req.body) {
									route.body = req.body;
								}

								response = !isCommand ? this.getComponent('Response') : this.getComponent('ConsoleRender');

								if (!route) {
									_context2.next = 15;
									break;
								}

								_context2.prev = 4;
								_context2.next = 7;
								return this.getModule(route.module).runAction(route);

							case 7:
								result = _context2.sent;
								return _context2.abrupt('return', response.render(res, result));

							case 11:
								_context2.prev = 11;
								_context2.t0 = _context2['catch'](4);
								_error = this.errorHandler.handle(500, _context2.t0.message);
								return _context2.abrupt('return', response.render(res, _error));

							case 15:
								error = this.errorHandler.handle(404, 'Page "' + req.url + '" not found');
								return _context2.abrupt('return', response.render(res, error));

							case 17:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[4, 11]]);
			}));

			function handleRequest(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return handleRequest;
		}()
	}, {
		key: 'initWebServer',
		value: function initWebServer() {
			var _this3 = this;

			if (!this.__webServer) {
				this.__webServer = this.getComponent('WebServer');
				this.__webServer.onRequest(function (request, res) {
					if (request.method === 'POST' || request.method === 'PUT') {
						request.rawBody = '';

						request.on('data', function (data) {
							request.rawBody += data;
							if (request.rawBody.length > 1e6) {
								request.connection.destroy();
							}
						});

						request.on('end', function () {
							_this3.request.parse(request);
							_this3.handleRequest(request, res);
						});
					} else {
						_this3.handleRequest(request, res);
					}
				});
			}
		}
	}, {
		key: 'runServer',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.__boot;

							case 2:
								this.initWebServer();
								_context3.next = 5;
								return this.__webServer.listen();

							case 5:
								return _context3.abrupt('return', _context3.sent);

							case 6:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function runServer() {
				return _ref3.apply(this, arguments);
			}

			return runServer;
		}()
	}, {
		key: 'runCommand',
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.__boot;

							case 2:
								_context4.next = 4;
								return this.handleRequest({ url: this.args.route, method: 'command' }, {}, true);

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function runCommand() {
				return _ref4.apply(this, arguments);
			}

			return runCommand;
		}()
	}, {
		key: 'getModules',
		value: function getModules() {
			return this.__modules;
		}
	}, {
		key: 'getComponent',
		value: function getComponent(name) {
			if (!this.components[name]) {
				throw new Error('Component "' + name + '" not found');
			}
			if (!this.__components[name]) {
				if (typeof this.components[name] === 'function') {
					this.__components[name] = new this.components[name](this.config.components[name]);
				} else if (this.components[name] && typeof this.components[name].Instance === 'function') {
					this.__components[name] = new this.components[name].Instance(this.components[name]);
				} else {
					throw new Error('Component "' + name + '" did not resolve');
				}
			}
			return this.__components[name];
		}
	}, {
		key: 'getModule',
		value: function getModule(name) {
			if (!this.config.modules[name]) {
				throw new Error('Module "' + name + '" not found');
			}

			if (!this.__modules[name]) {
				if (this.config.modules[name] && typeof this.config.modules[name].Instance === 'function') {
					this.__modules[name] = new this.config.modules[name].Instance(this.config.modules[name]);
				} else {
					throw new Error('Module "' + name + '" did not resolve');
				}
			}

			return this.__modules[name];
		}
	}]);

	return Application;
}();