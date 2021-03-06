import Component from './Component';
import {ucfirst} from '../helpers/string';
import fs from 'fs';
import path from 'path';

export default class Module extends Component {

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
				let behaviorName = behaviors[i];
				let behavior = $controller.BEHAVIORS[behaviorName];

				if (behavior.rules && behavior.rules.length) {
					let $behavior = this.app.getBehavior(behaviorName);
					for (let q = 0; q < behavior.rules.length; q++) { // eslint-disable-line
						let rule = behavior.rules[q];
						if (!rule.actions || rule.actions.indexOf(route.action) !== -1) { // eslint-disable-line
							let params = Object.assign({}, $behavior.config, rule);
							await $behavior.fn(route, params, this);
						}
					}
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