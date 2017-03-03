import {Component} from './Component';
import {ucfirst} from '../helpers/string';
import fs from 'fs';
import path from 'path';

export class Module extends Component {

  __controllers = {};

  getController(name) {
    if (!this.__controllers[name]) {
      let controllerPath = path.join(this.basePath, 'controllers', ucfirst(name) + 'Controller.js');
      if (fs.existsSync(controllerPath)) {
        this.__controllers[name] = require(controllerPath);
      } else {
        throw new Error(`Controller "${name}" in module "${this.constructor.name}" not found`);
      }
    }

    return this.__controllers[name];
  }

  async runAction(route) {
    let {controller, action} = route;
    let $controller = this.getController(controller);
    if (!$controller[action + 'Action']) {
      throw new Error(`Action "${action + 'Action'}" in controller "${controller}" not found`);
    }
    return await $controller[action + 'Action'](route, this);
  }

}