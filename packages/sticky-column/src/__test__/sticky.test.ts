import { sticky } from '../sticky';
import { exampleDOM } from './testUtils';

describe('sticky tests', () => {
    it('should run without errors', () => {
        const root = exampleDOM({ sticky: [0, 1], rows: 2 });

        expect(() => {
            sticky(root);
        }).not.toThrow();
    });

    it('should tolerate . in the stickyClassName', () => {
        const root = exampleDOM({ sticky: [0, 1], rows: 2 });
        sticky(root, { stickyClassName: '.sticky' });
        expect(root).toMatchSnapshot();
    });

    it('should remove internal styles when cleanup is called', () => {
        const root = exampleDOM({ sticky: [0, 1], rows: 2 });
        const { cleanup } = sticky(root, { globalStylePrefix: 'scl' });

        expect(document.head.querySelector('style')).not.toBeNull();
        cleanup();
        expect(document.head.querySelector('style')).toBeNull();
    });

    it('should not throw if cleanup is run', () => {
        const root = exampleDOM({ sticky: [0, 1], rows: 2 });
        const { cleanup } = sticky(root);

        expect(() => {
            cleanup();
        }).not.toThrow();
    });
});
