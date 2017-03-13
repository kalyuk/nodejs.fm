import {Component} from './Component';
import {ucfirst} from '../helpers/string';
import fs from 'fs';
import path from 'path';

export class Module extends Component {

	$db;
	__controllers = {};

	constructor() {
		super(...arguments);
		if (this.database) {
			let db = this.app.getComponent('Database');
			db.initInstance(this.database.instanceName, this.database);
			this.$db = db.getInstance(this.database.instanceName);
		}
	}

	getController(name) {
		if (!this.__controllers[name]) {
			let controllerPath = path.join(this.basePath, 'controllers', ucfirst(name) + 'Controller.js');
			if (fs.existsSync(controllerPath)) {
				this.__controllers[name] = require(controllerPath);
			} else {
				throw new Error(`Controller "${name}" in module "${this.constructor.name}" not found`);
			}
		}

		return this.__controllers[name];
	}

	async runAction(route) {
		let {controller, action} = route;
		let $controller = this.getController(controller);
		if (!$controller[action + 'Action']) {
			throw new Error(`Action "${action + 'Action'}" in controller "${controller}" not found`);
		}

		if ($controller.BEHAVIORS) {
			let behaviors = Object.keys($controller.BEHAVIORS);
			for (let i = 0; i < behaviors.length; i++) {
				let behavior = behaviors[i];
				if (!behavior.actions || behavior.actions.indexOf(route.action) !== -1) {
					let $behavior = this.app.getBehavior(behaviors[i]);
					let params = Object.assign({}, behavior, $behavior);
					await $behavior.Instance(route, params, this);
				}
			}
		}

		return await $controller[action + 'Action'](route, this);
	}

	async boot() {
		if (this.$db) {
			await this.initModels();
		}
	}

	async initModels() {
		return this.app.getComponent('Database')
		.initModels(path.join(this.basePath, 'models'), this.database.instanceName);
	}

}