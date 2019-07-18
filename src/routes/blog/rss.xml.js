import send from '@polka/send';
import { getPages } from '../../utils/markdown';
import { BLOG_URL, BLOG_TITLE, BLOG_DESCRIPTION } from '../../../config';

const months = ',Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');

function format_date(str) {
	const [y, m, d] = str.split('-');
	return `${d} ${months[+m]} ${y} 12:00 +0000`;
}

const rss = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
	<title>${BLOG_TITLE}</title>
	<link>${BLOG_URL}</link>
	<description>${BLOG_DESCRIPTION}</description>
	${getPages('blog').filter(post => !post.metadata.draft).map(post => `
		<item>
			<title>${post.metadata.title}</title>
			<link>${BLOG_URL}/${post.slug}</link>
			<description>${post.metadata.description}</description>
			<pubDate>${format_date(post.metadata.date)}</pubDate>
		</item>
	`).join('')}
</channel>

</rss>
`.replace(/>[^\S]+/gm, '>').replace(/[^\S]+</gm, '<').trim();

export function get(req, res) {
	send(res, 200, rss, {
		'Cache-Control': `max-age=${30 * 60 * 1e3}`,
		'Content-Type': 'application/rss+xml'
	});
}
