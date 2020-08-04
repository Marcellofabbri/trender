import React, {Component} from 'react';
import '../style/TableData.css';

class TableData extends Component {

    highlight() {

    }

    render() {
        return(
            <div className="TableData">
                <table>
                  <tr>
                    <th>Timestamp</th>
                    <th>Value</th>
                    <th>Unit</th>
                  </tr>
                  <tr>
                    <td>2006</td>
                    <td>95</td>
                    <td>grams</td>
                  </tr>
                </table>
            </div>
        )
    }
}

export default TableData;