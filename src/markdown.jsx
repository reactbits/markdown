import React, { Component } from 'react';
import Content from './content';

export default class Markdown extends Component {
	render() {
		const { source } = this.props;
		const className = this.props.className || 'markdown';
		const style = this.props.style || {};
		let content;
		if (source) {
			content = <Content source={source} />;
		} else {
			content = React.Children.map(this.props.children, (child, i) => {
				if (typeof child === 'string') {
					return <Content key={i} source={child} />;
				}
				return child;
			});
		}
		return (
			<div className={className} style={style}>{content}</div>
		);
	}
}
