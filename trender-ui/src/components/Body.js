import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Chart from 'chart.js';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  state = {
    isLoaded: false,
    items: [],
    reload: false
  };

  handler() {
    this.setState({
      reload: true
    })
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

  render() {
    let {
      isLoaded,
      items
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
                  <MainChart />
                  <TableData data={ this.state.items } action={ this.handler }/>
                </td>
              </tr>
            </tbody>
          </table>
          <button>Add</button>
        </div>
      );
    }
  }
}

export default Body;