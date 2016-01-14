'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = plugin;
var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
var imagePattern = /\.(png|jpg|gif)$/i;

function isURL(value) {
	return value.match(urlPattern);
}

function isImageURL(value) {
	return isURL(value) && value.match(imagePattern);
}

function embedDiv(src) {
	var iframe = '<iframe src="' + src + '" frameBorder="0" allowFullScreen/>';
	return '<div className="embed-container">' + iframe + '</div>';
}

var image = {
	test: isImageURL,
	render: function render(url) {
		return '<img src="' + url + '"/>';
	}
};
var youtube = {
	test: /^(https?:\/\/)?(www\.)?youtube\.com/i,
	render: function render(url) {
		return embedDiv(url);
	}
};
var vimeo = {
	test: /https?:\/\/vimeo.com\/(\d+)/i,
	render: function render(url, match) {
		var src = 'http://player.vimeo.com/video/' + match[1];
		return embedDiv(src);
	}
};
var rules = [image, youtube, vimeo];

function embed(url) {
	// eslint-disable-line
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

function startEmbed(tokens, i) {
	if (i + 2 >= tokens.length) return false;
	return tokens[i + 1].type === 'text' && tokens[i + 2].type === 'link_close';
}

/* eslint-disable no-param-reassign */
function plugin(md) {
	var skip = false;
	md.renderer.rules.link_open = function link(tokens, i, options) {
		if (startEmbed(tokens, i)) {
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