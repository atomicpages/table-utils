function generate(rows: number, sticky: number[]) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');

        tr.innerHTML = `<td class="${sticky.includes(0) ? 'sticky' : ''}">John Doe</td>
            <td class="${sticky.includes(1) ? 'sticky' : ''}">42</td>
            <td class="${sticky.includes(2) ? 'sticky' : ''}">Male</td>
            <td class="${sticky.includes(3) ? 'sticky' : ''}>000-000-0000</td>
            <td>johndoe@foo.com</td>
            <td>123 Sleepytime Ln.</td>
            <td>San Francisco</td>
            <td>California</td>
            <td>12345</td>`;

        fragment.appendChild(tr);
    }

    return fragment;
}

export function exampleDOM({ rows = 10, sticky = [] }: { rows?: number; sticky?: number[] } = {}) {
    const root = document.createElement('div');
    const table = document.createElement('table');

    table.innerHTML = `<thead>
    <tr>
        <th class="${sticky.includes(0) ? 'sticky' : ''}">Name</th>
        <th class="${sticky.includes(1) ? 'sticky' : ''}">Age</th>
        <th class="${sticky.includes(2) ? 'sticky' : ''}">Gender</th>
        <th class="${sticky.includes(3) ? 'sticky' : ''}">Phone Number</th>
        <th>Email Address</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
    </tr>
</thead>
<tbody></tbody>`;

    table.appendChild(generate(rows, sticky));
    root.appendChild(table);

    return root;
}

export function mockHTMLProperty(property: keyof HTMLElement, ret: (...args: any[]) => unknown) {
    const mock = jest.fn(ret);

    Object.defineProperty(window.HTMLElement.prototype, property, {
        get: mock,
    });

    const reset = () => {
        mock.mockRestore();
    };

    return { mock, reset };
}
