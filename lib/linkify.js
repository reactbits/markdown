'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = configureLinkifier;
var linkTo = {
	user: 'https://twitter.com/',
	issue: 'https://github.com/reactbits/markdown/issues/',
	hashtag: 'https://twitter.com/hashtag/'
};

exports.linkTo = linkTo;
function configureLinkifier(linkify) {
	linkify.set({
		fuzzyLink: true,
		fuzzyIP: false,
		fuzzyEmail: true
	});

	var rexprs = {};

	function register(prefix, key, replaceUrl) {
		linkify.add(prefix, {
			validate: function validate(text, pos, self) {
				var tail = text.slice(pos);

				var re = rexprs[key];
				if (!re) {
					re = new RegExp('^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')');
					rexprs[key] = re;
				}

				if (re.test(tail)) {
					// Linkifier allows punctuation chars before prefix,
					// but we additionally disable `@` ("@@mention" is invalid)
					if (pos >= 2 && tail[pos - 2] === prefix) {
						return false;
					}
					return tail.match(re)[0].length;
				}

				return 0;
			},

			/*eslint-disable*/
			normalize: function normalize(match) {
				match.url = replaceUrl(match.url);
			}
		});
	}

	register('@', 'mention', function (url) {
		return linkTo.user + url.replace(/^@/, '');
	});
	register('issue ', 'issue', function (url) {
		return linkTo.issue + url.replace(/^issue /, '');
	});
	register('#', 'hashtag', function (url) {
		return linkTo.hashtag + url.replace(/^#/, '');
	});
}