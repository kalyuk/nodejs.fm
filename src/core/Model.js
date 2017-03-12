import Validator from 'Validator';
import each from 'async/each';

export class Model {

	_errors = {};

	static $hiddenFields = [];

	constructor() {
		this.$app = global.APP;
	}

	attributes() {
		return Object.getOwnPropertyNames(this).filter(attr => attr[0] !== '_' && attr[0] !== '$');
	}

	afterValidate() {

	}

	attributeLabels() {

	}

	addError(attr, rule, message) {
		if (!this._errors[attr]) {
			this._errors[attr] = {};
		}
		this._errors[attr][rule] = message;
	}

	beforeValidate() {
		return true;
	}

	clearErrors() {
		this._errors = {};
	}

	isBoolean(attr) {
		return typeof this[attr] === 'boolean';
	}

	required(attr) {
		return this[attr] !== undefined && this[attr] !== null;
	}

	rules() {
		return [];
	}

	async validate() {

		if (await this.beforeValidate()) {

		}

		return new Promise(resolve => {
			each(this.rules(), (rule, callback) => {
				each(rule[0], async(attr, $callback) => {
					if (
						(this[rule[1]] && !await this[rule[1]](attr))
						|| (!this[rule[1]] && Validator[rule[1]] && !Validator[rule[1]](this[attr] + '', rule[2] || {}))
					) {
						this.addError(attr, rule[1], rule[2].message);
					}
					$callback();
				}, callback);
			}, (err) => {
				if (err) {
					throw new Error(err);
				}
				resolve(true);
			});
		});
	}

	load(values) {
		this.attributes().forEach(attr => {
			if (values[attr]) {
				this.setAttribute(attr, values[attr]);
			}
		});
	}

	getValidators() {
		return this.rules();
	}

	getValues() {
		let map = {};
		this.attributes().forEach(attr => {
			map[attr] = this[attr];
		});

		return map;
	}

	getErrors() {
		return this._errors;
	}

	hasErrors() {
		return Object.keys(this._errors).length;
	}

	hasAttr(attr) {
		return this[attr] !== undefined && typeof this[attr] !== 'function';
	}

	setAttribute(attr, value) {
		if (this.hasAttr(attr)) {
			this[attr] = value;
		}
	}

	toJSON() {
		let data = {};

		this.attributes().forEach(attr => {
			if (this.constructor.$hiddenFields.indexOf(attr) === -1) {
				data[attr] = this[attr];
			}
		});

		return data;
	}

}