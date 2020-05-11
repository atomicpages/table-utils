import * as React from 'react';
import { useTable, Cell } from './Table';

export const ColSpanTable = () => {
    const { ref } = useTable();

    return (
        <div className="wrapper">
            <table ref={ref}>
                <tr>
                    <th>Item / Desc.</th>
                    <th>Qty.</th>
                    <th>@</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>Paperclips (Box)</td>
                    <td>100</td>
                    <td>1.15</td>
                    <td>115.00</td>
                </tr>
                <tr>
                    <td>Paper (Case)</td>
                    <td>10</td>
                    <td>45.99</td>
                    <td>459.90</td>
                </tr>
                <tr>
                    <td>Wastepaper Baskets</td>
                    <td>2</td>
                    <td>17.99</td>
                    <td>35.98</td>
                </tr>
                <tr>
                    <th colspan="3">Subtotal</th>
                    <td>610.88</td>
                </tr>
                <tr>
                    <th colspan="2">Tax</th>
                    <td>7%</td>
                    <td>42.76</td>
                </tr>
                <tr>
                    <th colspan="3">Total</th>
                    <td>653.64</td>
                </tr>
            </table>
        </div>
    );
};
