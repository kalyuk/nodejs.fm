"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ucfirst = ucfirst;
function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.substr(1, str.length - 1);
}