import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Chart from 'chart.js';
import axios from 'axios';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
        isLoaded: false,
        items: [],
        reload: false
      };
  }

  handler = () => {
    this.setState({
      reload: !this.state.reload
    });
  }

  componentDidMount() {
    this.retrievedData();
  }

  retrievedData = () => {
    fetch('/api/measurement')
      .then(results => results.json())
      .then(json => {
      console.log(json)
        this.setState({
          isLoaded: true,
          items: json
          });
      });
  };

  onDeleteEntry = (id) => {
    axios.delete(`/api/measurement/${id}`)
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.retrievedData();
        }
      })
      .catch(error => {
        console.log(error)
      });
  }


  render() {
    let {
      isLoaded,
      items,
      reload
      } = this.state;

    if (!isLoaded) {
      return (<div> Loading... </div>)
    } else {
      return (
        <div className="Body">
          <table className="Grid">
            <tbody>
              <tr>
                <td>
                  <MainChart data={ this.state.items } />
                  <TableData data={ this.state.items } action={ this.onDeleteEntry }/>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={ this.printState }>Add</button>
        </div>
      );
    }
  }
}

export default Body;