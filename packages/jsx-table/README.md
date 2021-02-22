# (React) JSX Table

A simple, accessible table view.

## Why

Serves as a base component for creating interactive data grids and other kind of complex tables.

## Install

```sh
npm i @table-utils/jsx-table
```

## Usage

Although this table is written in React, it's only the table view. No interaction, no hooks, just
simple functions and accessibility props. Due to the simplicity, it's trivial to port to other JSX
libraries like Preact, Hyperapp, Crank, Solid, etc.

### Basics

```jsx
import { Table } from '@table-utils/jsx-table';

function App() {
    return (
        <Table>
            <Table.Head>
                <Table.HeadRow>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Age</Table.HeadCell>
                </Table.HeadRow>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>John Doe</Table.Cell>
                    <Table.Cell>28</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}
```

### `div` tables

JSX table support representing the table as other JSX types or DOM nodes, too via the `as` prop:

```jsx
import { Table } from '@table-utils/jsx-table';

const as = 'div';

function App() {
    return (
        <Table as={as}>
            <Table.Head as={as}>
                <Table.HeadRow as={as}>
                    <Table.HeadCell as={as}>Name</Table.HeadCell>
                    <Table.HeadCell as={as}>Age</Table.HeadCell>
                </Table.HeadRow>
            </Table.Head>
            <Table.Body as={as}>
                <Table.Row as={as}>
                    <Table.Cell as={as}>John Doe</Table.Cell>
                    <Table.Cell as={as}>28</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}
```

We can also create higher-order functions and make this process a whole lot easier. This works
because JSX Table exposes elements as statics on the function which are enumerable.

```jsx
import { Table as JSXTable } from '@table-utils/jsx-table';

const Table = Object.keys(JSXTable).reduce((acc, key) => {
    acc[key] = props => {
        return React.createElement(JSXTable[key], {
            ...props,
            as: 'div',
        });
    };

    return acc;
}, {});

function App() {
    // use as before, but without `as` :)
}
```

### Preact

The [preact docs](https://preactjs.com/guide/v10/switching-to-preact) have fantastic docs on how to
make the jump from React to Preact. If you're in the process of migrating from React to Preact then
you [can use aliases](https://preactjs.com/guide/v10/getting-started/#aliasing-react-to-preact) to
make that happen.

If you're taking a gander at JSX table and are writing your app with Preact, then you're in luck!
JSX table doesn't use anything specific to React and has _zero_ dependencies; therefore, it's
recommended to transpile JSX from `React.createElement` to hyperscript via babel. See JSX
transpiling section for more details and common scenarios.

## JSX Transpiling

As mentioned, JSX table is written with React in mind; however, with modern tooling it's incredibly
easy to make the move to Preact, Crank, or some other JSX stack.

## a11y &amp; WCAG

DOM nodes other than `table` `tr`, `td`, etc... have the correct ARIA roles attached; however
additional props are required to ensure table accessibility. Here's a helpful matrix:

| Prop                                                          | Value                                      | Required                                 | Description                        | Alternatives |
| ------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------- | ---------------------------------- | ------------ |
| `aria-label`                                                  | `string`                                   | No                                       | Describes the purpose of the table | `caption`    |
| `aria-labelledby`                                             | `id`                                       | When `caption` is used                   | Link a `caption` to the table      |              |
| `aria-describedby`                                            | `id`                                       | When `caption` is used                   | Link a `caption` to the table      |              |
| [`aria-sort`](https://www.digitala11y.com/aria-sort/)         | `none \| ascending \| descending \| other` | When columns have a sort direction       | Indicates sort direction of column |              |
| [`aria-rowcount`](https://www.digitala11y.com/aria-rowcount/) | `number >= -1`                             | Only when some rows are hidden/paginated | Indicates the total number of rows |              |
| {`aria-rowindex`}(https://www.digitala11y.com/aria-rowindex/) | `number >= 0`                              | Only when some rows are hidden/paginated | Indicates the current row          |              |

### `role="grid"`

JSX table is a template for representing tabular data and building complex, interactive grids or
tree grids. For more info on creating dynamic grids and maintaining WCAG-compliance, see the MDN
docs for a good starting point:
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Grid_Role

Another great resource is: https://www.digitala11y.com/grid-role/
