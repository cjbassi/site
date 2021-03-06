import send from '@polka/send';
import { getPage } from '../utils/markdown';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		json = getPage('index.md');
	}

	send(res, 200, json, {
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
}
