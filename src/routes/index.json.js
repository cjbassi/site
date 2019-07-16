import get_index from './_index.js';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		json = get_index();
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(json);
}
