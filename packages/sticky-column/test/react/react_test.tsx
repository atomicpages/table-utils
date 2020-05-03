(function (React, ReactDOM, classNames, StickyColumn) {
    type Props = {
        rows?: number;
        sticky?: number[];
        preload?: boolean;
    };

    const data = {
        name: 'John Doe',
        age: 42,
        gender: 'Male',
        phone: '000-000-0000',
        email: 'johndoe@foo.com',
        address: '123 Sleepytime Ln.',
        city: 'San Francisco',
        state: 'California',
        zip: 12345,
    };

    const rowRenderer = (n: number, clsNames: string[]) => {
        const rows = [];

        for (let i = 0; i < n; i++) {
            rows.push(
                <tr key={i}>
                    <td className={clsNames[0]}>{data.name}</td>
                    <td className={clsNames[1]}>{data.age}</td>
                    <td className={clsNames[2]}>{data.gender}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.city}</td>
                    <td>{data.state}</td>
                    <td>{data.zip}</td>
                </tr>
            );
        }

        return rows;
    };

    function App({ rows = 100, sticky = [], preload }: Props) {
        const clsNames = [
            classNames({
                sticky: sticky.includes(0),
                scl0: preload,
            }),
            classNames({
                sticky: sticky.includes(1),
                scl1: preload,
            }),
            classNames({
                sticky: sticky.includes(2),
                scl2: preload,
            }),
        ];

        const ref = React.useRef();

        React.useLayoutEffect(() => {
            const { cleanup } = StickyColumn.stickyColumn(ref.current, {
                globalStylePrefix: 'scl',
                selfAddClassName: true,
            });

            return () => {
                cleanup();
            };
        }, []);

        return (
            <div className="wrapper">
                <table ref={ref}>
                    <thead>
                        <tr>
                            <th className={clsNames[0]}>Name</th>
                            <th className={clsNames[1]}>Age</th>
                            <th className={clsNames[2]}>Gender</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                        </tr>
                    </thead>
                    <tbody>{rowRenderer(rows, clsNames)}</tbody>
                </table>
            </div>
        );
    }

    ReactDOM.render(<App rows={10000} sticky={[0, 1]} preload />, document.getElementById('root'));
})(
    (window as any).React,
    (window as any).ReactDOM,
    (window as any).classNames,
    (window as any).StickyColumn
);
