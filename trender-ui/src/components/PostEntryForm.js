import React, {Component, useState} from 'react';
import axios from 'axios';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux';
import '../style/PostEntryForm.css';

class PostEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: '',
      value: '',
      unit: this.props.unit,
      chartID: this.props.chartID
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDayChangeHandler = (day) => {
    this.setState({ createdAt: day });
  }

  onSubmitHandler = e => {
    let chosenDate = (this.state.createdAt).toJSON();
    let payload = {
      createdAt: chosenDate,
      value: this.state.value,
      unit: this.state.unit,
      chartID: this.props.chartID
    }
    axios.post('/api/measurement', payload)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { createdAt, value, unit } = this.state;
    return(
      <div className="PostEntryForm">
        <form onSubmit={ this.onSubmitHandler }>
          <table className="formRow">
            <tr>
              <td className="cell">
                <DayPickerInput
                id="datePicker"
                type="text"
                name="createdAt"
                value={ createdAt }
                onDayChange={ this.onDayChangeHandler }
                placeholder="Pick a date"
                format='dd/MM/yyyy'
                formatDate={ formatDate }
                />
              </td>
              <td className="cell"><input className="newRecordInput" type="number" name="value" value={ value } onChange={ this.onChangeHandler } min="-999999999" max="999999999"/></td>
              <td className="cell"><input className="newRecordInput" type="text" name="unit" value={ unit }/></td>
              <td className="cellButton"><button type="submit" id="send">►</button></td>
            </tr>
        </table>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chartID: state.main.selectedChartId
  }
}

export default connect(mapStateToProps, null)(PostEntryForm)

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}