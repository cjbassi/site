import send from '@polka/send';
import { getPages, getPage } from '../../utils/markdown';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		const posts = getPages('blog')
			.filter(post => !post.metadata.draft)
			.map(post => {
				return {
					slug: post.slug,
					metadata: post.metadata
				};
			});

		json = {
			posts,
			index: getPage('blog.md'),
		};
	}

	send(res, 200, json, {
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
}
