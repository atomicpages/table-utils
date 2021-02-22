import * as React from 'react';

import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableHeadCell } from './TableHeadCell';
import { TableHeadRow } from './TableHeadRow';
import { TableFoot } from './TableFoot';

import type { As } from '../typings/As';

export type TableProps<
    E extends HTMLElement = HTMLTableElement,
    P = any
> = React.TableHTMLAttributes<E> & As<P> & Pick<Required<React.TableHTMLAttributes<E>>, 'children'>;

type Statics = {
    Body: typeof TableBody;
    Head: typeof TableHead;
    HeadRow: typeof TableHeadRow;
    HeadCell: typeof TableHeadCell;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    Foot: typeof TableFoot;
};

export const Table: React.FC<TableProps> & Statics = <E extends HTMLElement>({
    as = 'table',
    ...rest
}: TableProps<E>) => {
    return React.createElement(as, {
        role: as !== 'table' ? 'table' : undefined,
        ...rest,
    });
};

Table.Body = TableBody;
Table.Head = TableHead;
Table.HeadRow = TableHeadRow;
Table.HeadCell = TableHeadCell;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Foot = TableFoot;
