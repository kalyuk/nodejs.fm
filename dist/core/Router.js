'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = exports.Router = function (_Component) {
	_inherits(Router, _Component);

	function Router() {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));

		var routes = _this.routes;
		_this.routes = {};

		Object.keys(routes).forEach(function (route) {
			routes[route].__params = [];
			var $route = route.replace(/<(.*?):(.*?)>/ig, function (m, attr, key) {
				routes[route].__params.push(attr);
				return '(' + key + ')';
			});
			_this.routes[$route] = routes[route];
		});
		return _this;
	}

	_createClass(Router, [{
		key: 'match',
		value: function match(method, url) {
			var _this2 = this;

			var $route = false;

			Object.keys(this.routes).some(function (route) {
				var $method = 'all';
				var tmp = route.split(' ');
				var $url = tmp[0];

				if (tmp.length > 1) {
					$method = tmp[0].toLowerCase();
					$url = tmp[1];
				}

				var re = new RegExp('^' + $url + '$');

				var $match = url.match(re);
				if (($method === 'all' || $method === method) && $match) {
					$route = Object.assign({}, _this2.routes[route]);

					$route.__params.forEach(function (attr, index) {
						$route[attr] = $match[index + 1];
					});

					return true;
				}
				return false;
			});

			return $route;
		}
	}]);

	return Router;
}(_Component2.Component);