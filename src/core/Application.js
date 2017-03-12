import fs from 'fs';
import {WebServer} from './WebServer';
import {Router} from './Router';
import {Response} from './Response';
import {ErrorHandler} from './ErrorHandler';
import {Database} from './Database';
import {ConsoleRender} from './ConsoleRender';
import {Request} from './Request';

export class Application {
	__webServer = null;
	__components = {};
	__modules = {};
	__boot = null;

	components = {
		WebServer,
		Router,
		Response,
		ErrorHandler,
		Database,
		ConsoleRender,
		Request
	};

	config = {
		components: {},
		modules: {}
	};

	args = {
		env: 'development',
		route: ''
	};

	constructor(configPath) {
		console.log('Running application'); // eslint-disable-line no-console
		this.parseArgs();
		this.loadConfig(configPath);
		global.APP = this;
		this.router = this.getComponent('Router');
		this.request = this.getComponent('Request');
		this.errorHandler = this.getComponent('ErrorHandler');
		this.isDevelopment = this.args.env === 'development';
		this.__boot = this.boot();
	}

	async boot() {
		console.log('Running application boot'); // eslint-disable-line no-console

		let promises = [];

		Object.keys(this.config.modules).forEach(moduleName => {
			promises.push(this.getModule(moduleName).boot());
		});

		return Promise.all(promises);
	}

	parseArgs() {
		process.argv.forEach((val) => {
			let tmp = val.split('=');
			this.args[tmp[0]] = tmp[1];
		});
	}

	loadConfig(configPath) {
		if (fs.existsSync(configPath)) {
			let configFile = require(configPath).default();
			if (configFile.default) {
				Object.assign(this.config, configFile.default);
			}

			if (configFile[this.args.env]) {
				Object.assign(this.config, configFile[this.args.env]);
			}
		}
	}

	async handleRequest(req, res, isCommand = false) {
		let route = this.router.match(req.method.toLowerCase(), req.url.toLowerCase());

		if (req.body) {
			route.body = req.body;
		}

		let response = !isCommand ?
			this.getComponent('Response') : this.getComponent('ConsoleRender');
		if (route) {
			try {
				let result = await this.getModule(route.module).runAction(route);
				return response.render(res, result);
			} catch (e) {
				let error = this.errorHandler.handle(500, e.message);
				return response.render(res, error);
			}
		}
		let error = this.errorHandler.handle(404, `Page "${req.url}" not found`);
		return response.render(res, error);
	}

	initWebServer() {
		if (!this.__webServer) {
			this.__webServer = this.getComponent('WebServer');
			this.__webServer.onRequest((request, res) => {
				if (request.method === 'POST' || request.method === 'PUT') {
					request.rawBody = '';

					request.on('data', function (data) {
						request.rawBody += data;
						if (request.rawBody.length > 1e6) {
							request.connection.destroy();
						}
					});

					request.on('end', () => {
						this.request.parse(request);
						this.handleRequest(request, res);
					});
				} else {
					this.handleRequest(request, res);
				}
			});
		}
	}

	async runServer() {
		await this.__boot;
		this.initWebServer();
		return await this.__webServer.listen();
	}

	async runCommand() {
		await this.__boot;
		await this.handleRequest({url: this.args.route, method: 'command'}, {}, true);
	}

	getModules() {
		return this.__modules;
	}

	getComponent(name) {
		if (!this.components[name]) {
			throw new Error(`Component "${name}" not found`);
		}
		if (!this.__components[name]) {
			if (typeof this.components[name] === 'function') {
				this.__components[name] = new this.components[name](this.config.components[name]);
			} else if (this.components[name] && typeof this.components[name].Instance === 'function') {
				this.__components[name] = new this.components[name].Instance(this.components[name]);
			} else {
				throw new Error(`Component "${name}" did not resolve`);
			}
		}
		return this.__components[name];
	}

	getModule(name) {
		if (!this.config.modules[name]) {
			throw new Error(`Module "${name}" not found`);
		}

		if (!this.__modules[name]) {
			if (this.config.modules[name] && typeof this.config.modules[name].Instance === 'function') {
				this.__modules[name] = new this.config.modules[name].Instance(this.config.modules[name]);
			} else {
				throw new Error(`Module "${name}" did not resolve`);
			}
		}

		return this.__modules[name];
	}
}