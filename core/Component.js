export class Component {
  constructor(config = {}, application) {
    Object.keys(config).forEach(propertyName => {
      this[propertyName] = config[propertyName];
    });
    this.app = application;
  }
}