import get_index from './_index.js';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		json = JSON.stringify(get_index());
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(json);
}

// import send from '@polka/send';
// // import get_posts from './_posts.js';
// import get_index from './_index.js';

// let json;

// export function get(req, res) {
// 	if (!json || process.env.NODE_ENV !== 'production') {
// 		const index = get_index();
// 			.filter(post => !post.metadata.draft)
// 			.map(post => {
// 				return {
// 					slug: post.slug,
// 					metadata: post.metadata
// 				};
// 			});

// 		json = JSON.stringify(posts);
// 	}

// 	send(res, 200, json, {
// 		'Content-Type': 'application/json',
// 	});
// }