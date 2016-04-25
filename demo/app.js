import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Markdown, MarkdownEditor } from '../src';
import Sidebar, { contentLinks } from './sidebar';
import style from './style.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			activeKey: -1,
			mode: 'preview',
		};
		this.select = this.select.bind(this);
		this.select(contentLinks[0], 0);
	}

	select(item, i) {
		fetch(item.url).then(response => {
			response.text().then(content => {
				this.setState({ content, activeKey: i });
			});
		});
	}

	renderContent() {
		if (this.state.mode === 'source') {
			const props = {
				value: this.state.content,
				style: {
					height: '600px',
				},
			};
			return <MarkdownEditor {...props} />;
		}
		return <Markdown source={this.state.content} />;
	}

	render() {
		const toggleMode = () => {
			const mode = this.state.mode === 'source' ? 'preview' : 'source';
			this.setState({ mode });
		};
		return (
			<div className={style.root}>
				<Sidebar activeKey={this.state.activeKey} onSelect={this.select}>
					<div className={style.content_container}>
						<Navbar>
							<Nav>
								<NavItem eventKey={1} href="#" onClick={toggleMode}>
									{this.state.mode === 'source' ? 'Preview' : 'Source'}
								</NavItem>
							</Nav>
						</Navbar>
						{this.renderContent()}
					</div>
				</Sidebar>
			</div>
		);
	}
}
