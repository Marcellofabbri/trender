import React, {Component} from 'react';
import '../style/TableData.css';
import PostEntryForm from './PostEntryForm';

class TableData extends Component {

    render() {
      const { data } = this.props;
      var rows = data.map(row => {
        return(
          <tr className="row" id={ row.id }>
            <td>{ timestampStringConverter(row.createdAt) }</td>
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
                <tr>
                  <td><input type="text" ref={ this.timeInput } placeholder="Time"/></td>
                  <td><input type="text" ref={ this.valueInput } placeholder="Value"/></td>
                  <td><input type="text" ref={ this.unitInput } placeholder="Unit"/></td>
                  <td><button
                    id="send">
                    →
                    </button>
                  </td>
                </tr>
                <tr>
                  <PostEntryForm />
                </tr>
                { rows }
              </tbody>
            </table>
          </div>
        )
    }
}

export default TableData;

//  formats an OffsetDateTime type of string into a string with normal date with slashes
//  e.g. 2005-09-13T03:40:00Z   =>   13/09/2005
function timestampStringConverter(string) {
  return (
    string.substring(8,10) +
    '/' +
    string.substring(5,7) +
    '/' +
    string.substring(0,4)
  );
}