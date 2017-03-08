import {merge} from 'lodash';
import {Component} from './Component';

export class Response extends Component {
  render(response, $data) {
    let result = merge({
      headers: {
        'Content-Type': 'application/json',
        'Content-Encoding': 'UTF-8'
      },
      content: '',
      state: 200
    }, $data);

    let data = result.content;

    if (typeof data === 'object') {
      data = JSON.stringify({data});
    }

    response.statusCode = result.state;

    Object.keys(result.headers).forEach(header => {
      response.setHeader(header, result.headers[header]);
    });

    response.setHeader('Content-Length', Buffer.byteLength(data));
    response.write(data);
    response.end();
  }
}