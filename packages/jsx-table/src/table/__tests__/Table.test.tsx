import { Table } from '../Table';
import { generateBasicTests } from './generator';

describe('Table tests', () => {
    generateBasicTests('table', Table, 'table', 'table');
});
