import crypto from 'crypto';
import Component from './Component';

export default class Security extends Component {

	getAlgorithm() {
		return this.algorithm || 'sha512';
	}

	getSalt() {
		return this.salt || '';
	}

	getHash(string, options = {}) {
		let algoritm = options.algoritm || this.getAlgorithm();
		let salt = options.salt || this.getSalt();
		let hash = crypto.createHmac(algoritm, salt);
		hash.update(string);
		return hash.digest('hex');
	}

	hashVerify(string, hash, options) {
		return this.getHash(string, options) === hash;
	}

}