import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import mdsup from 'markdown-it-sup';
import mdsub from 'markdown-it-sub';
import footnotes from 'markdown-it-footnote';
import emoji from 'markdown-it-emoji';
import twemoji from 'twemoji';
import configureLinkifier from './linkify';
import highlight from './codeblock';
import embed from './embed';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight,
});

configureLinkifier(md.linkify);

// use plugins
md.use(emoji);
md.use(deflist);
md.use(mdsub);
md.use(mdsup);
md.use(footnotes);
md.use(embed);

md.renderer.rules.emoji = (token, idx) => {
	return twemoji.parse(token[idx].content);
};

// Renders given markdown text to HTML.
export function render(text) {
	return md.render(text || '');
}

export default render;
