import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import render from './render';
import stripIndent from 'strip-indent';
import renderDiagrams from './diagrams';
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
		renderDiagrams(root.find('.diagram'));
	}

	render() {
		const { source } = this.props;
		const html = render(stripIndent(source));
		return <span className={styles['markdown-body']} dangerouslySetInnerHTML={{ __html: html }}/>;
	}
}
