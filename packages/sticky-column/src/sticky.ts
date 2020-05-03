import { Options } from '.';

import {
    getStickyCellWidths,
    createGlobalStyles,
    addClassNamesToStickyCells,
    addInlineStylesToStickyCells,
} from './utils';

const normalizeOpts = (options: Options) => {
    if (options.stickyClassName.charAt(0) === '.') {
        options.stickyClassName = options.stickyClassName.slice(1);
    }

    return options;
};

export const sticky = (root: HTMLElement, options?: Options) => {
    const opts = normalizeOpts({
        tr: 'tr',
        thead: 'thead',
        th: 'th',
        stickyClassName: 'sticky',
        ...options,
    });

    let sheet: HTMLStyleElement;
    const stickyCellWidths = getStickyCellWidths(root, opts);

    const cleanup = () => {
        if (opts.globalStylePrefix && sheet) {
            sheet.remove();
        }
    };

    if (opts.globalStylePrefix) {
        sheet = createGlobalStyles(stickyCellWidths, opts);
        addClassNamesToStickyCells(root, opts);
    } else {
        addInlineStylesToStickyCells(root, opts, stickyCellWidths);
    }

    return { cleanup };
};
