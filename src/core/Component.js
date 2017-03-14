export default class Component {
	constructor(config = {}) {
		Object.keys(config).forEach(propertyName => {
			this[propertyName] = config[propertyName];
		});
		this.app = global.APP;
	}
}