import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import '../style/MainChart.css';
import dateStraightener from '../helpers/dateStraightener';
import epochToDate from '../helpers/epochToDate';

class MainChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
      },
      selectedChartId: props.selectedChartId
    }
  }

  getChartData(data) {
    let target = this.props.target;
    let extrapolatedLabels = data.map(element => {
      return epochToDate(element.createdAt) });
    let extrapolatedLabel = data[0].unit;
    let extrapolatedData = data.map(element => {
      return element.value});
    let extrapolatedColors = data.map(element => {
      return element.value < target ? 'rgba(255, 99, 132, 0.6)' : 'rgba(77, 215, 81, 0.6)'
    });

    this.setState({
      chartData: {
        labels: extrapolatedLabels,
        datasets: [
          {
            label: extrapolatedLabel,
            data: extrapolatedData,
            backgroundColor: extrapolatedColors
          }
        ]
      }
    })
  }

  componentDidMount() {
    this.getChartData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
      this.getChartData(nextProps.data)
  }

  render() {
    const { data, selectedChartId, target } = this.props;
      return (
        <section className="MainChart">
          <Bar
            width = { 800 }
            height = { 400 }
            data = { this.state.chartData }
            options = {{
              annotation: {
                annotations: [{
                  type: 'line',
                  mode: 'horizontal',
                  scaleID: 'y-axis-0',
                  value: target,
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