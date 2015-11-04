import React, {Component} from "react";
import render from "./render";
import stripIndent from "strip-indent";

function renderContent(src) {
	// TODO make image and video URLs as markdown-it plugin
	if (isImageURL(src)) {
		return <img src={src}/>;
	}

	if (isVideoURL(src)) {
		src = completeVideoURL(src);
		return (
			<div className="embed-container">
				<iframe src={src} frameborder={"0"} allowfullscreen/>
			</div>
		);
	}

  var html = render(stripIndent(src));
  return <span dangerouslySetInnerHTML={{__html:html}}/>;
}

export default class Markdown extends Component {
	render() {
		var src = this.props.source;
		var content;
		if (src) {
			content = renderContent(src);
		} else {
			content = React.Children.map(this.props.children, child => {
				return typeof child === "string" ? renderContent(child) : child;
			});
		}
		return <div className="markdown">{content}</div>;
	}
};

export {render};

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
