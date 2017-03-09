import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';
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
    if (!this.__instances[instanceName]) {
      this.__instances[instanceName] = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params);
    }
  }

  getInstance(instanceName) {
    if (!this.__instances[instanceName]) {
      throw new Error('Database "' + instanceName + '" did not initialize');
    }
    return this.__instances[instanceName];
  }

  async initModels(modelsPath, instanceName) {
    return new Promise(resolve => {
      fs.readdir(modelsPath, (err, files) => {
        if (!err) {
          files.forEach(file => {
            let modelName = file.match(/(\w+)Model\.js$/);
            if (modelName) {
              let ModelInstance = require(path.join(modelsPath, file)).default;

              if (instanceName) {
                ModelInstance.$dbName = instanceName;
              }

              ModelInstance.getDbInstance().define(ModelInstance.$tableName, ModelInstance.$schema, {
                tableName: ModelInstance.$tableName,
                paranoid: ModelInstance.$paranoid,
                timestamps: ModelInstance.$timestamps,
                freezeTableName: ModelInstance.$freezeTableName
              });
            }
          });
        }
        resolve();
      });
    });
  }

}