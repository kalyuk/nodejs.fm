import fs from 'fs';
import path from 'path';

export async function upAction(params, {app}) {



  return {
    content: 'test'
  };
}

export async function createAction(params, {app}) {
  if (!app.args.module) {
    return {
      content: 'Module empty'
    };
  }
  let name = app.args.name ? '_' + app.args.name : '';

  let module = app.getModule(app.args.module);
  let time = (new Date()).getTime();
  let migrationPath = path.join(module.basePath, 'migrations', time + name + '.js');

  let template = `export async function up(){
  
  
  }

export async function down(){

}`;

  fs.writeFileSync(migrationPath, template);

  return {
    content: app.args.module
  };
}