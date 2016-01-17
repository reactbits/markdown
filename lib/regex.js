"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// regular expressions

/**
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 */
/* eslint-disable */
var url = exports.url = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

// image
var imageExt = exports.imageExt = /\.(png|jpg|gif)$/i;
var flickr = exports.flickr = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/i;
var instagram = exports.instagram = /instagram\.com\/p\/([\w\d]+)/i;
var slideshare = exports.slideshare = /slideshare.net\/[a-zA-Z0-9_-]*\/[a-zA-Z0-9_-]*/i;

// video
var dailymotion = exports.dailymotion = /dailymotion.com\/video\/([\w\d]+)/i;
var liveleak = exports.liveleak = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/i;
var ted = exports.ted = /ted.com\/(.+)/i;
var ustream = exports.ustream = /ustream.tv\/[a-z\/0-9]*/i;
var vimeo = exports.vimeo = /vimeo.com\/(\d+)/i;
var vine = exports.vine = /vine.co\/v\/([\w\d]+)/i;
// TODO need params
var youtube = exports.youtube = /youtube\.com/i;

// audio
var soundcloud = exports.soundcloud = /soundcloud.com\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)/i;
var spotify = exports.spotify = /spotify.com\/track\/[a-zA-Z0-9_]+/i;

// maps
var googleMap = exports.googleMap = /google\.com\/maps\/embed\?(.+)/i;

// code
var github = exports.github = /github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/i;
var gist = exports.gist = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/i;
var codepen = exports.codepen = /codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/i;
var ideone = exports.ideone = /ideone.com\/[a-zA-Z0-9]{6}/i;
var jsbin = exports.jsbin = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/i;
var jsfiddle = exports.jsfiddle = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_\/]+/i;
var plunker = exports.plunker = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/i;

// social media
var twitter = exports.twitter = /twitter\.com\/\w+\/\w+\/\d+/i;