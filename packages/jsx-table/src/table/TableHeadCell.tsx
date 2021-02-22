import * as React from 'react';
import type { As } from '../typings/As';

export type TableHeadCellProps<
    E extends HTMLElement = HTMLTableHeaderCellElement,
    P = any
> = React.TableHTMLAttributes<E> &
    As<P> & {
        /**
         * Set true to indicate the column is sortable.
         * Use the aria-sort property to
         */
        sortable?: boolean;
    };

export const TableHeadCell: React.FC<TableHeadCellProps> = <E extends HTMLElement>({
    as = 'th',
    sortable,
    ...rest
}: TableHeadCellProps<E>) => {
    const native = as === 'th';
    const sort = rest['aria-sort'];

    return React.createElement(as, {
        role: !native ? 'columnheader' : undefined,
        ...rest,
        'aria-sort': !native && sortable ? 'none' : sort,
    });
};
