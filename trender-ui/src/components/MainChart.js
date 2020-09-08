import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import '../style/MainChart.css';
import dateStraightener from '../helpers/dateStraightener';
import epochToDate from '../helpers/epochToDate';
import {connect} from 'react-redux';
import TypeOfView from './TypeOfView.js';
import getWeekNumber from '../helpers/getWeekNumber.js';
import noDataForThisWeekYet from '../no-data-for-this-week-yet.png';
import noDataForThisMonthYet from '../no-data-for-this-month-yet.png';
import getNumberOfDaysInMonth from '../helpers/getNumberOfDaysInMonth.js';
import getDateNumber from '../helpers/getDateNumber.js';

class MainChart extends Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.currentEpochSeconds = parseInt(this.currentDate.getTime()/1000);
    this.currentMonth = this.currentDate.getMonth();
    this.currentWeek = getWeekNumber(this.currentEpochSeconds)[1];
    this.currentYear = getWeekNumber(this.currentEpochSeconds)[0];
    this.state = {
      chartData: {
      },
      selectedChartId: props.selectedChart.id
    }
  }

  restrictDataAccordingToView(data) {
    let viewLapse = this.props.viewLapse;
    let restrictedData = data;
    let currentDate = new Date();
    let currentEpochSeconds = parseInt(currentDate.getTime()/1000);
    switch (true) {
      case viewLapse.viewAll:
        restrictedData = data;
      break;
      case viewLapse.viewMonthly:
        let currentMonth = currentDate.getMonth();
        restrictedData = data.filter(datum => new Date(datum.createdAt*1000).getMonth() == currentMonth);
      break;
      case viewLapse.viewWeekly:
        let currentYearAndWeek = getWeekNumber(currentEpochSeconds);
        let currentYear = currentYearAndWeek[0];
        let currentWeek = currentYearAndWeek[1];
        restrictedData = data.filter(datum => getWeekNumber(datum.createdAt)[0] == currentYear && getWeekNumber(datum.createdAt)[1] == currentWeek);
      break;
    }

    return restrictedData;
  }

  getChartData(data, selectedChart) {
    let target = selectedChart.target;
    data = data.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1 );
    let extrapolatedLabels = data.map(element => {
      return epochToDate(element.createdAt) });
    let extrapolatedLabel = data[0].unit;
    let extrapolatedData = data.map(element => {
      return element.value});
    let extrapolatedColors = data.map(element => {
      return element.value < target ? 'rgba(255, 99, 132, 0.6)' : 'rgba(77, 215, 81, 0.6)'
    });

    let chartData =
      {
        labels: extrapolatedLabels,
        datasets: [
          {
            label: extrapolatedLabel,
            data: extrapolatedData,
            backgroundColor: extrapolatedColors
          }
        ]
      }
    return chartData;
  }

  addEmptyRecords(restrictedData, viewLapse) {
    let allData = restrictedData;
    if (viewLapse.viewMonthly) {
      let numberOfDaysInMonth = getNumberOfDaysInMonth(this.currentMonth);
      let arrayMonth = [];
      for (let i = 1; i <= numberOfDaysInMonth; i++ ) { arrayMonth.push(i) } // e.g. [1, 2, 3 .... 31]

      for (let day in arrayMonth) {
        for (let datum in allData) {
          let createdAt = new Date(datum.createdAt*1000).getDate();
          if (createdAt != day) {
            let newDatum = { createdAt: new Date(this.currentYear, this.currentMonth, day),
                             unit: '',
                             value: 0,
                             target: ''};
            allData.push(newDatum);
          }
        }
      }
    }

    return allData;
  }

  render() {
    const { data, selectedChart, viewLapse, viewWhat } = this.props;
    var restrictedData = this.restrictDataAccordingToView(data);

    if (viewLapse.viewWeekly == true && restrictedData.length == 0) {
      return(
        <div className="NoChart"><img className="mainChartPlaceholders" src={ noDataForThisWeekYet } /></div>
      )
    } else if (viewLapse.viewMonthly == true && restrictedData.length == 0) {
      return(
        <div className="NoChart"><img className="mainChartPlaceholders" src={ noDataForThisMonthYet } /></div>
      )
    } else {
      //restrictedData = viewWhat.viewWholePeriod ? this.addEmptyRecords(restrictedData, viewLapse) : restrictedData;
      const chartData = this.getChartData(restrictedData, selectedChart);
      return (
        <section className="MainChart">
          <Bar
            width = { 800 }
            height = { 400 }
            data = {chartData}
            options = {{
              annotation: {
                annotations: [{
                  type: 'line',
                  mode: 'horizontal',
                  scaleID: 'y-axis-0',
                  value: selectedChart.target,
                  borderColor: 'rgb(255, 0, 0)',
                  borderWidth: 2,
                  label: {
                    enabled: false,
                    content: 'Test label'
                  }
                }]
              },
              aspectRatio: 1,
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              title: {
                display: true,
                text: 'THE CHART',
                fontSize: 25
                  },
                  legend: {
                    display: false,
                    position: 'right'
                  }
              }
            }
          />
        </section>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewLapse: state.viewLapse,
    viewWhat: state.viewWhat
  }
}

export default connect(mapStateToProps, null)(MainChart);