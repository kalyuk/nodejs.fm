export default function accessBehavior({headers}, params, {app}) {
	let tokenName = params.tokenName || 'authorization';
	let token = headers[tokenName];

	if (!token) {
		throw new Error('Access deny');
	}

	let sToken = token.split(' ');

	if (sToken[0] !== 'Bearer') {
		throw new Error('Access deny');
	}

	let $jwt = app.getComponent('Jwt');
	let data = $jwt.verify(sToken[1]);

	if (!data || !data.permissions) {
		throw new Error('Access deny');
	}

}