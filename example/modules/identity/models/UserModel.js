import {ActiveModel} from '../../../../src/core/ActiveModel';

export default class UserModel extends ActiveModel {

	static $dbName = 'identityDb';
	static $tableName = 'user';

	static $schema = {
		email: {
			type: ActiveModel.TYPE_STRING(64),
			allowNull: false,
			unique: true
		},
		password: {
			type: ActiveModel.TYPE_STRING(128)
		},
		status: {
			type: ActiveModel.TYPE_ENUM('new', 'blocked'),
			defaultValue: 'new',
			allowNull: false
		}
	};

	email = null;
	password = null;
	status = 'new';

}