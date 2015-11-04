"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _markdownIt = require("markdown-it");

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItEmoji = require("markdown-it-emoji");

var _markdownItEmoji2 = _interopRequireDefault(_markdownItEmoji);

var _markdownItDeflist = require("markdown-it-deflist");

var _markdownItDeflist2 = _interopRequireDefault(_markdownItDeflist);

var _markdownItSup = require("markdown-it-sup");

var _markdownItSup2 = _interopRequireDefault(_markdownItSup);

var _markdownItSub = require("markdown-it-sub");

var _markdownItSub2 = _interopRequireDefault(_markdownItSub);

var _markdownItFootnote = require("markdown-it-footnote");

var _markdownItFootnote2 = _interopRequireDefault(_markdownItFootnote);

var _twemoji = require("twemoji");

var _twemoji2 = _interopRequireDefault(_twemoji);

var _prismjsPackage = require("prismjs-package");

var _prismjsPackage2 = _interopRequireDefault(_prismjsPackage);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = (0, _markdownIt2.default)({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlight
});

// use plugins
md.use(userlink);
md.use(itemlink);
md.use(_markdownItEmoji2.default);
md.use(_markdownItDeflist2.default);
md.use(_markdownItSub2.default);
md.use(_markdownItSup2.default);
md.use(_markdownItFootnote2.default);

var fence = md.renderer.rules.fence;

md.renderer.rules.emoji = function (token, idx) {
  return _twemoji2.default.parse(token[idx].to);
};

var reCodeBlock = /^\<(pre)\>(<code\s+(class="[\w-]+")\s*\>)/;

// TODO this code should in markdown-it
// patches syntax highlighter to add class to pre tag
md.renderer.rules.fence = function () {
  var args = [].slice.call(arguments);
  var result = fence.apply(this, args);
  return result.replace(reCodeBlock, "<$1 $3>$2");
};

// syntax highlighting with prism.js
// language aliases
var aliases = {
  "javascript": "js",
  "csharp": "c#"
};

_lodash2.default.pairs(aliases).forEach(function (p) {
  var lang = _prismjsPackage2.default.languages[p[0]];
  if (!lang) return;
  var alt = p[1];
  if (_lodash2.default.isString(alt)) {
    _prismjsPackage2.default.languages[alt] = lang;
  } else if (_lodash2.default.isArray(alt)) {
    alt.forEach(function (a) {
      _prismjsPackage2.default.languages[a] = lang;
    });
  }
});

function grammar(lang) {
  return _prismjsPackage2.default.languages[lang];
}

function highlight(code, lang) {
  var g = grammar(lang);
  if (g) {
    return _prismjsPackage2.default.highlight(code, g, lang);
  }
  return code;
}

// userlink is markdown-it plugin to replaces @username with hyperlink to user view
function userlink(md) {
  var prefix = "/u/";
  var LINK_RE = /^([\w\d_]+)(\s|$)/;

  function scan(state, silent) {
    if (state.pos + 1 >= state.posMax || state.src.charAt(state.pos) != "@") {
      return false;
    }
    var tail = state.src.slice(state.pos + 1);
    var match = tail.match(LINK_RE);
    if (!match) {
      return false;
    }
    if (!silent) {
      state.push({
        type: "userlink",
        name: match[1],
        level: state.level
      });
    }
    state.pos += match[0].length;
    return true;
  }

  md.inline.ruler.after("link", "userlink", scan);

  md.renderer.rules.userlink = function (tokens, idx) {
    var name = tokens[idx].name;
    var href = prefix + name;
    return "<a href=\"" + href + "\">@" + name + "</a>";
  };
}

// itemlink is markdown-it plugin to replace 'item #123' with link to item view
function itemlink(md) {
  var prefix = "/";
  var LINK_RE = /^([\w]+)\s+#(\d+)/;
  // TODO list all supported items
  var types = {
    "post": true,
    "comment": true,
    "issue": true
  };

  function scan(state, silent) {
    var tail = state.src.slice(state.pos);
    var match = tail.match(LINK_RE);
    if (!match) {
      return false;
    }
    var type = match[1];
    if (!types[type]) {
      return false;
    }
    if (!silent) {
      state.push({
        type: "itemlink",
        item: type,
        id: match[2],
        level: state.level
      });
    }
    state.pos += match[0].length;
    return true;
  }

  md.inline.ruler.before("text", "itemlink", scan);

  md.renderer.rules.itemlink = function (tokens, idx) {
    var token = tokens[idx];
    var href = prefix + token.item + '?id=' + token.id;
    var label = token.item + ' #' + token.id;
    return '<a href="' + href + '>' + label + '</a>';
  };
}

// Renders given markdown text to HTML.
function render(text) {
  return md.render(text || "");
}