import React, {Component} from 'react';
import '../style/TableData.css';

class TableData extends Component {

    timestampFormatter(string) {
        return (
            string.substring(8,10) +
            '/' +
            string.substring(5,7) +
            '/' +
            string.substring(0,4)
        )
    }

    render() {
        const { data } = this.props;
        var rows = data.map(row => {
            return(
                <tr className="row" id={ row.id }>
                    <td>{ this.timestampFormatter(row.createdAt) }</td>
                    <td>{ row.value }</td>
                    <td>{ row.unit }</td>
                    <td><button id="minusplus">‒</button></td>
                </tr>
            )
        })
        return(
            <div className="TableData">
                <table>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Value</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    { rows }
                  </tbody>
                </table>
            </div>
        )
    }
}

export default TableData;