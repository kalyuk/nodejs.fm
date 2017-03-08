import {Component} from './Component';

export class ConsoleRender extends Component {
  render(response, data) {
    console.log(data.content);
  }
}