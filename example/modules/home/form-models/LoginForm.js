import {Model} from '../../../../core/Model';

export class LoginForm extends Model {

  email = null;
  password = null;
  rememberMe = true;

  rules() {
    return [
      [['email', 'password'], 'required', {message: 'can\'t be blank'}],
      [['email'], 'isEmail', {message: 'wrong email'}],
      [['email'], 'isEmailAsync', {message: 'wrong email'}],
      [['rememberMe'], 'isBoolean', {message: 'only boolean'}]
    ];
  }

  async isEmailAsync() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('valid');
        resolve(false);
      }, 30000);
    });
  }

}