import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/Body.css';
import MainChart from './MainChart.js';
import TableData from './TableData.js';
import Chart from 'chart.js';

class Body extends Component {

    state = {
        isLoaded: false,
        items: [],
        };

    componentDidMount() {
        setInterval(this.hello, 250);
    }


    hello = () => {
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
                    <tr>
                        <td>
                            <MainChart />
                            <TableData />
                        </td>
                    </tr>
                </table>
                <button>Add</button>

                <header className="App-header">
                    <h1 className="App-title">{this.state.items[0].value}</h1>
                    <h2 className="App-subtitle">{this.state.items[0].unit}</h2>
                </header>
            </div>
        );
        }
    }
}

export default Body;