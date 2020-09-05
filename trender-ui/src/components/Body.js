import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Specs from './Specs.js';
import Chart from 'chart.js';
import ChartSheet from './ChartSheet.js'
import axios from 'axios';
import {retrieveData} from '../actions/retrieveData';
import {retrieveCharts} from '../actions/retrieveCharts';
import {connect} from 'react-redux';
import emptyChartImage from '../empty-chart.png';
import selectChartImage from '../select-chart.png';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
        isLoaded: false,
        //items: [],
        reload: false,
        selectedChartTarget: 0
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

  componentWillReceiveProps(nextProps) {
    console.log('NEXTPROPS', nextProps)
    const charts = nextProps.charts;
    const selectedChartId = nextProps.selectedChartId;
    const chosenCharts = charts.filter(chart => chart.id == selectedChartId);
    const target = chosenCharts.length > 0 ? chosenCharts[0].target : '0';
    this.setState({
      selectedChartTarget: target
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

  filterBySelectedId = (items, id) => {
    let filteredItems = items.filter(item => item.chartID == id)
    return filteredItems;
  }



  render() {
    const { items, charts, selectedChartId, selectedChartUnit } = this.props;
    const sortedItems = items.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
    const filteredItems = this.filterBySelectedId(sortedItems, selectedChartId);
    const reversedItems = filteredItems.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
    const unit = filteredItems.length > 0 ? filteredItems[0].unit : '';
    const selectedChart = charts.length > 0 ? (charts.filter(chart => chart.id == selectedChartId))[0] : '';

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
                  {
                    filteredItems.length > 0 ?
                    <MainChart data={ filteredItems } selectedChart={ selectedChart }  /> :
                    filteredItems.length == 0 && selectedChartId == 0 ?
                    <div className="NoChart"><img className="mainChartPlaceholders" src={ selectChartImage } /></div> :
                    <div className="NoChart"><img className="mainChartPlaceholders" src={ emptyChartImage } /></div>
                  }
                </td>
                <td>
                  <ChartSheet charts={ charts } alreadySelectedChart={ selectedChart } />
                </td>
              </tr>
              <tr>
                <td>
                  {
                  filteredItems.length > 0 ?
                  <TableData data={ reversedItems } action={ this.onDeleteEntry } unit={ unit } /> :
                  filteredItems.length == 0 && selectedChartId == 0 ?
                  <TableData className="NoTableData"/> :
                  <TableData data={[]} action={ this.onDeleteEntry } unit={ selectedChart.unitName } />
                  }
                </td>
                <td>
                  {
                  filteredItems.length > 0 ?
                  <Specs data={ reversedItems } /> :
                  <Specs className="NoSpecs" data={[]}/>
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={ () => console.log(this.props.reducer) } >REDUX</button>
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

