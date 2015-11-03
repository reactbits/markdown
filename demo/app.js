import {Component} from "react";
import Markdown from "main";

export default class App extends Component {
	render() {
		var text = `# list
* item 1
* item 2
`
		return (
			<Markdown text={text}/>
		);
	}
}
