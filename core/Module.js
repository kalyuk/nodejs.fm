import {Component} from './Component';
import {ucfirst} from '../helpers/string';
import fs from 'fs';
import path from 'path';

export class Module extends Component {

  $db;
  __controllers = {};

  constructor() {
    super(...arguments);
    if (this.database) {
      let db = this.app.getComponent('Database');
      db.initInstance(this.database.instanceName, this.database);
      this.$db = db.getInstance(this.database.instanceName);
    }
  }

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

  async boot() {
    await this.initModels();
  }

  async initModels() {
    return new Promise(resolve => {
      fs.readdir(path.join(this.basePath, 'models'), (err, files) => {
        if (!err) {
          files.forEach(file => {
            let modelName = file.match(/(\w+)Model\.js$/);
            if (modelName) {
              let ModelInstance = require(path.join(this.basePath, 'models', file)).default;
              this.$db.define(ModelInstance.$tableName, ModelInstance.$schema);
            }
          });
        }
        resolve();
      });
    });
  }

}