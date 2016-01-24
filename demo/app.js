import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Markdown, MarkdownEditor } from '../src';

const contentLinks = [
	{
		url: './content/all.md',
		label: 'All in one',
	},
	{
		url: './content/code.md',
		label: 'Code blocks',
	},
	{
		url: './content/diff.md',
		label: 'Diff blocks',
	},
	{
		url: './content/tex.md',
		label: 'TeX blocks',
	},
	{
		url: './content/sequence.md',
		label: 'Sequence diagrams',
	},
	{
		url: './content/flow.md',
		label: 'Flow charts',
	},
	{
		url: './content/railroad.md',
		label: 'Railroad diagrams',
	},
	{
		url: './content/image.md',
		label: 'Embed image',
	},
	{
		url: './content/audio.md',
		label: 'Embed audio',
	},
	{
		url: './content/video.md',
		label: 'Embed video',
	},
	{
		url: './content/snippets.md',
		label: 'Online snippets',
	},
	{
		url: './content/maps.md',
		label: 'Maps',
	},
	{
		url: './content/tasklist.md',
		label: 'Task lists',
	},
];

function sidebarMenu() {
	return contentLinks.map((t, i) => {
		const linkProps = {
			key: i,
			href: t.url,
			eventKey: i,
			style: {
				margin: '4px',
			},
		};
		return <NavItem {...linkProps}>{t.label}</NavItem>;
	});
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			activeKey: -1,
			mode: 'preview',
		};
		this.select = this.select.bind(this);
		this.select(0);
	}

	select(i) {
		const t = contentLinks[i];
		fetch(t.url).then(response => {
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
			return <MarkdownEditor {...props}/>;
		}
		return <Markdown source={this.state.content} />;
	}

	render() {
		const toggleMode = () => {
			const mode = this.state.mode === 'source' ? 'preview' : 'source';
			this.setState({ mode });
		};
		return (
			<Grid className="app">
				<Row>
					<Col md={3}>
						<Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.select}>
						{sidebarMenu()}
						</Nav>
					</Col>
					<Col md={9}>
						<Navbar>
							<Nav>
								<NavItem eventKey={1} href="#" onClick={toggleMode}>
									{this.state.mode === 'source' ? 'Preview' : 'Source'}
								</NavItem>
							</Nav>
						</Navbar>
						{this.renderContent()}
					</Col>
				</Row>
			</Grid>
		);
	}
}
