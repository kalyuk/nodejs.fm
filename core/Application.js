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
    this.parseArgs();
    this.loadConfig(configPath);
    global.APP = this;
    this.router = this.getComponent('Router');
    this.isDevelopment = this.args.env === 'development';
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
      }
    }

    return this.__modules[name];
  }
}