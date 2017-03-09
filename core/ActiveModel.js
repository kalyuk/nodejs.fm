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
  static $tableName = '';
  static $paranoid = false;
  static $timestamps = false;
  static $freezeTableName = false;

  static $schema = {};
  static $relations = [];

  static getDbInstance() {
    return global.APP.getComponent('Database').getInstance(this.$dbName);
  }

  static async runOrmMethod(method, options) {
    return this.getDbModel()[method](options).then(data => {
      if (data instanceof Array) {
        return data.map(item => {
          let instance = new this();
          instance.load(item);
          instance.$instance = item;
          return instance;
        });
      }

      let instance = new this();
      instance.load(data);
      instance.$instance = data;
      return instance;

    });
  }

  static getDbModel() {
    return this.getDbInstance().models[this.$tableName];
  }

  static async findById(id) {
    return this.runOrmMethod('findById', id);
  }

  static async findOne(options) {
    return this.runOrmMethod('findOne', options);
  }

  static async find(options) {
    return this.findOne(options);
  }

  static async findOrCreate(options) {
    return this.runOrmMethod('findOrCreate', options);
  }

  static async findAndCountAll(options) {
    return this.runOrmMethod('findAndCountAll', options);
  }

  static async findAll(options) {
    return this.runOrmMethod('findAll', options);
  }

  static async count(options) {
    return this.getDbModel().count(options);
  }

  static async max(field, options) {
    return this.getDbModel().max(field, options);
  }

  static async min(field, options) {
    return this.getDbModel().min(field, options);
  }

  static async sum(field, options) {
    return this.getDbModel().sum(field, options);
  }

  async remove() {
    return this.$instance.destroy();
  }

  $instance = null;

  constructor() {
    super(...arguments);
    this.$dbInstance = this.constructor.getDbInstance();
    this.$dbModel = this.constructor.getDbModel();
  }

  isNewInstance() {
    return this.$instance === null;
  }

  async save() {
    let isValid = await this.validate();
    if (isValid) {
      let values = this.getValues();
      if (this.isNewInstance()) {
        return await this.$dbModel.create(values);
      }
      return await this.$instance.update(values).save();
    }
    return false;
  }
}
