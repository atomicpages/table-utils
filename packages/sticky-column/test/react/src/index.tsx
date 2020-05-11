import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Table, useTable } from './Table';

function App() {
    const table = useTable();
    const [state, setState]  = React.useState({
        base: true,
        colspan: false,
    });

    return (
        <>
            <section>
                <button></button>
            </section>
            <section>
                {state.base ? <Table {...table} /> : null}
            </section>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
