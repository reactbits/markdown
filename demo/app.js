import React, { Component } from 'react';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
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
		url: '/content/diff.md',
		label: 'Diff blocks',
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
		url: '/content/railroad.md',
		label: 'Railroad diagrams',
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
		this.state = { content: '', activeKey: -1 };
		this.select = this.select.bind(this);
		this.select(2);
	}

	select(i) {
		const t = contentLinks[i];
		qwest.get(t.url).then((xhr, content) => {
			this.setState({ content, activeKey: i });
		});
	}

	render() {
		const items = contentLinks.map((t, i) => {
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
		return (
			<Grid className="app">
				<Row>
					<Col md={3}>
						<Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.select}>
							{items}
						</Nav>
					</Col>
					<Col md={9}>
						<Markdown source={this.state.content} />
					</Col>
				</Row>
			</Grid>
		);
	}
}
