import { h, Component } from 'preact';
import { Table } from '@table-utils/jsx-table';

debugger;

export class App extends Component {
    render() {
        return (
            <Table>
                <Table.Head>
                    <Table.HeadRow>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Age</Table.HeadCell>
                    </Table.HeadRow>
                </Table.Head>
            </Table>
        );
    }
}
