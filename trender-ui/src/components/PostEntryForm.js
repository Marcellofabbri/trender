import React, {Component, useState} from 'react';
import axios from 'axios';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class PostEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: '',
      value: '',
      unit: ''
    }
  }

  onChangeHandler = (e) => {
//    e.target.name == "createdAt" ?
//    this.setState({ [e.target.name]: (e.target.value) }) :
    this.setState({ [e.target.name]: e.target.value });
    console.log('E.TARGET.NAME', this.state);
  }

  onDayChangeHandler = (day) => {
    this.setState({ createdAt: day });
  }

  onSubmitHandler = e => {
    //e.preventDefault();
    axios.post('/api/measurement', this.state)
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
              <td><input type="text" name="unit" value={ unit } onChange={ this.onChangeHandler }/></td>
              <td><button type="submit">→</button></td>
            </tr>
        </table>
        </form>
      </div>
    )
  }
}

export default PostEntryForm;

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