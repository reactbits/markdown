import React from 'react';
import { renderToString } from 'react-dom/server';
import highlight from 'prismjs-package';
// TODO do that in prismjs-package
import style from 'prismjs-package/themes/prism.css'; // eslint-disable-line
import DiffView from 'react-diffview';

const externalLangs = {
	seq: 'sequence',
	sequence: 'sequence',
	// TODO flow could be ambigious with flow.js
	flow: 'flowchart',
	flowchart: 'flowchart',
	railroad: 'railroad',
	tex: 'tex',
};

const externalClass = {
	tex: 'tex',
};

function external(code, lang) {
	const className = externalClass[lang] || 'diagram';
	return `<div class="injection ${className}" data-lang="${lang}">${code}</div>`;
}

export function render(code, language) {
	const lang = (language || '').toLowerCase();
	const externalLang = externalLangs[lang];
	if (externalLang) {
		return external(code, externalLang);
	}
	if (lang.match(/^diff?/i)) {
		const view = <DiffView source={code} />;
		return renderToString(view);
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
