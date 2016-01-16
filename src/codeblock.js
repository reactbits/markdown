import highlight from 'prismjs-package';
// TODO do that in prismjs-package
import style from 'prismjs-package/themes/prism.css'; // eslint-disable-line

const diagramLangs = {
	seq: 'sequence',
	sequence: 'sequence',
	// TODO flow could be ambigious with flow.js
	flow: 'flowchart',
	flowchart: 'flowchart',
	railroad: 'railroad',
};

function diagram(code, lang) {
	return `<div class="diagram" data-lang="${lang}">${code}</div>`;
}

export function render(code, language) {
	const lang = (language || '').toLowerCase();
	const diagramLang = diagramLangs[lang];
	if (diagramLang) {
		return diagram(code, diagramLang);
	}
	return highlight(code, language);
}

import { unescapeAll } from 'markdown-it/lib/common/utils';

/* eslint-disable no-param-reassign */
export default function plugin(md) {
	md.renderer.rules.fence = function (tokens, idx, options) {
		const token = tokens[idx];
		const info = token.info ? unescapeAll(token.info).trim() : '';
		let langName = '';

		if (info) {
			langName = info.split(/\s+/g)[0];
			token.attrJoin('class', options.langPrefix + langName);
		}

		return render(token.content, langName);
	};
}
/* eslint-enable */
