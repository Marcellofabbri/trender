import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Chart from 'chart.js';
import ChartSheet from './ChartSheet.js'
import axios from 'axios';
import {retrieveData} from '../actions/retrieveData';
import {retrieveCharts} from '../actions/retrieveCharts';
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
    this.props.retrieveCharts();
    this.setState({
      isLoaded: true
    })
  }

  onDeleteEntry = (id) => {
    axios.delete(`/api/measurement/${id}`)
      .then(response => {
        if (response.status == 200) {
          this.retrievedData();
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  filterBySelectedId = (id) => {
    console.log('FILTERBYSELECTEDID', this.props)
  }

  render() {
  this.filterBySelectedId(0);
  const { items, charts, selectedChartId } = this.props;
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
                </td>
                <td>
                  <ChartSheet charts={ charts }/>
                </td>
              </tr>
              <tr>
                <td>
                  <TableData data={ items } action={ this.onDeleteEntry } />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items,
    charts: state.charts,
    selectedChartId: state.selectedChartId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveData: () => { dispatch(retrieveData()) },
    retrieveCharts: () => { dispatch(retrieveCharts()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)

