import React, { Component } from 'react';
import Content from './content';

export class Markdown extends Component {
	render() {
		const { source } = this.props;
		const className = this.props.className || 'markdown';
		const style = this.props.style || {};
		let content;
		if (source) {
			content = <Content source={source}/>;
		} else {
			content = React.Children.map(this.props.children, child => {
				return typeof child === 'string' ? <Content source={child}/> : child;
			});
		}
		return (
			<div className={className} style={style}>{content}</div>
		);
	}
}

export default Markdown;
