import { TableHeadRow } from '../TableHeadRow';
import { generateBasicTests } from './generator';

describe('TableHeadRow tests', () => {
    generateBasicTests('table head row', TableHeadRow, 'tr', 'row');
});
