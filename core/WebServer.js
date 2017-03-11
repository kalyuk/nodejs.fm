import http from 'http';
import {Component} from './Component';

export const EVENT_REQUEST = 'request';
export const EVENT_CLOSE = 'close';

export class WebServer extends Component {

	__server = null;

	constructor() {
		super(...arguments);
		this.__server = http.createServer();
		this.__server.timeout = this.timeout;
	}

	onRequest(callback) {
		this.__server.on(EVENT_REQUEST, callback);
	}

	onClose(callback) {
		this.__server.on(EVENT_CLOSE, callback);
	}

	async listen() {
		return new Promise(resolve => {
			this.__server.listen(this.port, this.host, () => {
				resolve(this);
			});
		});
	}
}