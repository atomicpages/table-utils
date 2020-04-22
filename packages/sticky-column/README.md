# @table-utils/sticky-column

> This is not a `position: sticky` polyfill.

A tiny zero-dependency sticky style function designed to work with "stuck" table cells.

## The Problem

HTML tables work well with `position: sticky` with vertical scrolling, but what about horizontal scrolling? What if you want multiple sticky columns? `@table-utils/sticky-column` aims to solve this problem in a technology-agnostic manner

## Usage

```sh
npm i @table-utils/sticky-column

# or with yarn
yarn add @table-utils/sticky-column
```

Add a little CSS:

```css
.pinned {
    position: sticky;
}

table th {
    top: 0;
}

table td.pinned {
    left: 0;
}
```

Call the function in your code:

```js
import { stickyColumn } from "@table-utils/sticky-column";

// that's it!
stickyColumn(document.getElementById("my-table"));
```

## API

The function has a very simple API:

| Name                      | Required | Type                      | Default  | Description                                         |
| ------------------------- | -------- | ------------------------- | -------- | --------------------------------------------------- |
| `root`                    | Yes      | `HTMLElement`             |          | The base table element                              |
| `options`                 | No       | `Object`                  |          | Optionally pass an object to configure the function |
| `options.thead`           | No       | `thead \| div \| section` | `thead`  | The table header element                            |
| `options.tr`              | No       | `tr \| div`               | `tr`     | The table row element                               |
| `options.th`              | No       | `th \| div`               | `th`     | The table header cell element                       |
| `options.stickyClassName` | No       | `string`                  | `pinned` | The class attribute value of the pinned cell        |
| `options.contiguous`      | No       | `boolean`                 | `true`   | Set false to traverse the entire table              |

## Usage with React

Usage with React is super easy. Just pass it into a `React.useLayoutEffect`:

```jsx
import * as React from "react";
import { stickyColumn } from "@table-utils/sticky-column";

function App() {
    const ref = React.useRef();

    React.useLayoutEffect(() => {
        stickyColumn(ref.current, { className: "sticky" });
    }, []);

    return (
        <table ref={ref}>
            <thead>
                <tr>
                    <th className="sticky">Name</th>
                    <th>Age</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="sticky">...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
            </tbody>
        </table>
    );
}
```

## Performance

The algorithm used is relatively fast because the algorithm works with _contiguous_ columns; however, as tables grow large, there will be a slowdown when computing the width of cells. To help with performance of large tables, DOM reads and writes are batched.

## Limitations

Currently there's no support for virtualized tables.
