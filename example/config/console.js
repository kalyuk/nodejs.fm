import main from './main';
import {MigrateModule} from '../../modules/migrate/MigrateModule';


export default function () {
  let mainConfig = main();
  let config = Object.assign({}, mainConfig);

  config.default.components.Router.routes = {
    'COMMAND migrate:<action:up|down|create>': {
      module: 'migrate',
      controller: 'migrate'
    }
  };

  config.default.modules.migrate = {
    Instance: MigrateModule
  };

  return config;
}