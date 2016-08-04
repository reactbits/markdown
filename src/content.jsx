import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import stripIndent from 'strip-indent';
import styles from 'github-markdown-css/github-markdown.css';
import render from './render';
import renderInjections from './inject';

export default class Content extends Component {
	componentDidMount() {
		this.replaceBlocks();
	}

	componentDidUpdate() {
		this.replaceBlocks();
	}

	replaceBlocks() {
		const root = $(ReactDOM.findDOMNode(this)); // eslint-disable-line
		renderInjections(root.find('.injection'));
	}

	render() {
		const { source } = this.props;
		const html = render(stripIndent(source));
		const className = styles['markdown-body'];
		return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
	}
}
