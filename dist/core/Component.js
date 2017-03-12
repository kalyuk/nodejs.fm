"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function Component() {
	var _this = this;

	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	_classCallCheck(this, Component);

	Object.keys(config).forEach(function (propertyName) {
		_this[propertyName] = config[propertyName];
	});
	this.app = global.APP;
};