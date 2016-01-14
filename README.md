[![npm version](https://badge.fury.io/js/react-markdown2.svg)](https://badge.fury.io/js/react-markdown2)
[![Build Status](https://drone.io/github.com/reactbits/markdown/status.png)](https://drone.io/github.com/reactbits/markdown/latest)

# markdown
Yet another react component to render markdown.

## Install

```
npm install --save react-markdown2
```

## Usage

```jsx
import React, {Component} from "react";
import Markdown from "react-markdown2";

class Example extends Component {
    render() {
        return (
            <div>
                {/* Pass Markdown source to the `source` prop */}
                <Markdown source="**Markdown is awesome!**" />

                {/* Or pass it as children */}
                {/* You can nest React components, too */}
                <Markdown>
                    {`
                    ## Header
                    1. One
                    2. Two
                    `}

                    <div>Nested component</div>

                    {`Test`}
                </Markdown>
            </div>
        )
    }
}
```

## TODO
* [x] Use markdown-it to render markdown content
* [x] Use prismjs for syntax highlighting
* [ ] Diagrams
	* [x] [Sequance diagrams](https://github.com/bramp/js-sequence-diagrams)
	* [x] [Flowchart](https://github.com/adrai/flowchart.js)
	* [ ] Buttons to show source code of diagram
* [ ] Auto-embeddable links
	* [ ] Video services
		* [ ] youtube
		* [ ] vimeo
		* [ ] vine
		* [ ] daylymotion
	* [ ] Audio services
	* [ ] github
	* [ ] twitter
	* [ ] facebook
	* [ ] google maps
* [ ] Automatically detect and render diff patch blocks
* [ ] Integrate/implement [embed.js](https://github.com/ritz078/embed.js) features
* [ ] render HTML content if content-type is not markdown
* [ ] allow to extend markdown rendering with markdown-it plugins

## Licence

MIT. See LICENSE.
