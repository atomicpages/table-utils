import * as React from 'react';
import { TableBody, TableBodyProps } from './TableBody';

export type TableFootProps = TableBodyProps;

export const TableFoot: React.FC<TableFootProps> = ({ as = 'tfoot', ...rest }) => {
    return <TableBody as={as} role={as !== 'tfoot' ? 'rowgroup' : undefined} {...rest} />;
};
