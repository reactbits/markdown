import React, { Component } from 'react';
import render from './render';
import stripIndent from 'strip-indent';
import { linkTo } from './linkify';
import { isImageURL, isVideoURL, completeVideoURL } from './util';

function renderContent(source) {
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

export default class Markdown extends Component {
	render() {
		const src = this.props.source;
		const className = this.props.className || 'markdown';
		const style = this.props.style || {};
		let content;
		if (src) {
			content = renderContent(src);
		} else {
			content = React.Children.map(this.props.children, child => {
				return typeof child === 'string' ? renderContent(child) : child;
			});
		}
		return (
			<div className={className} style={style}>{content}</div>
		);
	}
}

export { render, linkTo };
