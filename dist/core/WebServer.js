'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WebServer = exports.EVENT_CLOSE = exports.EVENT_REQUEST = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _Component2 = require('./Component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENT_REQUEST = exports.EVENT_REQUEST = 'request';
var EVENT_CLOSE = exports.EVENT_CLOSE = 'close';

var WebServer = exports.WebServer = function (_Component) {
	_inherits(WebServer, _Component);

	function WebServer() {
		_classCallCheck(this, WebServer);

		var _this = _possibleConstructorReturn(this, (WebServer.__proto__ || Object.getPrototypeOf(WebServer)).apply(this, arguments));

		_this.__server = null;

		_this.__server = _http2.default.createServer();
		_this.__server.timeout = _this.timeout;
		return _this;
	}

	_createClass(WebServer, [{
		key: 'onRequest',
		value: function onRequest(callback) {
			this.__server.on(EVENT_REQUEST, callback);
		}
	}, {
		key: 'onClose',
		value: function onClose(callback) {
			this.__server.on(EVENT_CLOSE, callback);
		}
	}, {
		key: 'listen',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var _this2 = this;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', new Promise(function (resolve) {
									_this2.__server.listen(_this2.port, _this2.host, function () {
										resolve(_this2);
									});
								}));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function listen() {
				return _ref.apply(this, arguments);
			}

			return listen;
		}()
	}]);

	return WebServer;
}(_Component2.Component);