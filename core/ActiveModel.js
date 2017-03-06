import Sequelize from 'sequelize';
import {Model} from './Model';

export class ActiveModel extends Model {

  static TYPE_STRING = Sequelize.STRING;
  static TYPE_STRING_BINARY = Sequelize.STRING.BINARY;
  static TYPE_INTEGER = Sequelize.INTEGER;
  static TYPE_BIGINT = Sequelize.BIGINT;
  static TYPE_FLOAT = Sequelize.FLOAT;
  static TYPE_REAL = Sequelize.REAL;
  static TYPE_DOUBLE = Sequelize.DOUBLE;
  static TYPE_DECIMAL = Sequelize.DECIMAL;
  static TYPE_DATE = Sequelize.DATE;
  static TYPE_DATEONLY = Sequelize.DATEONLY;
  static TYPE_BOOLEAN = Sequelize.BOOLEAN;
  static TYPE_ENUM = Sequelize.ENUM;
  static TYPE_ARRAY = Sequelize.ARRAY;
  static TYPE_JSON = Sequelize.JSON;
  static TYPE_JSONB = Sequelize.JSONB;
  static TYPE_BLOB = Sequelize.BLOB;
  static TYPE_UUID = Sequelize.UUID;
  static TYPE_RANGE = Sequelize.RANGE;
  static TYPE_GEOMETRY = Sequelize.GEOMETRY;

  static $dbInstance = null;
  static $dbName = 'db';
  static $dbModel = null;
  static tableName = '';

  static $schema = {};

  instance = null;

  constructor() {
    super(...arguments);
    this.$dbInstance = this.getDbInstance();
    this.$dbModel = this.getDbModel();
  }

  isNewInstance() {
    return this.instance === null;
  }

  static getDbInstance() {
    return global.App.getComponent('Database').getInstance(this.$dbName);
  }

  static getDbModel() {
    return this.getDbInstance()[this.tableName];
  }

  async save() {
    let isValid = await this.validate();
    if (isValid) {
      let values = this.getValues();
      if (this.isNewInstance()) {
        return await this.$dbModel.create(values);
      }
      return await this.instance.update(values).save();
    }
    return false;
  }

  static async findById(id) {
    return await this.getDbModel().findById(id);
  }
}
