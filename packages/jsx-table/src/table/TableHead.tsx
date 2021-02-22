import * as React from 'react';

export type TableHeadProps<
    E extends HTMLElement = HTMLTableSectionElement
> = React.TableHTMLAttributes<E> & {
    as?: keyof React.ReactHTML;
};

export const TableHead: React.FC<TableHeadProps> = <E extends HTMLElement>({
    as = 'thead',
    ...rest
}: TableHeadProps<E>) => {
    return React.createElement(as, {
        role: as !== 'thead' ? 'rowgroup' : undefined,
        ...rest,
    });
};
