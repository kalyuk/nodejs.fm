'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ConsoleRender = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsoleRender = exports.ConsoleRender = function (_Component) {
	_inherits(ConsoleRender, _Component);

	function ConsoleRender() {
		_classCallCheck(this, ConsoleRender);

		return _possibleConstructorReturn(this, (ConsoleRender.__proto__ || Object.getPrototypeOf(ConsoleRender)).apply(this, arguments));
	}

	_createClass(ConsoleRender, [{
		key: 'render',
		value: function render(response, data) {
			console.log(data.content);
		}
	}]);

	return ConsoleRender;
}(_Component2.Component);