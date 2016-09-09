'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = plugin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hashtrie = require('hashtrie');

var _hashtrie2 = _interopRequireDefault(_hashtrie);

var _regex = require('./regex');

var regex = _interopRequireWildcard(_regex);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _parseuri = require('./parseuri');

var _parseuri2 = _interopRequireDefault(_parseuri);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rulemap = _hashtrie2.default.empty;

function queryString(params) {
	return _lodash2.default.map(params, function (v, k) {
		return k + '=' + v;
	}).join('&');
}

// embedding with embed.js
function embed(url) {
	return '<div class="injection embedjs">' + url + '</div>';
}

function iframe(props) {
	var containerProps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var iframeProps = _extends({}, props, {
		frameBorder: 0,
		webkitAllowFullScreen: true,
		mozallowfullscreen: true,
		allowFullScreen: true
	});
	delete iframeProps.className;
	delete iframeProps.afterFrame;
	var className = (0, _classnames2.default)(_style2.default.embed_container, props.className);
	var container = _react2.default.createElement(
		'div',
		_extends({}, containerProps, { className: className }),
		_react2.default.createElement('iframe', iframeProps),
		props.afterFrame || null
	);
	return (0, _server.renderToStaticMarkup)(container);
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
	if (_lodash2.default.isArray(test)) {
		var fn = function fn(url) {
			return _lodash2.default.some(test, function (t) {
				return canApplyRule(t, url);
			});
		};
		return { test: fn, render: render };
	}
	return { test: test, render: render };
}

function rule(host, test, render) {
	var value = makeRule(test, render);
	if (host) {
		rulemap = rulemap.set(host, value);
		rulemap = rulemap.set('www.' + host, value);
	}
	return value;
}

function rules(host, set) {
	// eslint-disable-line
	rulemap = rulemap.set(host, set);
	rulemap = rulemap.set('www.' + host, set);
}

var image = rule('', regex.imageExt, function (url) {
	return '<img src="' + url + '"/>';
});

// TODO support watch URLs
rule('youtube.com', regex.youtube, function (url) {
	return iframe({ className: _style2.default.youtube, src: url });
});

rule('vimeo.com', regex.vimeo, function (url, match) {
	var src = 'http://player.vimeo.com/video/' + match[1];
	return iframe({ className: _style2.default.vimeo, src: src });
});

rule('dailymotion.com', regex.dailymotion, function (url, match) {
	var src = 'http://www.dailymotion.com/embed/video/' + match[1];
	return iframe({ className: _style2.default.daylymotion, src: src });
});

var vineScript = '<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>'; // eslint-disable-line

rule('vine.co', regex.vine, function (url, match) {
	var src = 'https://vine.co/v/' + match[1] + '/embed/simple';
	return iframe({ className: _style2.default.vine, src: src, afterFrame: vineScript });
});

rule('liveleak.com', regex.liveleak, embed);

rule('ted.com', regex.ted, function (url, match) {
	var src = 'https://embed-ssl.ted.com/' + match[1];
	return iframe({ className: _style2.default.ted, src: src });
});

rule('ustream.tv', regex.ustream, embed);

rule('google.com', regex.googleMap, function (url, match) {
	var src = 'https://www.google.com/maps/embed?' + match[1];
	return iframe({ className: _style2.default.google_map, src: src });
});

// image
rule('instagram.com', regex.instagram, function (url, match) {
	var src = '//instagram.com/p/' + match[1] + '/embed/';
	return iframe({ className: _style2.default.instagram, src: src, scrolling: 'no' });
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

var soundcloudParams = queryString({
	auto_play: 'false',
	hide_related: 'false',
	show_comments: 'true',
	show_user: 'true',
	show_reposts: 'false',
	visual: 'false',
	download: 'false',
	color: 'f50000',
	theme_color: 'f50000'
});

rule('soundcloud.com', regex.soundcloud, function (url, match) {
	var player = 'https://w.soundcloud.com/player/?url=soundcloud.com/' + match[1] + '/' + match[2] + '&';
	var src = '' + player + soundcloudParams;
	return iframe({ className: _style2.default.soundcloud, src: src, scrolling: 'no' });
});

rule('spotify.com', regex.spotify, embed);
// code
rule('github.com', regex.github, embed);
rule('gist.github.com', regex.gist, embed);

rule('codepen.io', regex.codepen, function (url, match) {
	var slug = match[2];
	var src = 'https://codepen.io/' + match[1] + '/embed/preview/' + slug + '?height=300&amp;slug-hash=' + slug + '&amp;default-tab=result&amp;host=http%3A%2F%2Fcodepen.io'; // eslint-disable-line
	return iframe({ className: _style2.default.codepen, src: src });
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
	var match = self.test.exec(url);
	if (match) {
		return self.render(url, match);
	}
	return undefined;
}

function embedURL(url) {
	if (!url) return undefined;

	var uri = (0, _parseuri2.default)(url);
	if (!uri) return undefined;

	if (url.match(image.test)) {
		return image.render(url);
	}

	var set = rulemap.get(uri.host);
	if (!set) return undefined;

	if (_lodash2.default.isArray(set)) {
		for (var i = 0; i < set.length; i += 1) {
			var result = applyRule(set[i], url);
			if (result) return result;
		}
		return undefined;
	}

	return applyRule(set, url);
}

/* eslint-disable no-param-reassign */
function plugin(md) {
	var skip = false;
	md.renderer.rules.link_open = function link(tokens, i, options) {
		if (i + 2 < tokens.length && tokens[i + 1].type === 'text' && tokens[i + 2].type === 'link_close') {
			var result = embedURL(tokens[i + 1].content);
			if (typeof result === 'string') {
				skip = true;
				return result;
			}
		}
		return md.renderer.renderToken(tokens, i, options);
	};

	var renderText = md.renderer.rules.text;
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