import * as SC from '../index';
import { exampleDOM } from './testUtils';

describe('StickyColumn tests', () => {
    it('should export inner functions', () => {
        expect(SC.addClassNamesToStickyCells).toBeInstanceOf(Function);
        expect(SC.addInlineStylesToStickyCells).toBeInstanceOf(Function);
        expect(SC.createGlobalStyles).toBeInstanceOf(Function);
        expect(SC.getStickyCellWidths).toBeInstanceOf(Function);
    });

    it('should export async and sync functions', () => {
        expect(SC.stickyColumn).toBeInstanceOf(Function);
        expect(SC.stickyColumn).toHaveProperty('sync');
        expect(SC.stickyColumn.sync).toBeInstanceOf(Function);
    });

    it('should be async', () => {
        // @ts-ignore
        const mock = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());

        const root = exampleDOM({ rows: 2, sticky: [0, 1] });
        SC.stickyColumn(root);

        expect(mock).toHaveBeenCalledTimes(1);
        mock.mockRestore();
    });
});
