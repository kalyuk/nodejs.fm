'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ActiveModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Model2 = require('./Model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActiveModel = exports.ActiveModel = function (_Model) {
	_inherits(ActiveModel, _Model);

	_createClass(ActiveModel, [{
		key: 'remove',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', this.$instance.destroy());

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function remove() {
				return _ref.apply(this, arguments);
			}

			return remove;
		}()
	}], [{
		key: 'getDbInstance',
		value: function getDbInstance() {
			return global.APP.getComponent('Database').getInstance(this.$dbName);
		}
	}, {
		key: 'runOrmMethod',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(method, options) {
				var _this2 = this;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt('return', this.getDbModel()[method](options).then(function (data) {
									if (data instanceof Array) {
										return data.map(function (item) {
											var instance = new _this2();
											instance.load(item);
											instance.$instance = item;
											return instance;
										});
									}

									var instance = new _this2();
									instance.load(data);
									instance.$instance = data;
									return instance;
								}));

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function runOrmMethod(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return runOrmMethod;
		}()
	}, {
		key: 'getDbModel',
		value: function getDbModel() {
			return this.getDbInstance().models[this.$tableName];
		}
	}, {
		key: 'findById',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								return _context3.abrupt('return', this.runOrmMethod('findById', id));

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function findById(_x3) {
				return _ref3.apply(this, arguments);
			}

			return findById;
		}()
	}, {
		key: 'findOne',
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(options) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								return _context4.abrupt('return', this.runOrmMethod('findOne', options));

							case 1:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function findOne(_x4) {
				return _ref4.apply(this, arguments);
			}

			return findOne;
		}()
	}, {
		key: 'find',
		value: function () {
			var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(options) {
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								return _context5.abrupt('return', this.findOne(options));

							case 1:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function find(_x5) {
				return _ref5.apply(this, arguments);
			}

			return find;
		}()
	}, {
		key: 'findOrCreate',
		value: function () {
			var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(options) {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								return _context6.abrupt('return', this.runOrmMethod('findOrCreate', options));

							case 1:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function findOrCreate(_x6) {
				return _ref6.apply(this, arguments);
			}

			return findOrCreate;
		}()
	}, {
		key: 'findAndCountAll',
		value: function () {
			var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(options) {
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								return _context7.abrupt('return', this.runOrmMethod('findAndCountAll', options));

							case 1:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function findAndCountAll(_x7) {
				return _ref7.apply(this, arguments);
			}

			return findAndCountAll;
		}()
	}, {
		key: 'findAll',
		value: function () {
			var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(options) {
				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								return _context8.abrupt('return', this.runOrmMethod('findAll', options));

							case 1:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function findAll(_x8) {
				return _ref8.apply(this, arguments);
			}

			return findAll;
		}()
	}, {
		key: 'count',
		value: function () {
			var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(options) {
				return regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								return _context9.abrupt('return', this.getDbModel().count(options));

							case 1:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function count(_x9) {
				return _ref9.apply(this, arguments);
			}

			return count;
		}()
	}, {
		key: 'max',
		value: function () {
			var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(field, options) {
				return regeneratorRuntime.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								return _context10.abrupt('return', this.getDbModel().max(field, options));

							case 1:
							case 'end':
								return _context10.stop();
						}
					}
				}, _callee10, this);
			}));

			function max(_x10, _x11) {
				return _ref10.apply(this, arguments);
			}

			return max;
		}()
	}, {
		key: 'min',
		value: function () {
			var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(field, options) {
				return regeneratorRuntime.wrap(function _callee11$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								return _context11.abrupt('return', this.getDbModel().min(field, options));

							case 1:
							case 'end':
								return _context11.stop();
						}
					}
				}, _callee11, this);
			}));

			function min(_x12, _x13) {
				return _ref11.apply(this, arguments);
			}

			return min;
		}()
	}, {
		key: 'sum',
		value: function () {
			var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(field, options) {
				return regeneratorRuntime.wrap(function _callee12$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								return _context12.abrupt('return', this.getDbModel().sum(field, options));

							case 1:
							case 'end':
								return _context12.stop();
						}
					}
				}, _callee12, this);
			}));

			function sum(_x14, _x15) {
				return _ref12.apply(this, arguments);
			}

			return sum;
		}()
	}]);

	function ActiveModel() {
		_classCallCheck(this, ActiveModel);

		var _this = _possibleConstructorReturn(this, (ActiveModel.__proto__ || Object.getPrototypeOf(ActiveModel)).apply(this, arguments));

		_this.$instance = null;

		_this.$dbInstance = _this.constructor.getDbInstance();
		_this.$dbModel = _this.constructor.getDbModel();
		return _this;
	}

	_createClass(ActiveModel, [{
		key: 'isNewInstance',
		value: function isNewInstance() {
			return this.$instance === null;
		}
	}, {
		key: 'save',
		value: function () {
			var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
				var isValid, values;
				return regeneratorRuntime.wrap(function _callee13$(_context13) {
					while (1) {
						switch (_context13.prev = _context13.next) {
							case 0:
								_context13.next = 2;
								return this.validate();

							case 2:
								isValid = _context13.sent;

								if (!isValid) {
									_context13.next = 12;
									break;
								}

								values = this.getValues();

								if (!this.isNewInstance()) {
									_context13.next = 9;
									break;
								}

								_context13.next = 8;
								return this.$dbModel.create(values);

							case 8:
								return _context13.abrupt('return', _context13.sent);

							case 9:
								_context13.next = 11;
								return this.$instance.update(values).save();

							case 11:
								return _context13.abrupt('return', _context13.sent);

							case 12:
								return _context13.abrupt('return', false);

							case 13:
							case 'end':
								return _context13.stop();
						}
					}
				}, _callee13, this);
			}));

			function save() {
				return _ref13.apply(this, arguments);
			}

			return save;
		}()
	}]);

	return ActiveModel;
}(_Model2.Model);

