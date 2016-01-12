[![npm version](https://badge.fury.io/js/react-markdown2.svg)](https://badge.fury.io/js/react-markdown2)
[![Build Status](https://drone.io/github.com/reactbits/markdown/status.png)](https://drone.io/github.com/reactbits/markdown/latest)

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
* [x] use markdown-it to render markdown content
* [x] use prismjs for syntax highlighting
* [ ] render HTML content if content-type is not markdown
* [ ] allow to extend markdown rendering with markdown-it plugins
* [ ] support diff files
* [ ] reuse embed.js features

## Licence

MIT. See LICENSE.
