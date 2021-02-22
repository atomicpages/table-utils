import * as React from 'react';

export type TableCellProps<
    E extends HTMLElement = HTMLTableCellElement
> = React.TableHTMLAttributes<E> & {
    as?: keyof React.ReactHTML;
};

export const TableCell: React.FC<TableCellProps> = <E extends HTMLElement>({
    as = 'td',
    ...rest
}: TableCellProps<E>) => {
    return React.createElement(as, {
        role: as !== 'td' ? 'cell' : undefined,
        ...rest,
    });
};
