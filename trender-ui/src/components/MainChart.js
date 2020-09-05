import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import '../style/MainChart.css';
import dateStraightener from '../helpers/dateStraightener';
import epochToDate from '../helpers/epochToDate';
import {connect} from 'react-redux';
import TypeOfView from './TypeOfView.js';

class MainChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
      },
      selectedChartId: props.selectedChart.id
    }
  }

  getChartData(data, selectedChart) {
    let target = selectedChart.target;
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

  render() {
    const { data, selectedChart} = this.props;
    const chartData = this.getChartData(data, selectedChart);
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

export default MainChart;