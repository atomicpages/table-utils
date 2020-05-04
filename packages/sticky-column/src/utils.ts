import { CellWidths, Options } from './index';

/**
 * Create and inject global styles into `document.head`
 * @param widths The map of cell widths.
 * @param options
 */
export const createGlobalStyles = (widths: CellWidths, options: Options) => {
    const style = document.createElement('style');

    style.type = 'text/css';
    document.head.appendChild(style);

    let innerHTML = '';

    for (let i = 0; i < widths.length; i++) {
        innerHTML += `.${options.globalStylePrefix}${i} { left: ${widths[i]}px; }\n`;
    }

    style.innerHTML = innerHTML;

    return style;
};

export const addClassNamesToStickyCells = (root: HTMLElement, options: Options) => {
    if (!options.selfAddClassName) {
        const stickyCells = root.querySelectorAll(`.${options.stickyClassName}`);

        const len = stickyCells.length;
        let cell: HTMLTableCellElement;

        for (let i = 0; i < len; i++) {
            cell = stickyCells[i] as HTMLTableCellElement;

            if (cell.className.indexOf(options.globalStylePrefix) === -1) {
                cell.className += ` ${options.globalStylePrefix}${cell.cellIndex}`;
            }
        }
    }
};

export const addInlineStylesToStickyCells = (
    root: HTMLElement,
    options: Options,
    widths: CellWidths
) => {
    if (widths.length > 1) {
        // TODO: make it work with `div` tables too
        const stickyCells = root.querySelectorAll(`.${options.stickyClassName}`);

        const len = stickyCells.length;
        let cell: HTMLTableCellElement;

        for (let i = 0; i < len; i++) {
            cell = stickyCells[i] as HTMLTableCellElement;
            cell.style.left = `${widths[cell.cellIndex]}px`;
        }
    }
};

export const getStickyCellWidths = (root: HTMLElement, opts: Options): CellWidths => {
    const widths: CellWidths = { 0: 0, length: 1 };
    let left = 0;

    const th = root.querySelectorAll(`${opts.thead} ${opts.th}`);

    let child: HTMLElement;

    for (let i = 0; i < th.length; i++) {
        child = th[i] as HTMLElement;

        if (child.className.indexOf(opts.stickyClassName) !== -1) {
            left += child.offsetWidth;
            widths[i + 1] = left;
            widths.length++;
        } else {
            break;
        }
    }

    return widths;
};
