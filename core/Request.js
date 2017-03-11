import {Component} from './Component';

export class Request extends Component {
	parse(request) {
		let jsonType = 'application/json';
		if (request.headers['content-type'] && request.headers['content-type'].match(jsonType)) {
			request.body = JSON.parse(request.rawBody);
		} else {
			request.body = request.rawBody;
		}
	}
}