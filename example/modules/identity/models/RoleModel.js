import {ActiveModel} from '../../../../index';

export default class RoleModel extends ActiveModel {

	static STATE_ACTIVE = 'active';
	static STATE_BLOCKED = 'blocked';

	static $tableName = 'role';

	static $schema = {
		name: {
			type: ActiveModel.TYPE_STRING(64),
			allowNull: false,
			unique: true
		},
		description: {
			type: ActiveModel.TYPE_STRING
		},
		state: {
			type: ActiveModel.TYPE_ENUM(RoleModel.STATE_ACTIVE, RoleModel.STATE_BLOCKED),
			defaultValue: RoleModel.STATE_ACTIVE,
			allowNull: false
		}
	};

}