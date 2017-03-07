import Sequelize from 'sequelize';
import {Component} from './Component';

export class Database extends Component {

  __instances = {};

  constructor() {
    super(...arguments);
    Object.keys(this.instance || {}).forEach(instanceName => {
      this.initInstance(instanceName, this.instance[instanceName]);
    });
  }

  initInstance(instanceName, config) {
    this.__instances[instanceName] = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params);
  }

  getInstance(instanceName) {
    if (!this.__instances[instanceName]) {
      throw new Error('Database "' + instanceName + '" did not initialize');
    }
    return this.__instances[instanceName];
  }

}