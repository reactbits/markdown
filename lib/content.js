'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _render2 = require('./render');

var _render3 = _interopRequireDefault(_render2);

var _stripIndent = require('strip-indent');

var _stripIndent2 = _interopRequireDefault(_stripIndent);

var _inject = require('./inject');

var _inject2 = _interopRequireDefault(_inject);

var _githubMarkdown = require('github-markdown-css/github-markdown');

var _githubMarkdown2 = _interopRequireDefault(_githubMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = (function (_Component) {
	_inherits(Content, _Component);

	function Content() {
		_classCallCheck(this, Content);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
	}

	_createClass(Content, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.replaceBlocks();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.replaceBlocks();
		}
	}, {
		key: 'replaceBlocks',
		value: function replaceBlocks() {
			var root = $(_reactDom2.default.findDOMNode(this));
			(0, _inject2.default)(root.find('.injection'));
		}
	}, {
		key: 'render',
		value: function render() {
			var source = this.props.source;

			var html = (0, _render3.default)((0, _stripIndent2.default)(source));
			return _react2.default.createElement('span', { className: _githubMarkdown2.default['markdown-body'], dangerouslySetInnerHTML: { __html: html } });
		}
	}]);

	return Content;
})(_react.Component);

exports.default = Content;