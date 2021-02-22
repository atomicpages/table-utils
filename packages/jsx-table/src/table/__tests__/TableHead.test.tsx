import { TableHead } from '../TableHead';
import { generateBasicTests } from './generator';

describe('TableHead tests', () => {
    generateBasicTests('table head', TableHead, 'thead', 'rowgroup');
});
