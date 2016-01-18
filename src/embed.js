import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import classNames from 'classnames';
import _ from 'lodash';
import * as regex from './regex';
import styles from './style';
import hashtrie from 'hashtrie';
import parseuri from './parseuri';

let rulemap = hashtrie.empty;

function queryString(params) {
	return _.map(params, (v, k) => `${k}=${v}`).join('&');
}

// embedding with embed.js
function embed(url) {
	return `<div class="injection embedjs">${url}</div>`;
}

function iframe(props, containerProps = {}) {
	const iframeProps = {
		...props,
		frameBorder: 0,
		webkitAllowFullScreen: true,
		mozallowfullscreen: true,
		allowFullScreen: true,
	};
	delete iframeProps.className;
	delete iframeProps.afterFrame;
	const className = classNames(styles.embed_container, props.className);
	const container = (
		<div {...containerProps} className={className}>
			<iframe {...iframeProps}></iframe>
			{props.afterFrame || null}
		</div>
	);
	return renderToStaticMarkup(container);
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

function rules(host, set) { // eslint-disable-line
	rulemap = rulemap.set(host, set);
	rulemap = rulemap.set('www.' + host, set);
}

const image = rule('', regex.imageExt, url => `<img src="${url}"/>`);

// TODO support watch URLs
rule('youtube.com', regex.youtube, url => {
	return iframe({ className: styles.youtube, src: url });
});

rule('vimeo.com', regex.vimeo, (url, match) => {
	const src = `http://player.vimeo.com/video/${match[1]}`;
	return iframe({ className: styles.vimeo, src });
});

rule('dailymotion.com', regex.dailymotion, (url, match) => {
	const src = `http://www.dailymotion.com/embed/video/${match[1]}`;
	return iframe({ className: styles.daylymotion, src });
});

const vineScript = `<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>`; // eslint-disable-line

rule('vine.co', regex.vine, (url, match) => {
	const src = `https://vine.co/v/${match[1]}/embed/simple`;
	return iframe({ className: styles.vine, src, afterFrame: vineScript });
});

rule('liveleak.com', regex.liveleak, embed);

rule('ted.com', regex.ted, (url, match) => {
	const src = `https://embed-ssl.ted.com/${match[1]}`;
	return iframe({ className: styles.ted, src });
});

rule('ustream.tv', regex.ustream, embed);

rule('google.com', regex.googleMap, (url, match) => {
	const src = `https://www.google.com/maps/embed?${match[1]}`;
	return iframe({ className: styles.google_map, src });
});

// image
rule('instagram.com', regex.instagram, (url, match) => {
	const src = `//instagram.com/p/${match[1]}/embed/`;
	return iframe({ className: styles.instagram, src, scrolling: 'no' });
});

rule('flickr.com', regex.flickr, embed);
// const src = `https://www.slideshare.net/slideshow/embed_code/key/zTckhjEe9nT5j8`;
rule('slideshare.net', regex.slideshare, embed);

// rule('imgur.com', regex.imgur, (url, match) => {
// 	<blockquote class="imgur-embed-pub" lang="en" data-id="vCzVw2O">
// 		<a href="http://imgur.com/vCzVw2O">How to tell when your cat is fully charged</a>
// 	</blockquote>
// 	<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
// });

// audio

const soundcloudParams = queryString({
	auto_play: 'false',
	hide_related: 'false',
	show_comments: 'true',
	show_user: 'true',
	show_reposts: 'false',
	visual: 'false',
	download: 'false',
	color: 'f50000',
	theme_color: 'f50000',
});

rule('soundcloud.com', regex.soundcloud, (url, match) => {
	const src = `https://w.soundcloud.com/player/?url=soundcloud.com/${match[1]}/${match[2]}&` + soundcloudParams;
	return iframe({ className: styles.soundcloud, src, scrolling: 'no' });
});

rule('spotify.com', regex.spotify, embed);
// code
rule('github.com', regex.github, embed);
rule('gist.github.com', regex.gist, embed);

rule('codepen.io', regex.codepen, (url, match) => {
	const slug = match[2];
	const src = `https://codepen.io/${match[1]}/embed/preview/${slug}?height=300&amp;slug-hash=${slug}&amp;default-tab=result&amp;host=http%3A%2F%2Fcodepen.io`; // eslint-disable-line
	return iframe({ className: styles.codepen, src });
});

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
