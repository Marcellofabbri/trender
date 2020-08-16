import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Chart from 'chart.js';
import axios from 'axios';
import {retrieveData} from '../actions/retrieveData';
import {connect} from 'react-redux';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
        isLoaded: false,
        //items: [],
        reload: false
      };
  }

  handler = () => {
    this.setState({
      reload: !this.state.reload
    });
  }

  componentDidMount() {
    this.props.retrieveData();
    this.setState({
      isLoaded: true
    })
  }

  retrievedData = () => {
//    fetch('/api/measurement')
//      .then(results => results.json())
//      .then(json => {
//      console.log(json)
//        this.setState({
//          isLoaded: true,
//          items: json
//          });
//      });
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
  const { items } = this.props;
  console.log('BODYS PROPS', items);
    let {
      isLoaded,
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
                  <MainChart data={ items } />
                  <TableData data={ items } action={ this.onDeleteEntry } />
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

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveData: () => { dispatch(retrieveData()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)

