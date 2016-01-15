/* eslint-disable */
import * as railroad from 'railroad-diagrams';
/* eslint-enable */
import styles from 'railroad-diagrams/railroad-diagrams.css';

export default function render(elem) {
	const $e = $(elem);
	try {
		const diagramSource = $e.text();

		// context for eval
		/* eslint-disable */
		var Diagram = railroad.Diagram;
		var ComplexDiagram = railroad.ComplexDiagram;
		var Sequence = railroad.Sequence;
		var Stack = railroad.Stack;
		var OptionalSequence = railroad.OptionalSequence;
		var Choice = railroad.Choice;
		var MultipleChoice = railroad.MultipleChoice;
		var Optional = railroad.Optional;
		var OneOrMore = railroad.OneOrMore;
		var ZeroOrMore = railroad.ZeroOrMore;
		var Terminal = railroad.Terminal;
		var NonTerminal = railroad.NonTerminal;
		var Comment = railroad.Comment;
		var Skip = railroad.Skip;
		/* eslint-enable */

		const result = eval(diagramSource).format(); // eslint-disable-line no-eval
		elem.innerHTML = ''; // eslint-disable-line
		result.addTo(elem);
		$e.find('railroad-diagram').attr('class', styles['railroad-diagram']);
	} catch (e) {
		return;
	}
}
