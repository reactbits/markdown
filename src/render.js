import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import mdsup from 'markdown-it-sup';
import mdsub from 'markdown-it-sub';
import footnotes from 'markdown-it-footnote';
import emoji from 'markdown-it-emoji';
import twemoji from 'twemoji';
import configureLinkifier from './linkify';
import codeblock from './codeblock';
import embed from './embed';
import tasklist from './tasklist';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

configureLinkifier(md.linkify);

// use plugins
md.use(codeblock);
md.use(emoji);
md.use(deflist);
md.use(mdsub);
md.use(mdsup);
md.use(footnotes);
md.use(embed);
md.use(tasklist);

md.renderer.rules.emoji = (tokens, idx) => twemoji.parse(tokens[idx].content);

// Renders given markdown text to HTML.
export default function render(text) {
  return md.render(text || '');
}
