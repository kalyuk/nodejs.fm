import path from 'path';
import {HomeModule} from '../modules/home/HomeModule';

export default function () {
  return {
    default: {
      basePath: path.join(__dirname, '..'),
      components: {
        Router: {
          routes: {
            'GET /': {
              module: 'home',
              controller: 'home',
              action: 'index'
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