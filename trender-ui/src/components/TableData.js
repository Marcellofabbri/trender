import React, {Component} from 'react';
import axios from 'axios';
import '../style/TableData.css';
import PostEntryForm from './PostEntryForm';
import epochToDate from '../helpers/epochToDate';

class TableData extends Component {
  state = {
    showForm: false
  }

  revealForm = () => {
    this.setState({
      showForm: true
    });
  }

  hideForm = () => {
    this.setState({
      showForm: false
    });
  }

  render() {
    const { data, action, unit } = this.props;
    if (typeof data == 'undefined') {
      return(
        <div>Select chart</div>
      )
    } else {
      var rows = data.map(row => {
        var rowId = row.id;
        return(
          <tr className="row" key={ row.id }>
            <td className="cell">{ epochToDate(row.createdAt) }</td>
            <td className="cell">{ row.value }</td>
            <td className="cell">{ row.unit }</td>
            <td className="buttonCell"><button
              id="minus"
              name={ row.id }
              onClick={ () => action(rowId) }
              >
              ꟷ
              </button>
              </td>
         </tr>
          )
        })
        return(
          <div className="TableData">
            { this.state.showForm ? <PostEntryForm className="postEntryForm" unit={ unit }/> : null }
            <table className="tabledata">
              <thead>
                <tr>
                  <th className="cell">Timestamp</th>
                  <th className="cell">Value</th>
                  <th className="cell">Unit</th>
                  <th className="buttonCell"><button id="plus" onClick={ this.state.showForm ? this.hideForm : this.revealForm }>{ this.state.showForm ? "×" : "+"}</button></th>
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