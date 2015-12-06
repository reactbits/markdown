import React, { Component } from 'react';
import Markdown from '../src';

function code(src, lang = 'js') {
	return '\n```' + lang + '\n' + src + '\n```';
}

export default class App extends Component {
	render() {
		const sample = code(`function foo() {
  console.log("hi");
}`);

		return (
			<div>
				{/* Pass Markdown source to the `source` prop */}
				<Markdown source="**Markdown rules!**" />

				{/* Or pass it as children */}
				<Markdown>
{`
## Header

1. One
1. Two

## Syntax highlighting

${sample}

## Emoji

:) :D

## Links

@sergeyt please fix issue 180999

test@mail.com

see #hashtag
`}

					{/* You can nest React components, too */}
					<div>Nested component</div>

					{`Test`}
				</Markdown>
			</div>
		);
	}
}
