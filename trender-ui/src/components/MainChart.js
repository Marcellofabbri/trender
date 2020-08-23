import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import '../style/MainChart.css';
import dateStraightener from '../helpers/dateStraightener';

class MainChart extends Component {
  constructor({data}) {
    super({data});
    this.state = {
      chartData: {
      }
    }
  }

  getChartData(data) {
    let extrapolatedLabels = data.map(element => {
      return element.createdAt.substring(0,10) });
    let extrapolatedLabel = data[0].unit;
    let extrapolatedData = data.map(element => {
      return element.value});

    this.setState({
      chartData: {
        labels: extrapolatedLabels,
        datasets: [
          {
            label: extrapolatedLabel,
            data: extrapolatedData,
            backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
            ]
          }
        ]
      }
    })
  }

  componentDidMount() {
    this.getChartData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.getChartData(nextProps.data);
  }

  render() {
    const { data } = this.props;
      return (
        <section className="MainChart">
          <Bar
            width = { 800 }
              height = { 400 }
              data = { this.state.chartData }
              options = {{
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
                      display: true,
                      position: 'right'
                    }
                  }}
          />
        </section>
      )
  }
}

export default MainChart;