import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import '../style/MainChart.css';

class MainChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['London', 'Milan', 'Luxemburg City'],
                datasets: [
                    {
                        label: 'Population',
                        data: [9000000, 5000000, 300000],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    render() {
        return (
            <section className="MainChart">
                <Line
                    height = {null}
                    data = {this.state.chartData}
                    options = {{
                        aspectRatio: 1,
                        maintainAspectRatio: false,
                        responsive: true,
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