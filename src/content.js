import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import render from './render';
import stripIndent from 'strip-indent';
import { isImageURL, isVideoURL, completeVideoURL } from './util';
import renderDiagrams from './diagrams';

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
		// TODO make image and video URLs as markdown-it plugin
		if (isImageURL(source)) {
			return <img src={source}/>;
		}

		if (isVideoURL(source)) {
			const src = completeVideoURL(source);
			return (
				<div className="embed-container">
					<iframe src={src} frameBorder={0} allowFullScreen/>
				</div>
			);
		}

		const html = render(stripIndent(source));
		return <span dangerouslySetInnerHTML={{ __html: html }}/>;
	}
}
