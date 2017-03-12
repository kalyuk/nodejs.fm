'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ErrorHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorHandler = exports.ErrorHandler = function (_Component) {
	_inherits(ErrorHandler, _Component);

	function ErrorHandler() {
		_classCallCheck(this, ErrorHandler);

		var _this = _possibleConstructorReturn(this, (ErrorHandler.__proto__ || Object.getPrototypeOf(ErrorHandler)).apply(this, arguments));

		_this.response = _this.app.getComponent('Response');
		return _this;
	}

	_createClass(ErrorHandler, [{
		key: 'handle',
		value: function handle(code, message) {
			var content = this.app.isDevelopment && code >= 500 || code < 500 ? message : 'Disaster struck';

			return {
				state: code,
				content: {
					code: code,
					error: content
				}
			};
		}
	}]);

	return ErrorHandler;
}(_Component2.Component);