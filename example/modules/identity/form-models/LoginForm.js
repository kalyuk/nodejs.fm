import {Model} from '../../../../core/Model';

export default class LoginForm extends Model {

	email = null;
	password = null;
	rememberMe = true;

	rules() {
		return [
			[['email', 'password'], 'required', {message: 'can\'t be blank'}],
			[['email'], 'isEmail', {message: 'wrong email'}],
			[['email'], 'isCheckAsync', {message: 'wrong async function'}],
			[['rememberMe'], 'isBoolean', {message: 'only boolean'}]
		];
	}

	async isCheckAsync() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			});
		});
	}

}