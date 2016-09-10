'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _railroadDiagrams = require('railroad-diagrams');

var railroad = _interopRequireWildcard(_railroadDiagrams);

var _railroadDiagrams2 = require('railroad-diagrams/railroad-diagrams.css');

var _railroadDiagrams3 = _interopRequireDefault(_railroadDiagrams2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* eslint-disable */
function render(elem) {
  var $e = $(elem);
  try {
    var diagramSource = $e.text();

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

    var result = eval(diagramSource).format(); // eslint-disable-line no-eval
    elem.innerHTML = ''; // eslint-disable-line
    result.addTo(elem);
    $e.find('railroad-diagram').attr('class', _railroadDiagrams3.default['railroad-diagram']);
  } catch (e) {
    return;
  }
}
/* eslint-enable */