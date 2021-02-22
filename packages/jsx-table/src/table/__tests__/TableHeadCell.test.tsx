import * as React from 'react';

import { TableHeadCell } from '../TableHeadCell';
import { generateBasicTests } from './generator';

import { create, ReactTestRendererJSON } from 'react-test-renderer';

describe('TableHeadCell tests', () => {
    generateBasicTests('table head cell', TableHeadCell, 'th', 'columnheader');

    it('should add aria-sort property', () => {
        const component = create(
            <TableHeadCell as="div" sortable>
                Hello
            </TableHeadCell>
        );

        const json = component.toJSON() as ReactTestRendererJSON;
        expect(json.props['aria-sort']).toEqual('none');

        component.unmount();
    });
});
