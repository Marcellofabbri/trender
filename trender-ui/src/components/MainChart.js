import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import '../style/MainChart.css';

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
      return element.createdAt});
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

  componentWillMount() {
    this.getChartData(this.props.data);
  }

  render() {
    const { data } = this.props;
      return (
        <section className="MainChart">
          <Bar
            width = { 1000 }
              height = { 500 }
              data = { this.state.chartData }
              options = {{
                aspectRatio: 1.5,
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