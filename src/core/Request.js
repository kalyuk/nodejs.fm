import Component from './Component';
import query from 'querystring';

export default class Request extends Component {
	parse(request) {

		let $query = request.url.split('?');
		if($query.length > 1){
			request.query = query.parse($query[1]);
		}

		let jsonType = 'application/json';
		if (request.headers['content-type'] && request.headers['content-type'].match(jsonType)) {
			request.body = JSON.parse(request.rawBody);
		} else {
			request.body = request.rawBody;
		}
	}
}