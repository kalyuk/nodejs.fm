'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Response = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _Component2 = require('./Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Response = exports.Response = function (_Component) {
	_inherits(Response, _Component);

	function Response() {
		_classCallCheck(this, Response);

		return _possibleConstructorReturn(this, (Response.__proto__ || Object.getPrototypeOf(Response)).apply(this, arguments));
	}

	_createClass(Response, [{
		key: 'render',
		value: function render(response, $data) {
			var result = (0, _lodash.merge)({
				headers: {
					'Content-Type': 'application/json',
					'Content-Encoding': 'UTF-8'
				},
				content: '',
				state: 200
			}, $data);

			var data = result.content;

			if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
				data = JSON.stringify({ data: data });
			}

			response.statusCode = result.state;

			Object.keys(result.headers).forEach(function (header) {
				response.setHeader(header, result.headers[header]);
			});

			response.setHeader('Content-Length', Buffer.byteLength(data));
			response.write(data);
			response.end();
		}
	}]);

	return Response;
}(_Component2.Component);