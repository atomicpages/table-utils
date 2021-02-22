import * as React from 'react';
import { create, ReactTestRendererJSON, ReactTestRenderer } from 'react-test-renderer';

export const generateBasicTests = (name: string, jsx: any, el: string, role: string): void => {
    const components: ReactTestRenderer[] = [];

    const render = (node: any): ReactTestRenderer => {
        const component = create(node);
        components.push(component);

        return component;
    };

    afterAll(() => {
        components.forEach(c => c.unmount());
    });

    it(`should render a basic ${name}`, () => {
        const component = render(React.createElement(jsx));
        const json = component.toJSON() as ReactTestRendererJSON;

        expect(json.type).toEqual(el);
        expect(json.props.role).toBeUndefined();

        component.unmount();
    });

    it('should render as a div with ARIA roles', () => {
        const component = render(React.createElement(jsx, { as: 'div' }));
        const json = component.toJSON() as ReactTestRendererJSON;

        expect(json.type).toEqual('div');
        expect(json.props.role).toEqual(role);

        component.unmount();
    });

    it('should support prop overriding', () => {
        const component = render(React.createElement(jsx, { as: 'div', role: 'complementary' }));
        const json = component.toJSON() as ReactTestRendererJSON;

        expect(json.props.role).toEqual('complementary');

        component.unmount();
    });

    it('should spread props to JSX', () => {
        const component = render(
            React.createElement(jsx, { 'data-testid': 'demo', className: 'fancy-table' })
        );

        const json = component.toJSON() as ReactTestRendererJSON;

        expect(json.props['data-testid']).toEqual('demo');
        expect(json.props.className).toEqual('fancy-table');

        component.unmount();
    });
};
