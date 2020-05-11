import * as React from 'react';

// @ts-ignore
import { stickyColumn } from './sc.js';

export type TableProps = {
    rows?: number;
    sticky?: number[];
    preload?: boolean;
    cellProps?: Record<number, React.TableHTMLAttributes<HTMLTableCellElement>>;
    headerCellProps?: Record<number, React.TableHTMLAttributes<HTMLTableHeaderCellElement>>;
    hideCols?: Record<number, boolean>;
    ref: React.MutableRefObject<HTMLTableElement>;
};

export type CellProps = React.HTMLAttributes<HTMLTableCellElement> & {
    as?: string;
    hidden?: boolean;
    sticky?: boolean;
};

export const data = {
    name: 'John Doe',
    age: 42,
    gender: 'Male',
    phone: '000-000-0000',
    email: 'johndoe@foo.com',
    address: '123 Sleepytime Ln.',
    city: 'San Francisco',
    state: 'California',
    zip: 12345,
};

export const Cell: React.FC<CellProps> = ({
    as = 'td',
    hidden,
    sticky,
    className,
    ...props
}: CellProps) => {
    return !hidden
        ? React.createElement(as, {
              ...props,
              className: `${className} ${sticky ? 'sticky' : ''}`,
          })
        : null;
};

export const rowRenderer = ({ rows: n, sticky, hideCols, preload, cellProps }) => {
    const keys = Object.keys(data);
    const rows = [];
    let i = 0;

    const cellRenderer = (key: string, index: number) => {
        return (
            <Cell
                key={`${key}-${i}-${index}`}
                sticky={sticky.includes(index)}
                hidden={hideCols[index]}
                className={preload && `scl${index}`}
                {...cellProps[index]}>
                {data[key]}
            </Cell>
        );
    };

    for (i = 0; i < n; i++) {
        rows.push(<tr key={i}>{keys.map(cellRenderer)}</tr>);
    }

    return rows;
};

export const useTable = () => {
    const ref = React.useRef<HTMLTableElement>(null);

    React.useEffect(() => {
        const { cleanup } = stickyColumn(ref.current, {
            globalStylePrefix: 'scl',
            selfAddClassName: true,
        });
        return () => {
            // @ts-ignore
            cleanup();
        };
    }, []);

    return { ref };
};

export const Table = ({
    rows = 10,
    sticky = [],
    preload,
    cellProps = {},
    headerCellProps = {},
    hideCols = {},
    ref,
}: TableProps) => {
    React.useEffect(() => {
        const { cleanup } = stickyColumn(ref.current, {
            globalStylePrefix: 'scl',
            selfAddClassName: true,
        });
        return () => {
            // @ts-ignore
            cleanup();
        };
    }, []);

    return (
        <div className="wrapper">
            <table ref={ref}>
                <thead>
                    <tr>
                        {Object.keys(data).map((key, index) => (
                            <Cell
                                as="th"
                                key={key}
                                sticky={sticky.includes(index)}
                                hidden={hideCols[index]}
                                className={preload && `scl${index}`}
                                {...headerCellProps[index]}>
                                {key}
                            </Cell>
                        ))}
                    </tr>
                </thead>
                <tbody>{rowRenderer({ rows, sticky, cellProps, hideCols, preload })}</tbody>
            </table>
        </div>
    );
};
