import React, {Component, useState} from 'react';
import axios from 'axios';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux';

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
    console.log('PROPS POSTENTRYFORM', this.props)
    const { createdAt, value, unit } = this.state;
    return(
      <div className="PostEntryForm">
        <form onSubmit={ this.onSubmitHandler }>
          <table>
            <tr>
              <td>
                <DayPickerInput
                type="text"
                name="createdAt"
                value={ createdAt }
                onDayChange={ this.onDayChangeHandler }
                placeholder="Insert date"
                format='dd/MM/yyyy'
                formatDate={ formatDate }
                />
              </td>
              <td><input type="text" name="value" value={ value } onChange={ this.onChangeHandler }/></td>
              <td><input type="text" name="unit" value={ unit }/></td>
              <td><button type="submit">→</button></td>
            </tr>
        </table>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chartID: state.selectedChartId
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