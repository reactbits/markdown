import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import mdsup from 'markdown-it-sup';
import mdsub from 'markdown-it-sub';
import footnotes from 'markdown-it-footnote';
import emoji from 'markdown-it-emoji';
import twemoji from 'twemoji';
import configureLinkifier from './linkify';
import highlight from './highlight';

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

md.renderer.rules.emoji = (token, idx) => {
	return twemoji.parse(token[idx].content);
};

// fix rendering of code blocks

const fence = md.renderer.rules.fence;
const reCodeBlock = /^\<(pre)\>(<code\s+(class="[\w-]+")\s*\>)/;

// TODO this code should be in markdown-it
// patches syntax highlighter to add class to pre tag
md.renderer.rules.fence = function () {
	const args = [].slice.call(arguments);
	const result = fence.apply(this, args);
	const output = result.replace(reCodeBlock, '<$1 $3>$2');
	return output;
};

// Renders given markdown text to HTML.
export function render(text) {
	return md.render(text || '');
}

export default render;
