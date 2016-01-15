import _ from 'lodash';
import styles from 'github-markdown-css/github-markdown';

const taskItemRegExp = /^\s*\[(\s|x?)\]\s+/i;

function checkbox(checked) {
	const attrs = checked ? 'checked' : '';
	const className = styles['task-list-item-checkbox'];
	return `<input type="checkbox" class="${className}" ${attrs}/>`;
}

function matchTaskItem(tokens, i) {
	if (i + 1 < tokens.length
		&& tokens[i].type === 'paragraph_open'
		&& tokens[i + 1].type === 'inline') {
		const s = tokens[i + 1].content;
		return taskItemRegExp.exec(s);
	}
	return null;
}

function attrGet(token, name) {
	const i = token.attrIndex(name);
	return i < 0 ? '' : token.attrs[i];
}

function getRenderFn(md, type) {
	const fn = md.renderer.rules[type];
	if (_.isFunction(fn)) {
		return fn;
	}
	return (...args) => {
		return md.renderer.renderToken.apply(md.renderer, args);
	};
}

function decorate(md, type, decoratorFn) {
	const renderToken = getRenderFn(md, type);
	md.renderer.rules[type] = function (...args) { // eslint-disable-line
		decoratorFn.apply(md.renderer, args);
		return renderToken.apply(md.renderer, args);
	};
}

export default function plugin(md) {
	let currentMatch = null;

	decorate(md, 'list_item_open', (tokens, i, ...args) => { // eslint-disable-line
		currentMatch = matchTaskItem(tokens, i + 1);
		if (currentMatch) {
			const token = tokens[i];
			let className = attrGet(token, 'class');
			className += ' ' + styles['task-list-item'];
			token.attrSet('class', className);
		}
	});

	decorate(md, 'list_item_close', () => currentMatch = null);

	const renderInline = md.renderer.renderInline.bind(md.renderer);
	md.renderer.renderInline = function (tokens, options, env) { // eslint-disable-line
		let prefix = '';
		if (currentMatch) {
			const done = currentMatch[1].toLowerCase() === 'x';
			prefix = checkbox(done);
			currentMatch = null;
			const token = tokens[0];
			token.content = token.content.replace(taskItemRegExp, '');
		}
		return prefix + renderInline(tokens, options, env);
	};
}
