import React, { Component, PropTypes } from 'react';
import SplitPane from 'react-split-pane';
import Ace from 'react-ace';
import Markdown from '../markdown';
import Toolbar from './toolbar';
import styles from './style';
import _ from 'lodash';

import 'brace/mode/markdown';
import 'brace/theme/github';

// TODO customizable tabs e.g. localization
// TODO textarea mode without rich editor
// TODO fix split mode
// TODO sync scrollbars for editor and viewer

export class MarkdownEditor extends Component {
	static propTypes = {
		value: PropTypes.string,
		onSave: PropTypes.func,
	};

	static defaultProps = {
		value: '',
		onSave: _.noop,
	};

	constructor(props) {
		super(props);
		this.state = {
			mode: 'edit',
			value: props.value || '',
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value });
	}

	renderAce() {
		const { width, height } = this.props.style || {};
		const onChange = value => {
			this.setState({ value });
		};
		const aceProps = {
			mode: 'markdown',
			theme: 'github',
			value: this.state.value,
			onChange,
			width: width || '100%',
			height: height || '100%',
		};
		return <Ace {...aceProps} />;
	}

	renderNormalView() {
		if (this.state.mode === 'edit') {
			return	this.renderAce();
		}
		return (
			<Markdown source={this.state.value} />
		);
	}

	renderSplitView() {
		return (
			<SplitPane split="vertical">
				{this.renderAce()}
				<Markdown source={this.state.value} />
			</SplitPane>
		);
	}

	render() {
		const { mode } = this.state;
		const { style, splitView } = this.props;
		const onAction = type => {
			// TODO implement formatting actions
			switch (type) {
			case 'mode':
				this.setState({ mode: mode === 'edit' ? 'preview' : 'edit' });
				break;
			case 'save':
				(this.props.onSave || _.noop)();
				break;
			default:
				console.log(`unhandled action ${type}`);
				break;
			}
		};
		return (
			<div className={styles.markdown_editor} style={style}>
				<Toolbar mode={mode} onAction={onAction} />
				{ splitView ? this.renderSplitView() : this.renderNormalView() }
			</div>
		);
	}
}

export default MarkdownEditor;
