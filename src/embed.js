import classNames from 'classnames';
import _ from 'lodash';
import * as regex from './regex';
import styles from './style';
import hashtrie from 'hashtrie';
import parseuri from './parseuri';

let rulemap = hashtrie.empty;

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

function makeRule(test, render) {
	if (test === undefined) {
		throw new Error('nre');
	}
	if (_.isArray(test)) {
		const fn = url => _.some(test, t => canApplyRule(t, url));
		return { test: fn, render };
	}
	return { test, render };
}

function rule(host, test, render) {
	const value = makeRule(test, render);
	if (host) {
		rulemap = rulemap.set(host, value);
		rulemap = rulemap.set('www.' + host, value);
	}
	return value;
}

function rules(host, set) {
	rulemap = rulemap.set(host, set);
	rulemap = rulemap.set('www.' + host, set);
}

const image = rule('', regex.imageExt, url => `<img src="${url}"/>`);

// TODO support watch URLs
rule('youtube.com', regex.youtube, url => {
	return iframe(styles.youtube, url);
});

rule('vimeo.com', regex.vimeo, (url, match) => {
	const src = `http://player.vimeo.com/video/${match[1]}`;
	return iframe(styles.vimeo, src);
});

rule('dailymotion.com', regex.dailymotion, (url, match) => {
	const src = `http://www.dailymotion.com/embed/video/${match[1]}`;
	return iframe(styles.daylymotion, src);
});

const vineScript = `<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>`; // eslint-disable-line

rule('vine.co', regex.vine, (url, match) => {
	const src = `https://vine.co/v/${match[1]}/embed/simple`;
	return iframe(styles.vine, src, {}, {}, vineScript);
});

rule('google.com', regex.googleMap, (url, match) => {
	const src = `https://www.google.com/maps/embed?${match[1]}`;
	return iframe(styles.google_map, src);
});

rule('instagram.com', regex.instagram, (url, match) => {
	const src = `//instagram.com/p/${match[1]}/embed/`;
	return iframe(styles.instagram, src, { scrolling: 'no' });
});

// embedding with embed.js
function embed(url) {
	// TODO invoke embed-js
	console.log(url);
}

// image
rule('flickr.com', regex.flickr, embed);
rule('slideshare.net', regex.slideshare, embed);
// video
rule('liveleak.com', regex.liveleak, embed);
rule('ted.com', regex.ted, embed);
rule('ustream.tv', regex.ustream, embed);
// audio
rule('soundcloud.com', regex.soundcloud, embed);
rule('spotify.com', regex.spotify, embed);
// code
rules('github.com', [
	makeRule(regex.github, embed),
	makeRule(regex.gist, embed),
]);
rule('codepen.io', regex.codepen, embed);
rule('ideone.com', regex.ideone, embed);
rule('jsbin.com', regex.jsbin, embed);
rule('jsfiddle.net', regex.jsfiddle, embed);
rule('plnkr.co', regex.plunker, embed);
// social
rule('twitter.com', regex.twitter, embed);

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

function embedURL(url) {
	if (!url) return undefined;

	const uri = parseuri(url);
	if (!uri) return undefined;

	if (url.match(image.test)) {
		return image.render(url);
	}

	const set = rulemap.get(uri.host);
	if (!set) return undefined;

	if (_.isArray(set)) {
		for (let i = 0; i < set.length; i++) {
			const result = applyRule(set[i], url);
			if (result) return result;
		}
		return undefined;
	}

	return applyRule(set, url);
}

/* eslint-disable no-param-reassign */
export default function plugin(md) {
	let skip = false;
	md.renderer.rules.link_open = function link(tokens, i, options) {
		if (i + 2 < tokens.length
				&& tokens[i + 1].type === 'text'
				&& tokens[i + 2].type === 'link_close') {
			const result = embedURL(tokens[i + 1].content);
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
