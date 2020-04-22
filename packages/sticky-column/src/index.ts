export type Options = {
    /**
     * The selector of the table row element.
     * You can use any valid CSS selector.
     */
    tr?: 'tr' | 'div' | string;

    /**
     * The selector of the table head element.
     * You can use any valid CSS selector.
     */
    thead?: 'thead' | 'div' | 'section' | string;

    /**
     * The selector of the table header cell element.
     * You can use any valid CSS selector.
     */
    th?: 'th' | 'div' | string;

    /**
     * The sticky class name. Defaults to `pinned`
     */
    stickyClassName?: string;

    /**
     * Break on the first cell that doesn't contain
     * `options.stickyClassName`.
     */
    contiguous?: boolean;
};

const tableWalker = (
    root: HTMLElement,
    opts: Options,
    cb: (child: HTMLElement, i: number) => void
) => {
    const tr = root.querySelectorAll(opts.tr);
    let children: HTMLCollection;
    let child: HTMLElement;

    for (let i = 0; i < tr.length; i++) {
        children = tr[i].children;

        for (let j = 0; j < children.length; j++) {
            child = children[j] as HTMLElement;

            if (child.className.indexOf(opts.stickyClassName) !== -1 || !opts.contiguous) {
                cb(child, j);
            } else {
                break;
            }
        }
    }
};

const getStickyCellWidths = (root: HTMLElement, opts: Options) => {
    const widths: Record<number, number> = { 0: 0 };
    let left = 0;

    tableWalker(root, opts, (child, j) => {
        if (widths[j + 1] === undefined) {
            left += child.offsetWidth;
            widths[j + 1] = left;
        }
    });

    return widths;
};

const setStyles = (root: HTMLElement, opts: Options, widths: Record<number, number>) => {
    tableWalker(root, opts, (child, j) => {
        if (widths[j] !== undefined) {
            child.style.left = `${widths[j]}px`;
        }
    });
};

export const stickyColumn = (root: HTMLElement, options?: Options) => {
    const opts = {
        tr: 'tr',
        thead: 'thead',
        th: 'th',
        stickyClassName: 'pinned',
        contiguous: true,
        ...options,
    };

    let stickyCellWidths: Record<number, number>;

    requestAnimationFrame(() => {
        stickyCellWidths = getStickyCellWidths(root, opts);
    });

    requestAnimationFrame(() => {
        setStyles(root, opts, stickyCellWidths);
    });
};
