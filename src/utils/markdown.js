import fs from 'fs';
import path from 'path';
import {
	extract_frontmatter,
	langs,
} from '@sveltejs/site-kit/utils/markdown';
import marked from 'marked';
import { makeSlugProcessor } from './slug';
import { SLUG_PRESERVE_UNICODE } from '../../config';
import PrismJS from 'prismjs';
import 'prismjs/components/prism-bash';

const makeSlug = makeSlugProcessor(SLUG_PRESERVE_UNICODE);

function linkRenderer(href, title, text) {
	let title_attr = '';

	if (title !== null) {
		title_attr = ` title="${title}"`;
	}

	return `<a href="${href}"${title_attr}>${text}</a>`;
}

export function filterDraft(post) {
	return !post.metadata.draft || post.metadata.draft === "false";
}

export function getPages(directory) {
	return fs
		.readdirSync(`content/${directory}`)
		.filter(filename => {
			return filename !== 'index.md' && path.extname(filename) === '.md';
		})
		.map(filename => getPage(`${directory}/${filename}`))
		.sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1));
}

export function getPage(filepath) {
	const fileStem = path.basename(filepath, '.md');
	const fileDir = path.dirname(filepath);

	const markdown = fs.readFileSync(`content/${filepath}`, 'utf-8');

	const { content, metadata } = extract_frontmatter(markdown);

	let date, slug;
	const match = /^(\d+-\d+-\d+)-(.+)$/.exec(fileStem);
	if (match) {
		[, date, slug] = match;
		metadata.date = date;
	} else {
		slug = fileStem;
	}

	const link = fileDir ? `${fileDir}/${slug}` : slug;

	const renderer = new marked.Renderer();

	renderer.link = linkRenderer;

	renderer.paragraph = (text) => {
		return text;
	}

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
