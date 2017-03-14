import Component from './Component';

export default class ConsoleRender extends Component {
	render(response, data) {
		console.log(data.content);
	}
}