# markdown
Yet another react component to render markdown

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
* [ ] Render HTML content if content-type is not markdown
* [ ] Allow to extend markdown rendering with markdown-it plugins

## Licence

MIT. See LICENSE.
