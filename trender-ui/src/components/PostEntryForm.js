import React, {Component} from 'react';
import axios from 'axios';

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
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = e => {
    e.preventDefault();
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
          <input type="text" name="createdAt" value={ createdAt } onChange={ this.onChangeHandler }/>
          <input type="text" name="value" value={ value } onChange={ this.onChangeHandler }/>
          <input type="text" name="unit" value={ unit } onChange={ this.onChangeHandler }/>
          <button type="submit">→</button>
        </form>
      </div>
    )
  }
}

export default PostEntryForm;