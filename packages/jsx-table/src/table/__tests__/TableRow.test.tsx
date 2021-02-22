import { TableRow } from '../TableRow';
import { generateBasicTests } from './generator';

describe('TableRow tests', () => {
    generateBasicTests('table row', TableRow, 'tr', 'row');
});
