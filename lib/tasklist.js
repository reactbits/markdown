'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plugin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _githubMarkdown = require('github-markdown-css/github-markdown.css');

var _githubMarkdown2 = _interopRequireDefault(_githubMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskItemRegExp = /^\s*\[(\s|x?)]\s+/i;

function checkbox(checked) {
  var attrs = checked ? 'checked' : '';
  var className = _githubMarkdown2.default['task-list-item-checkbox'];
  return '<input type="checkbox" class="' + className + '" ' + attrs + '/>';
}

function matchTaskItem(tokens, i) {
  if (i + 1 < tokens.length && tokens[i].type === 'paragraph_open' && tokens[i + 1].type === 'inline') {
    var s = tokens[i + 1].content;
    return taskItemRegExp.exec(s);
  }
  return null;
}

function attrGet(token, name) {
  var i = token.attrIndex(name);
  return i < 0 ? '' : token.attrs[i];
}

function getRenderFn(md, type) {
  var fn = md.renderer.rules[type];
  if (_lodash2.default.isFunction(fn)) {
    return fn;
  }
  return function () {
    var _md$renderer;

    return (_md$renderer = md.renderer).renderToken.apply(_md$renderer, arguments);
  };
}

function decorate(md, type, decoratorFn) {
  var renderToken = getRenderFn(md, type);
  md.renderer.rules[type] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // eslint-disable-line
    decoratorFn.apply(md.renderer, args);
    return renderToken.apply(md.renderer, args);
  };
}

function plugin(md) {
  var currentMatch = null;

  decorate(md, 'list_item_open', function (tokens, i) {
    // eslint-disable-line
    currentMatch = matchTaskItem(tokens, i + 1);
    if (currentMatch) {
      var token = tokens[i];
      var className = (0, _classnames2.default)(attrGet(token, 'class'), _githubMarkdown2.default['task-list-item']);
      token.attrSet('class', className);
    }
  });

  decorate(md, 'list_item_close', function () {
    currentMatch = null;
  });

  var renderInline = md.renderer.renderInline.bind(md.renderer);
  md.renderer.renderInline = function (tokens, options, env) {
    // eslint-disable-line
    var prefix = '';
    if (currentMatch) {
      var done = currentMatch[1].toLowerCase() === 'x';
      prefix = checkbox(done);
      currentMatch = null;
      var token = tokens[0];
      token.content = token.content.replace(taskItemRegExp, '');
    }
    return prefix + renderInline(tokens, options, env);
  };
}