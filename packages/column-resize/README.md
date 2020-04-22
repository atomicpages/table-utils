# @table-utils/column-resize

A tiny zero-dependency table colum resize function.

## The Problem

A lot of column resize implementations are relatively heavy weight and often don't allow for a lot of customization. This tiny package aims to serve as a starting point for more complex interactions and integrates nicely with frameworks and libraries.

## Usage

```sh
npm i @table-utils/column-resize

# or with yarn
yarn add @table-utils/column-resize
```

Load `.scss` or the pre-compiled `.css`:

```js
import { columnResize } from '@table-utils/column-resize';
import '@table-utils/column-resize/assets/resize.css';

const table = document.getElementById('my-table');
const handlers = columnResize(table);

for (const handler in handlers) {
    table.addEventListener(handler, handlers[handler]);
}
```

## API

`columnResize` takes in the root of the HTML Table (e.g. `table`, `div`, etc.) and returns an iterable object containing event names to functions:

-   `mousemove`
-   `mouseup`
-   `mousedown`

This allows seamless integration into libraries like React and allows you to have greater control on how column resize handlers are executed.

### Options

| Name                      | Required | Type                    | Default  | Description                                         |
| ------------------------- | -------- | ----------------------- | -------- | --------------------------------------------------- |
| `root`                    | Yes      | `HTMLElement`           |          | The base table element                              |
| `options`                 | No       | `Object`                |          | Optionally pass an object to configure the function |
| `options.th`              | No       | `th | div`              | `th`     | The table header cell element                       |

### CSS Customization

By default the CSS assumes a standard HTML table is used. A few variables are exposed which allow for customization:

```scss
$table: '.rt-table';
$table-header-cell: '.rt__table__header';
$table-cell: '.rt-table__body__cell';

@import '~@table-utils/column-resize/assets/resize.scss';
```

## Usage with React

Since this tiny package doesn't attach the event handlers, you can use an effect to hook things up:

```jsx
import * as React from 'react';
import { columnResize } from '@table-utils/column-resize';

function App() {
    const ref = React.useRef();

    React.useEffect(() => {
        const table = ref.current;
        const handlers = columnResize(table);

        for (const handler in handlers) {
            table.addEventListener(handler, handlers[handler]);
        }

        return () => {
            for (const handler in handlers) {
                table.removeEventListener(handler, handlers[handler]);
            }
        };
    }, []);

    return (
        <table ref={ref}>
            <thead>
                <tr>
                    <th>
                        <span>Name</span>
                    </th>
                    <th>
                        <span>Age</span>
                    </th>
                    <th>
                        <span>Company</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
            </tbody>
        </table>
    );
}
```
