import {Component} from '../../index';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export default class Jwt extends Component {
	sign(data) {
		let exp = moment().add(this.timeLive.unit, this.timeLive.amount).utc().valueOf();
		data.exp = exp;
		return {
			token: jwt.sign({
				data
			}, this.secret),
			exp
		};
	}

	verify(hash) {
		let data = jwt.verify(hash, this.secret);
		let current = moment().utc().valueOf();

		if (!data || data.data.exp < current) {
			throw new Error('token has expired');
		}

		return data;
	}
}