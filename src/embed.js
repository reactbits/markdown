import classNames from 'classnames';
import _ from 'lodash';
import * as regex from './regex';
import styles from './style';

function isURL(value) {
	return value.match(regex.url);
}

// TODO use ReactDOMServer.renderToStaticMarkup
function iframe(className, src, attrs = {}, style = {}, afterFrame = '') {
	const allowFullScreen = 'webkitAllowFullScreen mozallowfullscreen allowFullScreen';
	const noborder = 'frameBorder="0"';
	const a = _.map(attrs, (v, k) => `${k}="${v}"`).join(' ');
	const defaultStyle = { border: 0 };
	const css = _.map({ ...defaultStyle, ...style }, (v, k) => `${k}:${v}`).join(';');
	const frame = `<iframe src="${src}" ${noborder} ${allowFullScreen} ${a} style="${css}""></iframe>`; // eslint-disable-line
	const classList = classNames(styles.embed_container, className);
	return `<div class="${classList}">${frame}${afterFrame}</div>`;
}

function canApplyRule(test, url) {
	if (typeof test === 'function') {
		return test(url);
	}
	return test.exec(url);
}

function rule(test, render) {
	if (_.isArray(test)) {
		const fn = url => _.some(test, t => canApplyRule(t, url));
		return { test: fn, render };
	}
	return { test, render };
}

const image = rule(regex.imageExt, url => `<img src="${url}"/>`);

// TODO support watch URLs
const youtube = rule(regex.youtube, url => {
	return iframe(styles.youtube, url);
});

const vimeo = rule(regex.vimeo, (url, match) => {
	const src = `http://player.vimeo.com/video/${match[1]}`;
	return iframe(styles.vimeo, src);
});

const daylymotion = rule(regex.dailymotion, (url, match) => {
	const src = `http://www.dailymotion.com/embed/video/${match[1]}`;
	return iframe(styles.daylymotion, src);
});

const vineScript = `<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>`; // eslint-disable-line

const vine = rule(regex.vine, (url, match) => {
	const src = `https://vine.co/v/${match[1]}/embed/simple`;
	return iframe(styles.vine, src, {}, {}, vineScript);
});

const googleMap = rule(regex.googleMap, (url, match) => {
	const src = `https://www.google.com/maps/embed?${match[1]}`;
	return iframe(styles.google_map, src);
});

const instagram = rule(regex.instagram, (url, match) => {
	const src = `//instagram.com/p/${match[1]}/embed/`;
	return iframe(styles.instagram, src, { scrolling: 'no' });
});

// embedding other urls with embed.js
const embedjs = rule([
	// image
	regex.flickr,
	regex.slideshare,
	// video
	regex.liveleak,
	regex.ted,
	regex.ustream,
	// audio
	regex.soundcloud,
	regex.spotify,
	// code
	regex.github,
	regex.gist,
	regex.codepen,
	regex.ideone,
	regex.jsbin,
	regex.jsfiddle,
	regex.plunker,
	// social
	regex.twitter,
], url => {
	// TODO invoke embed-js
	console.log(url);
});

const rules = [
	image,
	youtube,
	vimeo,
	daylymotion,
	vine,
	googleMap,
	instagram,
	embedjs,
];

function applyRule(self, url) {
	if (typeof self.test === 'function') {
		if (self.test(url)) {
			return self.render(url);
		}
		return undefined;
	}
	const match = self.test.exec(url);
	if (match) {
		return self.render(url, match);
	}
	return undefined;
}

function embed(url) { // eslint-disable-line
	if (!isURL(url)) {
		return undefined;
	}
	for (let i = 0; i < rules.length; i++) {
		const result = applyRule(rule, url);
		if (result) return result;
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
