import {Component} from './Component';

/**
 * @property routes
 */
export class Router extends Component {

  constructor() {
    super(...arguments);
    this.errorHandler = this.app.getComponent('ErrorHandler');
    this.response = this.app.getComponent('Response');
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

    return this.errorHandler.handle(res, 404, `Page "${req.url}" not found`)
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

      if (($method === 'all' || $method === method) && url.match(re)) {
        $route = this.routes[route];
        return true;
      }
      return false;
    });

    return $route;
  }

}