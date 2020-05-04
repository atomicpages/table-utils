import {
    createGlobalStyles,
    getStickyCellWidths,
    addInlineStylesToStickyCells,
    addClassNamesToStickyCells,
} from '../utils';

import { exampleDOM, mockHTMLProperty } from './testUtils';

describe('utils tests', () => {
    describe('createGlobalStyles tests', () => {
        it('should inject global styles into document.head', () => {
            const sheet = createGlobalStyles(
                { 0: 0, 1: 87, length: 2 },
                { globalStylePrefix: 'scl' }
            );

            expect(sheet).toBeInstanceOf(HTMLStyleElement);
            expect(sheet.innerHTML).toMatchInlineSnapshot(`
                ".scl0 { left: 0px; }
                .scl1 { left: 87px; }
                "
            `);

            expect(document.head.querySelector('style')).toEqual(sheet);
        });
    });

    describe('getStickyCellWidths tests', () => {
        const opts = {
            thead: 'thead',
            th: 'th',
            stickyClassName: 'sticky',
        };

        it('should call an expected number of times', () => {
            const { mock, reset } = mockHTMLProperty('offsetWidth', () => 0);
            const root = exampleDOM({ sticky: [0, 1] });

            getStickyCellWidths(root, opts);
            expect(mock).toHaveBeenCalledTimes(2);
            reset();
        });
    });

    describe('addInlineStylesToStickyCells tests', () => {
        const opts = { stickyClassName: 'sticky' };

        it('should apply inline styles', () => {
            const root = exampleDOM({ rows: 2, sticky: [0, 1] });
            addInlineStylesToStickyCells(root, opts, { 0: 0, 1: 97, length: 2 });

            const cells = Array.from(
                root.querySelectorAll(`.${opts.stickyClassName}`)
            ) as HTMLTableCellElement[];

            expect(
                cells.every(cell => {
                    if (cell.cellIndex % 2 !== 0) {
                        return cell.style.left === '97px';
                    }

                    return cell.style.left === '0px';
                })
            ).toBe(true);
        });

        it("should skip inline styles when there's a single sticky col", () => {
            const root = exampleDOM({ sticky: [0] });
            addInlineStylesToStickyCells(root, opts, { 0: 0, length: 1 });

            const cells = root.querySelectorAll(`.${opts.stickyClassName}`);
            expect((cells[0] as HTMLElement).style.left).toBe('');
        });
    });

    describe('addClassNamesToStickyCells tests', () => {
        const opts = {
            stickyClassName: 'sticky',
            globalStylePrefix: 'scl',
        };

        it('should add classNames to sticky cells', () => {
            const root = exampleDOM({ rows: 2, sticky: [0, 1] });
            addClassNamesToStickyCells(root, opts);

            const cells = Array.from(root.querySelectorAll('.sticky')) as HTMLTableCellElement[];

            expect(
                cells.every(cell => {
                    if (cell.cellIndex % 2 !== 0) {
                        return cell.classList.contains('scl1');
                    }

                    return cell.classList.contains('scl0');
                })
            ).toBe(true);
        });

        it('should not add duplicate classNames', () => {
            const re = new RegExp(opts.globalStylePrefix, 'g');
            const root = exampleDOM({ rows: 2, sticky: [0, 1] });

            root.querySelector('td.sticky').classList.add('scl0');
            addClassNamesToStickyCells(root, opts);

            const cells = Array.from(root.querySelectorAll('.sticky')) as HTMLTableCellElement[];
            expect(cells.every(cell => cell.className.match(re).length === 1)).toBe(true);
        });

        it('should not add classNames when selfAddClassName is used', () => {
            const re = new RegExp(opts.globalStylePrefix, 'g');
            const root = exampleDOM({ rows: 2, sticky: [0, 1] });

            addClassNamesToStickyCells(root, {
                ...opts,
                selfAddClassName: true,
            });

            const cells = Array.from(root.querySelectorAll('.sticky')) as HTMLTableCellElement[];
            expect(cells.every(cell => !cell.className.match(re))).toBe(true);
        });
    });
});
