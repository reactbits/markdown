import _ from 'lodash';

/**
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 */
/* eslint-disable */
const urlPattern = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

function isURL(value) {
	return value.match(urlPattern);
}

function iframe(src, attrs = {}, style = {}, afterFrame = '') {
	const allowFullScreen = 'webkitAllowFullScreen mozallowfullscreen allowFullScreen';
	const noborder = 'frameBorder="0"';
	const a = _.map(attrs, (v, k) => `${k}="${v}"`).join(' ');
	const defaultStyle = { border: 0 };
	const css = _.map({ ...defaultStyle, style }, (v, k) => `${k}:${v}`).join(';');
	const frame = `<iframe src="${src}" ${noborder} ${allowFullScreen} ${a} style="${css}""></iframe>`; // eslint-disable-line
	return `<div class="embed-container">${frame}${afterFrame}</div>`;
}

const image = {
	test: /\.(png|jpg|gif)$/i,
	render(url) {	return `<img src="${url}"/>`;	},
};
const youtube = {
	test: /youtube\.com/i,
	// TODO support watch URLs
	render(url) {
		return iframe(url);
	},
};
const vimeo = {
	test: /vimeo.com\/(\d+)/i,
	render(url, match) {
		const src = `http://player.vimeo.com/video/${match[1]}`;
		return iframe(src);
	},
};
const daylymotion = {
	test: /dailymotion.com\/video\/([\w\d]+)/i,
	render(url, match) {
		const src = `http://www.dailymotion.com/embed/video/${match[1]}`;
		return iframe(src);
	},
};
const vine = {
	test: /vine.co\/v\/([\w\d]+)/i,
	render(url, match) {
		const src = `https://vine.co/v/${match[1]}/embed/simple`;
		const script = `<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>`; // eslint-disable-line
		return iframe(src, {}, {}, script);
	},
};
const googleMaps = {
	test: /google\.com\/maps\/embed\?(.+)/i,
	render(url, match) {
		const src = `https://www.google.com/maps/embed?${match[1]}`;
		return iframe(src);
	},
};
const instagram = {
	test: /instagram\.com\/p\/([\w\d]+)/i,
	render(url, match) {
		const src = `//instagram.com/p/${match[1]}/embed/`;
		return iframe(src, { scrolling: 'no' }, { 'padding-bottom': '120%' });
	},
};
const rules = [
	image,
	youtube,
	vimeo,
	daylymotion,
	vine,
	googleMaps,
	instagram,
];

function embed(url) { // eslint-disable-line
	if (!isURL(url)) {
		return undefined;
	}
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (typeof rule.test === 'function') {
			if (rule.test(url)) {
				return rule.render.bind(rule)(url);
			}
			continue;
		}
		const match = rule.test.exec(url);
		if (match) {
			return rule.render.bind(rule)(url, match);
		}
	}
	return undefined;
}

/* eslint-disable no-param-reassign */
export default function plugin(md) {
	let skip = false;
	md.renderer.rules.link_open = function link(tokens, i, options) {
		if (i + 2 < tokens.length
				&& tokens[i + 1].type === 'text'
				&& tokens[i + 2].type === 'link_close') {
			const result = embed(tokens[i + 1].content);
			if (typeof result === 'string') {
				skip = true;
				return result;
			}
		}
		return md.renderer.renderToken(tokens, i, options);
	};

	const renderText = md.renderer.rules.text;
	md.renderer.rules.text = function link(tokens, i, options, self) {
		if (skip) return '';
		return renderText(tokens, i, options, self);
	};

	md.renderer.rules.link_close = function link(tokens, i, options) {
		if (skip) {
			skip = false;
			return '';
		}
		return md.renderer.renderToken(tokens, i, options);
	};
}
/* eslint-enable */
