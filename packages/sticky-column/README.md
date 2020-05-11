# @table-utils/sticky-column

> This is not a `position: sticky` polyfill.

A tiny zero-dependency sticky style function designed to work with "stuck" table cells.

## The Problem

HTML tables work well with `position: sticky` with vertical scrolling, but what about horizontal scrolling? What if you want multiple sticky columns? `@table-utils/sticky-column` aims to solve this problem in a technology-agnostic manner.

## Usage

```sh
npm i @table-utils/sticky-column

# or with yarn
yarn add @table-utils/sticky-column
```

Add a little CSS:

```css
.sticky {
    position: sticky;
    background-color: #eee;
}

table th {
    top: 0;
}

table td.sticky {
    left: 0;
}
```

Call the function in your code:

```js
import { stickyColumn } from '@table-utils/sticky-column';

// that's it!
stickyColumn(document.getElementById('my-table'));
```

### Synchronous Example

If you're using `fastdom` or have your own solution that needs to use a synchronous version of sticky-columns, that's exported for your convenience:

```js
import { stickyColumn } from '@table-utils/sticky-column';

stickyColumn.sync(document.getElementById('my-table'));
```

## How it Works

With no extra config options, sticky-columns works by getting the widths of cells matching `sticky` and setting the `left` property of each cell with the matching className. See the [performance](#performance) sections for info on what options sticky-column has to ensure things stay fast for big tables.

## API

`@table-utils/sticky-column` has a super simple API.

### Options

| Name                        | Required | Type                      | Default  | Description                                                                                                                                                                |
| --------------------------- | -------- | ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`                      | Yes      | `HTMLElement`             |          | The base table element                                                                                                                                                     |
| `options`                   | No       | `Object`                  |          | Optionally pass an object to configure the function                                                                                                                        |
| `options.thead`             | No       | `thead \| div \| section` | `thead`  | The table header element                                                                                                                                                   |
| `options.tr`                | No       | `tr \| div`               | `tr`     | The table row element                                                                                                                                                      |
| `options.th`                | No       | `th \| div`               | `th`     | The table header cell element                                                                                                                                              |
| `options.stickyClassName`   | No       | `string`                  | `sticky` | The class attribute value of the sticky cell                                                                                                                               |
| `options.globalStylePrefix` | No       | `string`                  |          | Loads the widths of sticky cells into an internal stylesheet and adds a CSS prefix that is applied to sticky cells                                                         |
| `options.selfAddClassName`  | No       | `boolean`                 |          | Skips adding the className on the DOM node. You'll be on the hook for adding `globalStylePrefix` to all sticky cells. Useful when integrating with React, other libs/frameworks, and for performance! |

## Usage with React

Usage with React is super easy. Just pass it into a `React.useEffect`.

> Note: It's recommended to use `globalStylePrefix` + `selfAddClassName` with React.
> See the [performance](#performance) section for more details.

```jsx
import * as React from 'react';
import { stickyColumn } from '@table-utils/sticky-column';

function App() {
    const ref = React.useRef();

    React.useEffect(() => {
        stickyColumn(ref.current, {
            globalStylePrefix: 'frozen__col--',
            selfAddClassName: true,
        });
    }, []);

    return (
        <table ref={ref}>
            <thead>
                <tr>
                    <th className="frozen frozen__col--0">Name</th>
                    <th className="frozen frozen__col--1">Age</th>
                    <th>Company</th>
                    <th>Job Area</th>
                    <th>Job Title</th>
                    <th>Year Experience</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="frozen frozen__col--0">...</td>
                    <td className="frozen frozen__col--1">...</td>
                    {/* ... */}
                </tr>
            </tbody>
        </table>
    );
}
```

<a name="performance"></a>

## Performance

sticky-column comes with a few options that you can configure to ensure things stay fast as your tables grow. By default, inline CSS is added to each table cell since it's the least invasive and least likely to cause problems; however it is **highly** recommended you use `globalStylePrefix` + `selfAddClassName` if you know you'll be dealing with extremely large tables.

> For real performance gains we want to minimize the number of interactions sticky column has with the DOM. You can significantly speed things up by adding classNames to all sticky headers and sticky cells.

### Vanilla JS

When working with vanilla JS, we can leverage browser events before running sticky column on a table. Waiting for [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) is one such event. In most cases, this will prevent forced reflows from occurring.

> Note: if you're seeing "jumping" or "flashing" of styles, make sure your styles are available as soon as possible (i.e. critical) or consider using the `load` event.

```js
window.addEventListener('DOMContentLoaded', () => {
    StickyColumn.stickyColumn(document.getElementById('root'), {
        globalStylePrefix: 'slc',
        selfAddClassName: true,
    });
});
```

Alternatively, we can wait for [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) if all CSS and selectors are statically available when the browser fires the load event.

```js
window.addEventListener('load', () => {
    StickyColumn.stickyColumn(document.getElementById('root'), {
        globalStylePrefix: 'slc',
        selfAddClassName: true,
    });
});
```

## Handling Resize

To handle screen size changes, listen on the `resize` event. To prevent unnecessary reflows, we can wrap our sticky column call inside a `setTimeout`. For extra performance gains you can use a [debounce](https://www.npmjs.com/package/debounce) function to prevent unnecessary calls.

```js
window.addEventListener('resize', () => {
    setTimeout(() => {
        StickyColumn.stickyColumn(document.getElementById('root'), {
            globalStylePrefix: 'slc',
            selfAddClassName: true,
        });
    }, 100);
});
```

## Customizing

sticky-column exports all internal functions so you can integrate with other libraries/frameworks easily. For example, here's how you can integrate with `fastdom`:

```js
import { fastdom } from 'fastdom';

import {
    createGlobalStyles,
    getStickyCellWidths,
    addClassNamesToStickyCells,
} from '@table-utils/sticky-column';

const stickify = table => {
    const options = {
        stickyClassName: 'sticky',
        globalStylePrefix: 'scl',
        thead: 'thead',
        th: 'th',
    };

    fastdom.measure(() => {
        const widths = getStickyCellWidths(table, options);

        fastdom.mutate(() => {
            createGlobalStyles(widths, options);
            addClassNamesToStickyCells(table, options);
        });
    });
};
```
