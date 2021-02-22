import { TableCell } from '../TableCell';
import { generateBasicTests } from './generator';

describe('TableCell tests', () => {
    generateBasicTests('table cell', TableCell, 'td', 'cell');
});
