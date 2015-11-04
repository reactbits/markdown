"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.linkTo = exports.render = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _stripIndent = require("strip-indent");

var _stripIndent2 = _interopRequireDefault(_stripIndent);

var _linkify = require("./linkify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderContent(src) {
	// TODO make image and video URLs as markdown-it plugin
	if (isImageURL(src)) {
		return _react2.default.createElement("img", { src: src });
	}

	if (isVideoURL(src)) {
		src = completeVideoURL(src);
		return _react2.default.createElement(
			"div",
			{ className: "embed-container" },
			_react2.default.createElement("iframe", { src: src, frameborder: "0", allowfullscreen: true })
		);
	}

	var html = (0, _render2.default)((0, _stripIndent2.default)(src));
	return _react2.default.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
}

var Markdown = (function (_Component) {
	_inherits(Markdown, _Component);

	function Markdown() {
		_classCallCheck(this, Markdown);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Markdown).apply(this, arguments));
	}

	_createClass(Markdown, [{
		key: "render",
		value: function render() {
			var src = this.props.source;
			var className = this.props.className || "markdown";
			var style = this.props.style || {};
			var content;
			if (src) {
				content = renderContent(src);
			} else {
				content = _react2.default.Children.map(this.props.children, function (child) {
					return typeof child === "string" ? renderContent(child) : child;
				});
			}
			return _react2.default.createElement(
				"div",
				{ className: className, style: style },
				content
			);
		}
	}]);

	return Markdown;
})(_react.Component);

exports.default = Markdown;
;

exports.render = _render2.default;
exports.linkTo = _linkify.linkTo;

var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
var imagePattern = /\.(png|jpg|gif)$/i;
var videoPattern = /(youtube.com)|(vimeo.com)|(vine.co)|(dailymotion.com)/i;

function str(s) {
	return s ? s + "" : "";
}

function isURL(s) {
	return str(s).match(urlPattern);
}

function isImageURL(s) {
	return isURL(s) && str(s).match(imagePattern);
}

function isVideoURL(s) {
	return isURL(s) && str(s).match(videoPattern);
}

// automatically adjusts short video URLS, i.e. http://vimeo.com/66140585 -> http://player.vimeo.com/video/66140585
function completeVideoURL(s) {
	var vimeo = /https?:\/\/vimeo.com\/(\d+)/i;
	var m = vimeo.exec(s);
	if (m) {
		return "http://player.vimeo.com/video/" + m[1];
	}
	var vine = /https:\/\/vine.co\/v\/([\w\d]+)/i;
	m = vine.exec(s);
	if (m) {
		return "https://vine.co/v/" + m[1] + "/embed/simple";
	}
	var dailymotion = /http:\/\/dailymotion.com\/video\/([\w\d]+)/i;
	m = dailymotion.exec(s);
	if (m) {
		return "http://www.dailymotion.com/embed/video/" + m[1];
	}
	return s;
}