import path from 'path';

export default function () {
	return {
		default: {
			basePath: path.join(__dirname, '..'),
			behaviors: {
				access: {
					instance: path.join(__dirname, '..', 'behavior', 'AccessBehavior')
				}
			},
			components: {
				Jwt: {
					instance: path.join(__dirname, '..', 'component', 'Jwt'),
					secret: '94mf7f94nrbothg',
					timeLive: {
						unit: 8,
						amount: 'hour'
					}
				},
				Database: {
					instance: {
						app: {
							database: 'nodejs.fm-application',
							username: 'nodejs.fm',
							password: 'nodejs.fm',
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
						'POST /login': {
							module: 'identity',
							controller: 'home',
							action: 'login'
						},
						'GET /<module:\\w+>/<controller:\\w+>/<action:\\w+>': {}
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
					instance: path.join(__dirname, '..', 'modules', 'home', 'HomeModule')
				},
				identity: {
					instance: path.join(__dirname, '..', 'modules', 'identity', 'IdentityModule'),
					database: {
						instanceName: 'identityDb',
						database: 'nodejs.fm-user',
						username: 'nodejs.fm',
						password: 'nodejs.fm',
						params: {
							host: 'localhost',
							dialect: 'postgres'
						}
					}
				}
			}
		}
	};
}
