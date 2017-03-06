import {Component} from './Component';

/**
 * @property routes
 */
export class Router extends Component {

  constructor() {
    super(...arguments);
    this.errorHandler = this.app.getComponent('ErrorHandler');
    this.response = this.app.getComponent('Response');

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

  async handleRequest(req, res) {
    let route = this.match(req.method.toLowerCase(), req.url.toLowerCase());
    if (route) {
      try {
        let result = await this.app.getModule(route.module).runAction(route);
        return this.response.render(res, result);
      } catch (e) {
        return this.errorHandler.handle(res, 500, e.message);
      }
    }

    return this.errorHandler.handle(res, 404, `Page "${req.url}" not found`);
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