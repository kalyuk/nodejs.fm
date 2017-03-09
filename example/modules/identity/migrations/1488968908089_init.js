import UserModel from '../models/UserModel';

export async function up() {
  let $admin = new UserModel();
  $admin.email = 'admin@admin.local';
  $admin.password = '111111';
  await $admin.save();

  return true;
}

export async function down() {
  console.log('down');

  return false;
}