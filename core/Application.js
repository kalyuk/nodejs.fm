import fs from 'fs';
import {WebServer} from './WebServer';
import {Router} from './Router';
import {Response} from './Response';
import {ErrorHandler} from './ErrorHandler';
import {Database} from './Database';

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
    Database
  };

  config = {
    components: {},
    modules: {}
  };

  args = {
    env: 'development'
  };

  constructor(configPath) {
    console.log('Running application'); // eslint-disable-line no-console
    this.parseArgs();
    this.loadConfig(configPath);
    global.APP = this;
    this.router = this.getComponent('Router');
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

  initWebServer() {
    if (!this.__webServer) {
      this.__webServer = this.getComponent('WebServer');
      this.__webServer.onRequest(this.router.handleRequest.bind(this.router));
    }
  }

  async runServer() {
    await this.__boot;
    this.initWebServer();
    return await this.__webServer.listen();
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