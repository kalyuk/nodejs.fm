import {ActiveModel} from '../../../../index';

export default class PermissionModel extends ActiveModel {

	static $tableName = 'permission';

	static $schema = {
		name: {
			type: ActiveModel.TYPE_STRING(64),
			allowNull: false,
			unique: true
		},
		description: {
			type: ActiveModel.TYPE_STRING
		}
	};

}