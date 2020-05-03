import {
    createGlobalStyles,
    addClassNamesToStickyCells,
    addInlineStylesToStickyCells,
    getStickyCellWidths,
} from './utils';

import { sticky } from './sticky';

export type Options = {
    /**
     * The selector of the table row element.
     * You can use any valid CSS selector. Avoid
     * generic selectors like `div`.
     */
    tr?: 'tr' | string;

    /**
     * The selector of the table head element.
     * You can use any valid CSS selector. Avoid
     * generic selectors like `div` or `section`.
     */
    thead?: 'thead' | string;

    /**
     * The selector of the tbody element.
     * You can use any valid CSS selector. Avoid
     * generic selectors like `div` or `section`.
     */
    tbody?: 'tbody' | string;

    /**
     * The selector of the table header cell element.
     * You can use any valid CSS selector. Avoid
     * generic selectors like `div`.
     */
    th?: 'th' | string;

    /**
     * The sticky class name. Defaults to `sticky`.
     */
    stickyClassName?: string;

    /**
     * Set the global style prefix and add
     * an internal stylesheet to `document.head`.
     */
    globalStylePrefix?: string;

    /**
     * Set true to let stick-column know you'll
     * add `globalStylePrefix` to the cells yourself.
     */
    selfAddClassName?: boolean;
};

export type CellWidths = Record<number | 'length', number>;

export const stickyColumn = (root: HTMLElement, options?: Options) => {
    let cleanup: Function;

    requestAnimationFrame(() => {
        cleanup = sticky(root, options).cleanup;
    });

    return { cleanup };
};

stickyColumn.sync = sticky;

export {
    createGlobalStyles,
    addClassNamesToStickyCells,
    addInlineStylesToStickyCells,
    getStickyCellWidths,
};
