'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createAction = exports.downAction = exports.upAction = undefined;

var upAction = exports.upAction = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params, _ref2) {
		var app = _ref2.app;
		var modules, i, module, migrationsPath, migrations, files, q, file, migration, $migration;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						modules = app.args.modules ? app.args.modules.split(',') : Object.keys(app.getModules());
						i = 0;

					case 2:
						if (!(i < modules.length)) {
							_context.next = 32;
							break;
						}

						module = app.getModule(modules[i]);

						if (module.$db) {
							_context.next = 6;
							break;
						}

						return _context.abrupt('continue', 29);

					case 6:
						migrationsPath = _path2.default.join(module.basePath, 'migrations');
						_context.next = 9;
						return module.$db.sync();

					case 9:
						_context.next = 11;
						return _MigrationModel2.default.findAll({
							where: {
								moduleName: modules[i]
							}
						});

					case 11:
						migrations = _context.sent;


						migrations = migrations.map(function (migrate) {
							return migrate.name + '-' + migrate.moduleName;
						});

						files = _fs2.default.readdirSync(migrationsPath);
						q = 0;

					case 15:
						if (!(q < files.length)) {
							_context.next = 29;
							break;
						}

						file = files[q];

						if (!(migrations.indexOf(file + '-' + modules[i]) === -1)) {
							_context.next = 26;
							break;
						}

						migration = require(_path2.default.join(migrationsPath, file));
						_context.next = 21;
						return migration.up();

					case 21:
						if (!_context.sent) {
							_context.next = 26;
							break;
						}

						$migration = new _MigrationModel2.default();

						$migration.load({ moduleName: modules[i], name: file });

						_context.next = 26;
						return $migration.save();

					case 26:
						q++;
						_context.next = 15;
						break;

					case 29:
						i++;
						_context.next = 2;
						break;

					case 32:
						return _context.abrupt('return', {
							content: 'Migrations up'
						});

					case 33:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function upAction(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var downAction = exports.downAction = function () {
	var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(params, _ref4) {
		var app = _ref4.app;
		var module, migrationsPath, $migration, migration;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (app.args.module) {
							_context2.next = 2;
							break;
						}

						throw new Error('The name of the module is not specified');

					case 2:
						module = app.getModule(app.args.module);
						migrationsPath = _path2.default.join(module.basePath, 'migrations');
						_context2.next = 6;
						return module.$db.sync();

					case 6:
						_context2.next = 8;
						return _MigrationModel2.default.find({
							where: {
								moduleName: app.args.module
							},
							order: 'id DESC'
						});

					case 8:
						$migration = _context2.sent;
						migration = require(_path2.default.join(migrationsPath, $migration.name));
						_context2.next = 12;
						return migration.down();

					case 12:
						if (!_context2.sent) {
							_context2.next = 15;
							break;
						}

						_context2.next = 15;
						return $migration.remove();

					case 15:
						return _context2.abrupt('return', {
							content: 'Migrations down'
						});

					case 16:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function downAction(_x3, _x4) {
		return _ref3.apply(this, arguments);
	};
}();

var createAction = exports.createAction = function () {
	var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(params, _ref6) {
		var app = _ref6.app;
		var module, name, time, migrationPath;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (app.args.module) {
							_context3.next = 2;
							break;
						}

						throw new Error('The name of the module is not specified');

					case 2:
						module = app.getModule(app.args.module);
						name = app.args.name ? '_' + app.args.name : '';
						time = new Date().getTime();
						migrationPath = _path2.default.join(module.basePath, 'migrations', time + name + '.js');


						_fs2.default.writeFileSync(migrationPath, MIGRATION_TEMPLATE);

						return _context3.abrupt('return', {
							content: app.args.module
						});

					case 8:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function createAction(_x5, _x6) {
		return _ref5.apply(this, arguments);
	};
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _MigrationModel = require('../models/MigrationModel');

var _MigrationModel2 = _interopRequireDefault(_MigrationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MIGRATION_TEMPLATE = 'export async function up(){\n  return false;\n}\n\nexport async function down(){\n  return false;\n}';