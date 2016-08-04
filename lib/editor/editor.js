'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MarkdownEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSplitPane = require('react-split-pane');

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/markdown');

require('brace/theme/github');

var _markdown = require('../markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO customizable tabs e.g. localization
// TODO textarea mode without rich editor
// TODO fix split mode
// TODO sync scrollbars for editor and viewer

var MarkdownEditor = exports.MarkdownEditor = function (_Component) {
	_inherits(MarkdownEditor, _Component);

	function MarkdownEditor(props) {
		_classCallCheck(this, MarkdownEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MarkdownEditor).call(this, props));

		_this.state = {
			mode: 'edit',
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
				(_this2.props.onChange || _lodash2.default.noop)(value);
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
		key: 'renderNormalView',
		value: function renderNormalView() {
			if (this.state.mode === 'edit') {
				return this.renderAce();
			}
			return _react2.default.createElement(_markdown2.default, { source: this.state.value });
		}
	}, {
		key: 'renderSplitView',
		value: function renderSplitView() {
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
			var _this3 = this;

			var mode = this.state.mode;
			var _props = this.props;
			var style = _props.style;
			var splitView = _props.splitView;

			var onAction = function onAction(type) {
				// TODO implement formatting actions
				switch (type) {
					case 'mode':
						_this3.setState({ mode: mode === 'edit' ? 'preview' : 'edit' });
						break;
					case 'save':
						(_this3.props.onSave || _lodash2.default.noop)(_this3.state.value);
						break;
					default:
						console.log('unhandled action ' + type);
						break;
				}
			};
			return _react2.default.createElement(
				'div',
				{ className: _style2.default.markdown_editor, style: style },
				_react2.default.createElement(_toolbar2.default, { mode: mode, onAction: onAction }),
				splitView ? this.renderSplitView() : this.renderNormalView()
			);
		}
	}]);

	return MarkdownEditor;
}(_react.Component);

MarkdownEditor.propTypes = {
	value: _react.PropTypes.string,
	onSave: _react.PropTypes.func,
	onChange: _react.PropTypes.func
};
MarkdownEditor.defaultProps = {
	value: '',
	onSave: _lodash2.default.noop,
	onChange: _lodash2.default.noop
};
exports.default = MarkdownEditor;