import fs from 'fs';
import path from 'path';
import {
	extract_frontmatter,
	langs,
	link_renderer
} from '@sveltejs/site-kit/utils/markdown';
import marked from 'marked';
import { makeSlugProcessor } from './slug';
import { SLUG_PRESERVE_UNICODE } from '../../config';
import PrismJS from 'prismjs';
import 'prismjs/components/prism-bash';

const makeSlug = makeSlugProcessor(SLUG_PRESERVE_UNICODE);

export function get_pages(directory) {
	return fs
		.readdirSync(`content/${directory}`)
		.filter(filename => {
			return filename !== 'index.md' && path.extname(filename) === '.md';
		})
		.map(filename => get_page(`${directory}/${filename}`))
		.sort((a, b) => (a.metadata.pubdate < b.metadata.pubdate ? 1 : -1));
}

export function get_page(filepath) {
	const filename = path.basename(filepath);
	const stem = path.basename(filepath, '.md');
	const directory = path.dirname(filepath);

	const markdown = fs.readFileSync(`content/${filepath}`, 'utf-8');

	const { content, metadata } = extract_frontmatter(markdown);

	let date, slug;
	const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(filename);
	if (match) {
		[, date, slug] = match;
		metadata.date = date;
	} else {
		slug = stem;
	}

	const link = directory ? `${directory}/${slug}` : slug;

	const renderer = new marked.Renderer();

	renderer.link = link_renderer;

	renderer.code = (source, lang) => {
		const plang = langs[lang];
		const highlighted = PrismJS.highlight(
			source,
			PrismJS.languages[plang],
			lang
		);

		return `<pre class='language-${plang}'><code>${highlighted}</code></pre>`;
	};

	renderer.heading = (text, level, rawtext) => {
		const fragment = makeSlug(rawtext);

		return `
			<h${level}>
				<span id="${fragment}" class="offset-anchor"></span>
				<a href="${link}#${fragment}" class="anchor" aria-hidden="true"></a>
				${text}
			</h${level}>`;
	};

	const html = marked(
		content.replace(/^\t+/gm, match => match.split('\t').join('  ')),
		{ renderer }
	);

	return {
		html,
		metadata,
		slug
	};
}
