import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Markdown from '../src';
import qwest from 'qwest';

const contentLinks = [
	{
		url: '/content/all.md',
		label: 'All in one',
	},
	{
		url: '/content/code.md',
		label: 'Code blocks',
	},
	{
		url: '/content/sequence.md',
		label: 'Sequence diagrams',
	},
	{
		url: '/content/flow.md',
		label: 'Flow charts',
	},
	{
		url: '/content/embed.md',
		label: 'Embeddable links',
	},
	{
		url: '/content/tasklist.md',
		label: 'Task lists',
	},
];

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { content: '' };
		this.load(contentLinks[5].url);
	}

	load(url) {
		qwest.get(url).then((xhr, content) => {
			this.setState({ content });
		});
	}

	render() {
		const items = contentLinks.map(t => {
			const linkProps = {
				key: t.url,
				href: t.url,
				onClick: (e) => {
					e.preventDefault();
					this.load(t.url);
					return false;
				},
				style: {
					margin: '4px',
				},
			};
			return <a {...linkProps}>{t.label}</a>;
		});
		return (
			<Grid className="app">
				<Row>
					<Col md={8}>
						<div>{items}</div>
						<Markdown source={this.state.content} />
					</Col>
				</Row>
			</Grid>
		);
	}
}
