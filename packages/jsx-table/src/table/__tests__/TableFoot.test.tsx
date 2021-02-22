import { TableFoot } from '../TableFoot';
import { generateBasicTests } from './generator';

describe('TableFoot tests', () => {
    generateBasicTests('table foot', TableFoot, 'tfoot', 'rowgroup');
});
