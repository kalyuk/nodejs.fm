'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Database = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Component2 = require('./Component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Database = exports.Database = function (_Component) {
	_inherits(Database, _Component);

	function Database() {
		_classCallCheck(this, Database);

		var _this = _possibleConstructorReturn(this, (Database.__proto__ || Object.getPrototypeOf(Database)).apply(this, arguments));

		_this.__instances = {};

		Object.keys(_this.instance || {}).forEach(function (instanceName) {
			_this.initInstance(instanceName, _this.instance[instanceName]);
		});
		return _this;
	}

	_createClass(Database, [{
		key: 'initInstance',
		value: function initInstance(instanceName, config) {
			if (!this.__instances[instanceName]) {
				this.__instances[instanceName] = new _sequelize2.default(config.database, config.username, config.password, config.params);
			}
		}
	}, {
		key: 'getInstance',
		value: function getInstance(instanceName) {
			if (!this.__instances[instanceName]) {
				throw new Error('Database "' + instanceName + '" did not initialize');
			}
			return this.__instances[instanceName];
		}
	}, {
		key: 'initModels',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(modelsPath, instanceName) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', new Promise(function (resolve) {
									_fs2.default.readdir(modelsPath, function (err, files) {
										if (!err) {
											files.forEach(function (file) {
												var modelName = file.match(/(\w+)Model\.js$/);
												if (modelName) {
													var ModelInstance = require(_path2.default.join(modelsPath, file)).default;

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
								}));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function initModels(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return initModels;
		}()
	}]);

	return Database;
}(_Component2.Component);