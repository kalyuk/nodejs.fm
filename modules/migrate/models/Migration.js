import {ActiveModel} from '../../../core/ActiveModel';

export default class Migration extends ActiveModel {

  static $dbName = 'app';
  static $tableName = 'migration';

  static $schema = {
    name: {
      type: ActiveModel.TYPE_STRING(64),
      allowNull: false
    },
    moduleName: {
      type: ActiveModel.TYPE_STRING(64)
    }
  };

  name = null;
  moduleName = null;

}