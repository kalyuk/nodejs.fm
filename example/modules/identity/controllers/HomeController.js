import LoginForm from '../form-models/LoginForm';
import UserModel from '../models/UserModel';

export async function loginAction() {
  const $loginForm = new LoginForm();

  $loginForm.load({
    rememberMe: true,
    email: 'admin@shopmaek.ru',
    password: 1111
  });

  await $loginForm.validate();

  if ($loginForm.hasErrors()) {
    return {
      content: $loginForm.getErrors()
    };
  }

  return {
    content: 'data'
  };

}

export async function createAction() {

  /*let $userModel = new UserModel();
  $userModel.load({
    email: 'admin@admin.ru',
    password: '1111111'
  });

  await $userModel.save();*/

  return await UserModel.findById(123);

  return {
    content: $userModel.getErrors()
  }

}