ActiveModel.TYPE_STRING = _sequelize2.default.STRING;
ActiveModel.TYPE_STRING_BINARY = _sequelize2.default.STRING.BINARY;
ActiveModel.TYPE_INTEGER = _sequelize2.default.INTEGER;
ActiveModel.TYPE_BIGINT = _sequelize2.default.BIGINT;
ActiveModel.TYPE_FLOAT = _sequelize2.default.FLOAT;
ActiveModel.TYPE_REAL = _sequelize2.default.REAL;
ActiveModel.TYPE_DOUBLE = _sequelize2.default.DOUBLE;
ActiveModel.TYPE_DECIMAL = _sequelize2.default.DECIMAL;
ActiveModel.TYPE_DATE = _sequelize2.default.DATE;
ActiveModel.TYPE_DATEONLY = _sequelize2.default.DATEONLY;
ActiveModel.TYPE_BOOLEAN = _sequelize2.default.BOOLEAN;
ActiveModel.TYPE_ENUM = _sequelize2.default.ENUM;
ActiveModel.TYPE_ARRAY = _sequelize2.default.ARRAY;
ActiveModel.TYPE_JSON = _sequelize2.default.JSON;
ActiveModel.TYPE_JSONB = _sequelize2.default.JSONB;
ActiveModel.TYPE_BLOB = _sequelize2.default.BLOB;
ActiveModel.TYPE_UUID = _sequelize2.default.UUID;
ActiveModel.TYPE_RANGE = _sequelize2.default.RANGE;
ActiveModel.TYPE_GEOMETRY = _sequelize2.default.GEOMETRY;
ActiveModel.$dbInstance = null;
ActiveModel.$dbName = 'db';
ActiveModel.$dbModel = null;
ActiveModel.$tableName = '';
ActiveModel.$paranoid = false;
ActiveModel.$timestamps = false;
ActiveModel.$freezeTableName = false;
ActiveModel.$schema = {};
ActiveModel.$relations = [];