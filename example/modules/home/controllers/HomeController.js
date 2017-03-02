import {LoginForm} from '../form-models/LoginForm';

export async function indexActions() {
  return {
    content: 'test'
  };
}

export async function loginAction() {

  const $loginForm = new LoginForm();

  $loginForm.load({
    rememberMe: true,
    email: 'admin@shopmaek.ru',
    password: 1111
  });

  await $loginForm.validate();


  return {
    content: $loginForm.getErrors()
  }

}