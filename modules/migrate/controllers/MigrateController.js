import fs from 'fs';
import path from 'path';

function getModule(app) {
  if (!app.args.module) {
    throw new Error('The name of the module is not specified');
  }
  return app.getModule(app.args.module);
}


export async function upAction(params, {app}) {
  let module = getModule(app);

  let migrationsPath = path.join(module.basePath, 'migrations');

  await module.$db.sync();

  let files = fs.readdirSync(migrationsPath);

  files.forEach(file => {
    console.log(file)
  });


  return {
    content: 'test'
  };
}

export async function createAction(params, {app}) {
  let module = getModule(app);

  let name = app.args.name ? '_' + app.args.name : '';

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