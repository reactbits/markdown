import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Sidebar from 'react-sidebar';

export const contentLinks = [
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

function menuItems() {
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

export default class AppSidebar extends Component {
	render() {
		const props = this.props;
		const onSelect = i => props.onSelect(contentLinks[i], i);
		const content = (
			<Nav bsStyle="pills" stacked activeKey={props.activeKey} onSelect={onSelect}>
			{menuItems()}
			</Nav>
		);
		return (
			<Sidebar sidebar={content} docked>
				{this.props.children}
			</Sidebar>
		);
	}
}
