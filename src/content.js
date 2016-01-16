import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import render from './render';
import stripIndent from 'strip-indent';
import renderInjections from './inject';
import styles from 'github-markdown-css/github-markdown';

export default class Content extends Component {
	componentDidMount() {
		this.replaceBlocks();
	}

	componentDidUpdate() {
		this.replaceBlocks();
	}

	replaceBlocks() {
		const root = $(ReactDOM.findDOMNode(this));
		renderInjections(root.find('.injection'));
	}

	render() {
		const { source } = this.props;
		const html = render(stripIndent(source));
		return <span className={styles['markdown-body']} dangerouslySetInnerHTML={{ __html: html }}/>;
	}
}
