// regular expressions

/**
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 */
/* eslint-disable */
export const url = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

// image
export const imageExt = /\.(png|jpg|gif)$/i;
export const flickr = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/i;
export const instagram = /instagram\.com\/p\/([\w\d]+)/i;
export const slideshare = /slideshare.net\/[a-zA-Z0-9_-]*\/[a-zA-Z0-9_-]*/i;

// video
export const daylymotion = /dailymotion.com\/video\/([\w\d]+)/i;
export const liveleak = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/i;
export const ted = /ted.com\/talks\/[a-zA-Z0-9_]+/i;
export const ustream = /ustream.tv\/[a-z\/0-9]*/i;
export const vimeo = /vimeo.com\/(\d+)/i;
export const vine = /vine.co\/v\/([\w\d]+)/i;
// TODO need params
export const youtube = /youtube\.com/i;

// audio
export const soundcloud = /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/i;
export const spotify = /spotify.com\/track\/[a-zA-Z0-9_]+/i;

// maps
export const googleMap = /google\.com\/maps\/embed\?(.+)/i;

// code
export const github = /github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/i;
export const gist = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/i;
export const codepen = /codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/i;
export const ideone = /ideone.com\/[a-zA-Z0-9]{6}/i;
export const jsbin = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/i;
export const jsfiddle = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_\/]+/i;
export const plunker = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/i;

// social media
export const twitter = /twitter\.com\/\w+\/\w+\/\d+/i;
