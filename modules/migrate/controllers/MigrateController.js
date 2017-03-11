import fs from 'fs';
import path from 'path';
import MigrationModel from '../models/MigrationModel';

const MIGRATION_TEMPLATE = `export async function up(){
  return false;
}

export async function down(){
  return false;
}`;


export async function upAction(params, {app}) {
	let modules = app.args.modules ? app.args.modules.split(',') : Object.keys(app.getModules());

	for (let i = 0; i < modules.length; i++) {
		let module = app.getModule(modules[i]);
		if (!module.$db) {
			continue;
		}

		let migrationsPath = path.join(module.basePath, 'migrations');

		await module.$db.sync();

		let migrations = await MigrationModel.findAll({
			where: {
				moduleName: modules[i]
			}
		});

		migrations = migrations.map(migrate => `${migrate.name}-${migrate.moduleName}`);

		let files = fs.readdirSync(migrationsPath);

		for (let q = 0; q < files.length; q++) {
			let file = files[q];

			if (migrations.indexOf(`${file}-${modules[i]}`) === -1) {
				let migration = require(path.join(migrationsPath, file));

				if (await migration.up()) {
					let $migration = new MigrationModel();
					$migration.load({moduleName: modules[i], name: file});

					await $migration.save();
				}
			}
		}
	}

	return {
		content: 'Migrations up'
	};
}

export async function downAction(params, {app}) {
	if (!app.args.module) {
		throw new Error('The name of the module is not specified');
	}

	let module = app.getModule(app.args.module);
	let migrationsPath = path.join(module.basePath, 'migrations');

	await module.$db.sync();

	let $migration = await MigrationModel.find({
		where: {
			moduleName: app.args.module
		},
		order: 'id DESC'
	});

	let migration = require(path.join(migrationsPath, $migration.name));

	if (await migration.down()) {
		await $migration.remove();
	}

	return {
		content: 'Migrations down'
	};
}

export async function createAction(params, {app}) {
	if (!app.args.module) {
		throw new Error('The name of the module is not specified');
	}

	let module = app.getModule(app.args.module);

	let name = app.args.name ? '_' + app.args.name : '';

	let time = (new Date()).getTime();
	let migrationPath = path.join(module.basePath, 'migrations', time + name + '.js');

	fs.writeFileSync(migrationPath, MIGRATION_TEMPLATE);

	return {
		content: app.args.module
	};
}