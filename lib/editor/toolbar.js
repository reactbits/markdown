'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(props) {
	var className = (0, _classnames2.default)(props.icon ? props.icon : null);
	var attrs = _lodash2.default.pick(props, 'title', 'onClick');
	return _react2.default.createElement(
		'i',
		_extends({ className: className }, attrs),
		props.text
	);
}

function Toolbar(props) {
	var action = function action(type) {
		return function () {
			return props.onAction(type);
		};
	};
	return _react2.default.createElement(
		'div',
		{ className: _style2.default.toolbar },
		_react2.default.createElement(Button, { icon: 'fa fa-bold', title: 'Bold', onClick: action('bold') }),
		_react2.default.createElement(Button, { icon: 'fa fa-italic', title: 'Italic', onClick: action('italic') }),
		_react2.default.createElement(Button, { icon: 'fa fa-undo', title: 'Undo', onClick: action('undo') }),
		_react2.default.createElement(Button, { icon: 'fa fa-repeat', title: 'Redo', onClick: action('redo') }),
		_react2.default.createElement(Button, { icon: 'fa fa-list-ol', title: 'Numbered list', onClick: action('ol') }),
		_react2.default.createElement(Button, { icon: 'fa fa-list', title: 'Bulleted list', onClick: action('ul') })
	);
}