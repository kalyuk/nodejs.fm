import {Component} from './Component';

export class ErrorHandler extends Component {

	constructor() {
		super(...arguments);
		this.response = this.app.getComponent('Response');
	}

	handle(code, message) {
		let content = this.app.isDevelopment && code >= 500
		|| (code < 500) ? message : 'Disaster struck';

		return {
			state: code,
			content: {
				code,
				error: content
			}
		};
	}

}