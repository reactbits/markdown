'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isURL = isURL;
exports.isImageURL = isImageURL;
exports.isVideoURL = isVideoURL;
exports.completeVideoURL = completeVideoURL;
var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
var imagePattern = /\.(png|jpg|gif)$/i;
var videoPattern = /(youtube.com)|(vimeo.com)|(vine.co)|(dailymotion.com)/i;

function toString(value) {
	return value ? value + '' : '';
}

function isURL(value) {
	return toString(value).match(urlPattern);
}

function isImageURL(value) {
	return isURL(value) && toString(value).match(imagePattern);
}

function isVideoURL(value) {
	return isURL(value) && toString(value).match(videoPattern);
}

// automatically adjusts short video URLS
// e.g. http://vimeo.com/66140585 -> http://player.vimeo.com/video/66140585
function completeVideoURL(value) {
	var vimeo = /https?:\/\/vimeo.com\/(\d+)/i;
	var match = vimeo.exec(value);
	if (match) {
		return 'http://player.vimeo.com/video/' + match[1];
	}
	var vine = /https:\/\/vine.co\/v\/([\w\d]+)/i;
	match = vine.exec(value);
	if (match) {
		return 'https://vine.co/v/' + match[1] + '/embed/simple';
	}
	var dailymotion = /http:\/\/dailymotion.com\/video\/([\w\d]+)/i;
	match = dailymotion.exec(value);
	if (match) {
		return 'http://www.dailymotion.com/embed/video/' + match[1];
	}
	return value;
}