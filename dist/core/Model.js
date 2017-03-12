'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Model = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validator = require('Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _each = require('async/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = exports.Model = function () {
	function Model() {
		_classCallCheck(this, Model);

		this._errors = {};

		this.$app = global.APP;
	}

	_createClass(Model, [{
		key: 'attributes',
		value: function attributes() {
			return Object.getOwnPropertyNames(this).filter(function (attr) {
				return attr[0] !== '_' && attr[0] !== '$';
			});
		}
	}, {
		key: 'afterValidate',
		value: function afterValidate() {}
	}, {
		key: 'attributeLabels',
		value: function attributeLabels() {}
	}, {
		key: 'addError',
		value: function addError(attr, rule, message) {
			if (!this._errors[attr]) {
				this._errors[attr] = {};
			}
			this._errors[attr][rule] = message;
		}
	}, {
		key: 'beforeValidate',
		value: function beforeValidate() {}
	}, {
		key: 'clearErrors',
		value: function clearErrors() {
			this._errors = {};
		}
	}, {
		key: 'isBoolean',
		value: function isBoolean(attr) {
			return typeof this[attr] === 'boolean';
		}
	}, {
		key: 'required',
		value: function required(attr) {
			return this[attr] !== undefined && this[attr] !== null;
		}
	}, {
		key: 'rules',
		value: function rules() {
			return [];
		}
	}, {
		key: 'validate',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var _this = this;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt('return', new Promise(function (resolve) {
									(0, _each2.default)(_this.rules(), function (rule, callback) {
										(0, _each2.default)(rule[0], function () {
											var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(attr, $callback) {
												return regeneratorRuntime.wrap(function _callee$(_context) {
													while (1) {
														switch (_context.prev = _context.next) {
															case 0:
																_context.t1 = _this[rule[1]];

																if (!_context.t1) {
																	_context.next = 5;
																	break;
																}

																_context.next = 4;
																return _this[rule[1]](attr);

															case 4:
																_context.t1 = !_context.sent;

															case 5:
																_context.t0 = _context.t1;

																if (_context.t0) {
																	_context.next = 8;
																	break;
																}

																_context.t0 = !_this[rule[1]] && _Validator2.default[rule[1]] && !_Validator2.default[rule[1]](_this[attr] + '', rule[2] || {});

															case 8:
																if (!_context.t0) {
																	_context.next = 10;
																	break;
																}

																_this.addError(attr, rule[1], rule[2].message);

															case 10:
																$callback();

															case 11:
															case 'end':
																return _context.stop();
														}
													}
												}, _callee, _this);
											}));

											return function (_x, _x2) {
												return _ref2.apply(this, arguments);
											};
										}(), callback);
									}, function (err) {
										if (err) {
											throw new Error(err);
										}
										resolve(true);
									});
								}));

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function validate() {
				return _ref.apply(this, arguments);
			}

			return validate;
		}()
	}, {
		key: 'load',
		value: function load(values) {
			var _this2 = this;

			this.attributes().forEach(function (attr) {
				if (values[attr]) {
					_this2.setAttribute(attr, values[attr]);
				}
			});
		}
	}, {
		key: 'getValidators',
		value: function getValidators() {
			return this.rules();
		}
	}, {
		key: 'getValues',
		value: function getValues() {
			var _this3 = this;

			var map = {};
			this.attributes().forEach(function (attr) {
				map[attr] = _this3[attr];
			});

			return map;
		}
	}, {
		key: 'getErrors',
		value: function getErrors() {
			return this._errors;
		}
	}, {
		key: 'hasErrors',
		value: function hasErrors() {
			return Object.keys(this._errors).length;
		}
	}, {
		key: 'hasAttr',
		value: function hasAttr(attr) {
			return this[attr] !== undefined && typeof this[attr] !== 'function';
		}
	}, {
		key: 'setAttribute',
		value: function setAttribute(attr, value) {
			if (this.hasAttr(attr)) {
				this[attr] = value;
			}
		}
	}]);

	return Model;
}();