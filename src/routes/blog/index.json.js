import send from '@polka/send';
import { get_pages, get_page } from '../../utils/markdown';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		const posts = get_pages('blog')
			.filter(post => !post.metadata.draft)
			.map(post => {
				return {
					slug: post.slug,
					metadata: post.metadata
				};
			});

		json = {
			posts,
			index: get_page('blog/index.md'),
		};
	}

	send(res, 200, json, {
		'Content-Type': 'application/json',
		'Cache-Control': `max-age=${5 * 60 * 1e3}` // 5 minutes
	});
}
