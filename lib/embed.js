'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = plugin;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _regex = require('./regex');

var regex = _interopRequireWildcard(_regex);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isURL(value) {
	return value.match(regex.url);
}

// TODO use ReactDOMServer.renderToStaticMarkup
function iframe(className, src) {
	var attrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	var style = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	var afterFrame = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];

	var allowFullScreen = 'webkitAllowFullScreen mozallowfullscreen allowFullScreen';
	var noborder = 'frameBorder="0"';
	var a = _lodash2.default.map(attrs, function (v, k) {
		return k + '="' + v + '"';
	}).join(' ');
	var defaultStyle = { border: 0 };
	var css = _lodash2.default.map(_extends({}, defaultStyle, style), function (v, k) {
		return k + ':' + v;
	}).join(';');
	var frame = '<iframe src="' + src + '" ' + noborder + ' ' + allowFullScreen + ' ' + a + ' style="' + css + '""></iframe>'; // eslint-disable-line
	var classList = (0, _classnames2.default)(_style2.default.embed_container, className);
	return '<div class="' + classList + '">' + frame + afterFrame + '</div>';
}

function canApplyRule(test, url) {
	if (typeof test === 'function') {
		return test(url);
	}
	return test.exec(url);
}

function rule(test, render) {
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

var image = rule(regex.imageExt, function (url) {
	return '<img src="' + url + '"/>';
});

// TODO support watch URLs
var youtube = rule(regex.youtube, function (url) {
	return iframe(_style2.default.youtube, url);
});

var vimeo = rule(regex.vimeo, function (url, match) {
	var src = 'http://player.vimeo.com/video/' + match[1];
	return iframe(_style2.default.vimeo, src);
});

var daylymotion = rule(regex.dailymotion, function (url, match) {
	var src = 'http://www.dailymotion.com/embed/video/' + match[1];
	return iframe(_style2.default.daylymotion, src);
});

var vineScript = '<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>'; // eslint-disable-line

var vine = rule(regex.vine, function (url, match) {
	var src = 'https://vine.co/v/' + match[1] + '/embed/simple';
	return iframe(_style2.default.vine, src, {}, {}, vineScript);
});

var googleMap = rule(regex.googleMap, function (url, match) {
	var src = 'https://www.google.com/maps/embed?' + match[1];
	return iframe(_style2.default.google_map, src);
});

var instagram = rule(regex.instagram, function (url, match) {
	var src = '//instagram.com/p/' + match[1] + '/embed/';
	return iframe(_style2.default.instagram, src, { scrolling: 'no' });
});

// embedding other urls with embed.js
var embedjs = rule([
// image
regex.flickr, regex.slideshare,
// video
regex.liveleak, regex.ted, regex.ustream,
// audio
regex.soundcloud, regex.spotify,
// code
regex.github, regex.gist, regex.codepen, regex.ideone, regex.jsbin, regex.jsfiddle, regex.plunker,
// social
regex.twitter], function (url) {
	// TODO invoke embed-js
	console.log(url);
});

var rules = [image, youtube, vimeo, daylymotion, vine, googleMap, instagram, embedjs];

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

function embed(url) {
	// eslint-disable-line
	if (!isURL(url)) {
		return undefined;
	}
	for (var i = 0; i < rules.length; i++) {
		var result = applyRule(rule, url);
		if (result) return result;
	}
	return undefined;
}

/* eslint-disable no-param-reassign */
function plugin(md) {
	var skip = false;
	md.renderer.rules.link_open = function link(tokens, i, options) {
		if (i + 2 < tokens.length && tokens[i + 1].type === 'text' && tokens[i + 2].type === 'link_close') {
			var result = embed(tokens[i + 1].content);
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