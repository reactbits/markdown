// syntax highlighting with prism.js
import Prism from 'prismjs-package';
import _ from 'lodash';

// language aliases
const aliases = {
	javascript: 'js',
	csharp: 'c#',
};

_.pairs(aliases).forEach(p => {
	const lang = Prism.languages[p[0]];
	if (!lang) return;
	const alt = p[1];
	if (_.isString(alt)) {
		Prism.languages[alt] = lang;
	} else if (_.isArray(alt)) {
		alt.forEach(a => {
			Prism.languages[a] = lang;
		});
	}
});

export default function highlight(code, lang) {
	const grammar = Prism.languages[lang];
	if (grammar) {
		return Prism.highlight(code, grammar, lang);
	}
	return code;
}
