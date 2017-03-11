import {Component} from './Component';

export class Router extends Component {

	constructor() {
		super(...arguments);

		let routes = this.routes;
		this.routes = {};

		Object.keys(routes).forEach(route => {
			routes[route].__params = [];
			let $route = route.replace(/<(.*?):(.*?)>/ig, (m, attr, key) => {
				routes[route].__params.push(attr);
				return '(' + key + ')';
			});
			this.routes[$route] = routes[route];
		});
	}

	match(method, url) {
		let $route = false;

		Object.keys(this.routes).some((route) => {
			let $method = 'all';
			let tmp = route.split(' ');
			let $url = tmp[0];

			if (tmp.length > 1) {
				$method = tmp[0].toLowerCase();
				$url = tmp[1];
			}

			let re = new RegExp(`^${$url}$`);

			let $match = url.match(re);
			if (($method === 'all' || $method === method) && $match) {
				$route = Object.assign({}, this.routes[route]);

				$route.__params.forEach((attr, index) => {
					$route[attr] = $match[index + 1];
				});

				return true;
			}
			return false;
		});

		return $route;
	}

}