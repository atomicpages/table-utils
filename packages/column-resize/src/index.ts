type Options = {
    /**
     * Pass in a custom selector that's used to find the table header.
     */
    th: 'th' | 'div' | string;
};

export function columnResize(root: HTMLElement, options?: Options) {
    let startX: number;
    let startWidth: number;
    let handle: HTMLElement;
    let pressed = false;

    const opts = {
        tableHeaderCell: 'th',
        ...options,
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (pressed) {
            // @ts-ignore
            handle.width = startWidth + (e.pageX - startX);
        }
    };

    const handleMouseUp = () => {
        if (pressed) {
            pressed = false;
            root.classList.remove('resizing');
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        pressed = true;

        // @ts-ignore
        startX = event.pageX;
        handle = (e.target as HTMLElement).closest(opts.th);
        startWidth = handle.offsetWidth;
        root.classList.add('resizing');
    };

    return {
        mousemove: handleMouseMove,
        mouseup: handleMouseUp,
        mousedown: handleMouseDown,
    };
}
