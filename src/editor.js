import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import SplitPane from 'react-split-pane';
import Ace from 'react-ace';
import Markdown from './markdown';
import style from './style';
import splitStyles from './split'; // eslint-disable-line

import 'brace/mode/markdown';
import 'brace/theme/github';

// TODO textarea mode without rich editor
// TODO fix split mode
// TODO sync scrollbars for editor and viewer

export class MarkdownEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};
	}

	renderAce() {
		const { height } = this.props.style || {};
		const onChange = value => {
			this.setState({ value });
		};
		const aceProps = {
			mode: 'markdown',
			theme: 'github',
			value: this.state.value,
			onChange,
		};
		if (height) {
			aceProps.height = height;
		}
		return <Ace {...aceProps}/>;
	}

	renderTabs() {
		return (
			<Tabs>
				<TabList>
					<Tab>Source</Tab>
					<Tab>Preview</Tab>
				</TabList>
				<TabPanel>{this.renderAce()}</TabPanel>
				<TabPanel>
					<Markdown source={this.state.value}/>
				</TabPanel>
			</Tabs>
		);
	}

	renderSplit() {
		return (
			<SplitPane split="vertical">
			{this.renderAce()}
				<Markdown source={this.state.value}/>
			</SplitPane>
		);
	}

	render() {
		const props = this.props;
		return (
			<div className={style.markdown_editor} style={props.style}>
				{this.renderTabs()}
			</div>
		);
	}
}

export default MarkdownEditor;
