import * as React from 'react';

export type TableBodyProps<
    E extends HTMLElement = HTMLTableSectionElement
> = React.TableHTMLAttributes<E> & {
    as?: keyof React.ReactHTML;
};

export const TableBody: React.FC<TableBodyProps> = <E extends HTMLElement>({
    as = 'tbody',
    ...rest
}: TableBodyProps<E>) => {
    return React.createElement(as, {
        role: as !== 'tbody' ? 'rowgroup' : undefined,
        ...rest,
    });
};
