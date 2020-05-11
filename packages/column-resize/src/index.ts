type Options = {
    /**
     * Pass in a custom selector that's used to find the table header.
     */
    th: 'th' | 'div' | string;

    /**
     * Set the direction to RTL.
     */
    rtl?: boolean;
};

export function columnResize(root: HTMLElement, options?: Options) {
    let startX: number;
    let startWidth: number;
    let handle: HTMLElement;
    let pressed = false;

    const opts = {
        th: 'th',
        ...options,
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (pressed && handle) {
            if (opts.rtl) {
                handle.style.width = `${startWidth - (e.pageX - startX)}px`;
            } else {
                handle.style.width = `${startWidth + (e.pageX - startX)}px`;
            }
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

        startX = e.pageX;
        handle = (e.target as HTMLElement).closest(opts.th);

        if (handle) {
            startWidth = handle.offsetWidth;
            root.classList.add('resizing');
        }
    };

    return {
        mousemove: handleMouseMove,
        mouseup: handleMouseUp,
        mousedown: handleMouseDown,
    };
}
