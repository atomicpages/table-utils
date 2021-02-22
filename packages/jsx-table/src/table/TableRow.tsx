import * as React from 'react';

export type TableRowProps<
    E extends HTMLElement = HTMLTableRowElement
> = React.TableHTMLAttributes<E> & {
    as?: keyof React.ReactHTML;
};

export const TableRow: React.FC<TableRowProps> = <E extends HTMLElement>({
    as = 'tr',
    children,
    ...rest
}: TableRowProps<E>) => {
    return React.createElement(
        as,
        {
            role: as !== 'tr' ? 'row' : undefined,
            ...rest,
        },
        children
    );
};
