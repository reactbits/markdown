'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MarkdownEditor = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTabs = require('react-tabs');

var _reactSplitPane = require('react-split-pane');

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _markdown = require('../markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

require('brace/mode/markdown');

require('brace/theme/github');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO customizable tabs e.g. localization
// TODO textarea mode without rich editor
// TODO fix split mode
// TODO sync scrollbars for editor and viewer

var MarkdownEditor = exports.MarkdownEditor = (function (_Component) {
	_inherits(MarkdownEditor, _Component);

	function MarkdownEditor(props) {
		_classCallCheck(this, MarkdownEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MarkdownEditor).call(this, props));

		_this.state = {
			value: props.value || ''
		};
		return _this;
	}

	_createClass(MarkdownEditor, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ value: nextProps.value });
		}
	}, {
		key: 'renderAce',
		value: function renderAce() {
			var _this2 = this;

			var _ref = this.props.style || {};

			var width = _ref.width;
			var height = _ref.height;

			var onChange = function onChange(value) {
				_this2.setState({ value: value });
			};
			var aceProps = {
				mode: 'markdown',
				theme: 'github',
				value: this.state.value,
				onChange: onChange,
				width: width || '100%',
				height: height || '100%'
			};
			return _react2.default.createElement(_reactAce2.default, aceProps);
		}
	}, {
		key: 'renderTabs',
		value: function renderTabs() {
			return _react2.default.createElement(
				_reactTabs.Tabs,
				null,
				_react2.default.createElement(
					_reactTabs.TabList,
					null,
					_react2.default.createElement(
						_reactTabs.Tab,
						null,
						'Edit'
					),
					_react2.default.createElement(
						_reactTabs.Tab,
						null,
						'Preview'
					)
				),
				_react2.default.createElement(
					_reactTabs.TabPanel,
					null,
					this.renderAce()
				),
				_react2.default.createElement(
					_reactTabs.TabPanel,
					null,
					_react2.default.createElement(_markdown2.default, { source: this.state.value })
				)
			);
		}
	}, {
		key: 'renderSplit',
		value: function renderSplit() {
			return _react2.default.createElement(
				_reactSplitPane2.default,
				{ split: 'vertical' },
				this.renderAce(),
				_react2.default.createElement(_markdown2.default, { source: this.state.value })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;
			var mode = props.mode;

			return _react2.default.createElement(
				'div',
				{ className: _style2.default.markdown_editor, style: props.style },
				_react2.default.createElement(_toolbar2.default, null),
				mode === 'split' ? this.renderSplit() : this.renderTabs()
			);
		}
	}]);

	return MarkdownEditor;
})(_react.Component);

exports.default = MarkdownEditor;