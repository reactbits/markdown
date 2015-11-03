var markdownit require("markdown-it");
var emoji require("markdown-it-emoji");
var deflist = require("markdown-it-deflist");
var mdsup = require("markdown-it-sup");
var mdsub = require("markdown-it-sub");
var footnotes = require("markdown-it-footnote");
var twemoji = require("twemoji");
var Prism = require("prismjs-package");
var _ = require("lodash");

var md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlight,
});

// use plugins
md.use(userlink);
md.use(itemlink);
md.use(emoji);
md.use(deflist);
md.use(mdsub);
md.use(mdsup);
md.use(footnotes);

var fence = md.renderer.rules.fence;

md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].to);
};

var reCodeBlock = /^\<(pre)\>(<code\s+(class="[\w-]+")\s*\>)/;

// TODO this code should in markdown-it
// patches syntax highlighter to add class to pre tag
md.renderer.rules.fence = function() {
  var args = [].slice.call(arguments);
  var result = fence.apply(this, args);
  return result.replace(reCodeBlock, "<$1 $3>$2");
}

// syntax highlighting with prism.js
// language aliases
var aliases = {
  "javascript": "js",
  "csharp": "c#",
};

_.pairs(aliases).forEach(function(p) {
  var lang = Prism.languages[p[0]];
  if (!lang) return;
  var alt = p[1];
  if (_.isString(alt)) {
    Prism.languages[alt] = lang;
  } else if (_.isArray(alt)) {
    alt.forEach(a => {
      Prism.languages[a] = lang;
    });
  }
});

function grammar(lang) {
  return Prism.languages[lang];
}

function highlight(code, lang) {
  var g = grammar(lang);
  if (g) {
    return Prism.highlight(code, g, lang);
  }
  return code;
}

// userlink is markdown-it plugin to replaces @username with hyperlink to user view
function userlink(md){
  const prefix = "/u/";
  const LINK_RE = /^([\w\d_]+)(\s|$)/

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
        level: state.level,
      });
    }
    state.pos += match[0].length
    return true;
  }

  md.inline.ruler.after("link", "userlink", scan);

  md.renderer.rules.userlink = function(tokens, idx) {
    var name = tokens[idx].name;
    var href = prefix + name;
    return `<a href="${href}">@${name}</a>`;
  };
}

// itemlink is markdown-it plugin to replace 'item #123' with link to item view
function itemlink(md) {
  const prefix = "/";
  const LINK_RE = /^([\w]+)\s+#(\d+)/
  // TODO list all supported items
  const types = {
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
        level: state.level,
      });
    }
    state.pos += match[0].length
    return true;
  }

  md.inline.ruler.before("text", "itemlink", scan);

  md.renderer.rules.itemlink = function(tokens, idx) {
    var token = tokens[idx];
    var href = prefix + token.item + '?id=' + token.id;
    var label = token.item + ' #' + token.id;
    return '<a href="' + href + '>' + label + '</a>';
  };
}

// Renders given markdown text to HTML.
module.exports = function render(text) {
  return md.render(text || "");
}
