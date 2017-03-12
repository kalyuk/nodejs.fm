'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ActiveModel2 = require('../../../core/ActiveModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MigrationModel = function (_ActiveModel) {
	_inherits(MigrationModel, _ActiveModel);

	function MigrationModel() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, MigrationModel);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MigrationModel.__proto__ || Object.getPrototypeOf(MigrationModel)).call.apply(_ref, [this].concat(args))), _this), _this.name = null, _this.moduleName = null, _temp), _possibleConstructorReturn(_this, _ret);
	}

	return MigrationModel;
}(_ActiveModel2.ActiveModel);

MigrationModel.$tableName = 'migration';
MigrationModel.$schema = {
	name: {
		type: _ActiveModel2.ActiveModel.TYPE_STRING(64),
		allowNull: false
	},
	moduleName: {
		type: _ActiveModel2.ActiveModel.TYPE_STRING(64)
	}
};
exports.default = MigrationModel;