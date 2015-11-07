const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
const imagePattern = /\.(png|jpg|gif)$/i;
const videoPattern = /(youtube.com)|(vimeo.com)|(vine.co)|(dailymotion.com)/i;

function toString(value) {
	return value ? value + '' : '';
}

export function isURL(value) {
	return toString(value).match(urlPattern);
}

export function isImageURL(value) {
	return isURL(value) && toString(value).match(imagePattern);
}

export function isVideoURL(value) {
	return isURL(value) && toString(value).match(videoPattern);
}

// automatically adjusts short video URLS, i.e. http://vimeo.com/66140585 -> http://player.vimeo.com/video/66140585
export function completeVideoURL(value) {
	const vimeo = /https?:\/\/vimeo.com\/(\d+)/i;
	let match = vimeo.exec(value);
	if (match) {
		return 'http://player.vimeo.com/video/' + match[1];
	}
	const vine = /https:\/\/vine.co\/v\/([\w\d]+)/i;
	match = vine.exec(value);
	if (match) {
		return 'https://vine.co/v/' + match[1] + '/embed/simple';
	}
	const dailymotion = /http:\/\/dailymotion.com\/video\/([\w\d]+)/i;
	match = dailymotion.exec(value);
	if (match) {
		return 'http://www.dailymotion.com/embed/video/' + match[1];
	}
	return value;
}
