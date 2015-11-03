var React = require("react");
var render = require("./render");

var MarkdownView = React.createClass({
	displayName: "MarkdownView",

	render: function() {
		var text = this.props.text || "";

		if (isImageURL(text)) {
			return React.createElement("img", { src: text });
		}

		if (isVideoURL(text)) {
			var src = completeVideoURL(text);
			return React.createElement(
				"div", { className: "embed-container" },
				React.createElement("iframe", { src: src, frameborder: "0", allowfullscreen: true })
			);
		}

    var html = render(text);
    return React.createElement("div", { className: "markdown", dangerouslySetInnerHTML: { __html: html } });
	}
});

module.exports = MarkdownView;

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
	var vimeo = /https?:\/\/vimeo.com\/(\d+)/i
	var m = vimeo.exec(s)
	if (m) {
		return "http://player.vimeo.com/video/" + m[1]
	}
	var vine = /https:\/\/vine.co\/v\/([\w\d]+)/i
	m = vine.exec(s)
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
