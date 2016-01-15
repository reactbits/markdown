'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = plugin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 */
/* eslint-disable */
var urlPattern = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

function isURL(value) {
	return value.match(urlPattern);
}

function iframe(src) {
	var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	var style = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	var afterFrame = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

	var allowFullScreen = 'webkitAllowFullScreen mozallowfullscreen allowFullScreen';
	var noborder = 'frameBorder="0"';
	var a = _lodash2.default.map(attrs, function (v, k) {
		return k + '="' + v + '"';
	}).join(' ');
	var defaultStyle = { border: 0 };
	var css = _lodash2.default.map(_extends({}, defaultStyle, { style: style }), function (v, k) {
		return k + ':' + v;
	}).join(';');
	var frame = '<iframe src="' + src + '" ' + noborder + ' ' + allowFullScreen + ' ' + a + ' style="' + css + '""></iframe>'; // eslint-disable-line
	return '<div class="embed-container">' + frame + afterFrame + '</div>';
}

var image = {
	test: /\.(png|jpg|gif)$/i,
	render: function render(url) {
		return '<img src="' + url + '"/>';
	}
};
var youtube = {
	test: /youtube\.com/i,
	// TODO support watch URLs
	render: function render(url) {
		return iframe(url);
	}
};
var vimeo = {
	test: /vimeo.com\/(\d+)/i,
	render: function render(url, match) {
		var src = 'http://player.vimeo.com/video/' + match[1];
		return iframe(src);
	}
};
var daylymotion = {
	test: /dailymotion.com\/video\/([\w\d]+)/i,
	render: function render(url, match) {
		var src = 'http://www.dailymotion.com/embed/video/' + match[1];
		return iframe(src);
	}
};
var vine = {
	test: /vine.co\/v\/([\w\d]+)/i,
	render: function render(url, match) {
		var src = 'https://vine.co/v/' + match[1] + '/embed/simple';
		var script = '<script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>'; // eslint-disable-line
		return iframe(src, {}, {}, script);
	}
};
var googleMaps = {
	test: /google\.com\/maps\/embed\?(.+)/i,
	render: function render(url, match) {
		var src = 'https://www.google.com/maps/embed?' + match[1];
		return iframe(src);
	}
};
var instagram = {
	test: /instagram\.com\/p\/([\w\d]+)/i,
	render: function render(url, match) {
		var src = '//instagram.com/p/' + match[1] + '/embed/';
		return iframe(src, { scrolling: 'no' }, { 'padding-bottom': '120%' });
	}
};
var rules = [image, youtube, vimeo, daylymotion, vine, googleMaps, instagram];

function embed(url) {
	// eslint-disable-line
	if (!isURL(url)) {
		return undefined;
	}
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		if (typeof rule.test === 'function') {
			if (rule.test(url)) {
				return rule.render.bind(rule)(url);
			}
			continue;
		}
		var match = rule.test.exec(url);
		if (match) {
			return rule.render.bind(rule)(url, match);
		}
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