import { TableBody } from '../TableBody';
import { generateBasicTests } from './generator';

describe('TableBody tests', () => {
    generateBasicTests('table body', TableBody, 'tbody', 'rowgroup');
});
