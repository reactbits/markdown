import React, {Component} from "react";
import Markdown from "../src";

function code(src, lang = "js") {
	return "\n```" + lang + "\n" + src + "\n```";
}

export default class App extends Component {
	render() {
		var sample = `function foo() {
  console.log("hi");
}`;

		return (
			<div>
				{/* Pass Markdown source to the `source` prop */}
				<Markdown source="**Markdown rules!**" />

				{/* Or pass it as children */}
				{/* You can nest React components, too */}
				<Markdown>
{`
## Header

1. One
1. Two

## Syntax highlighting

${code(sample)}
`}

					<div>Nested component</div>

					{`Test`}
				</Markdown>
			</div>
		)
	}
}
