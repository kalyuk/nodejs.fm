import path from 'path';
import {HomeModule} from '../modules/home/HomeModule';

export default function () {
  return {
    default: {
      basePath: path.join(__dirname, '..'),
      components: {
        Database: {
          instance: {
            identityDb: {
              database: 'shopmaek-user',
              username: 'shopmaek',
              password: 'shopmaek',
              params: {
                host: 'localhost',
                dialect: 'postgres'
              }
            }
          }
        },
        Router: {
          routes: {
            'GET /': {
              module: 'home',
              controller: 'home',
              action: 'index'
            },
            'GET /login': {
              module: 'home',
              controller: 'home',
              action: 'login'
            },
            'GET /<module:\\w+>/<params:\\w+>/<action:\\w+>': {
              controller: 'home'
            }
          }
        },
        WebServer: {
          port: 2018,
          host: '127.0.0.1',
          timeout: 30 * 1000
        }
      },
      modules: {
        home: {
          Instance: HomeModule
        }
      }
    }
  }
}