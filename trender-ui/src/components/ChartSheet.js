import React, {Component} from 'react';
import AddNewChartForm from './AddNewChartForm';
import '../style/ChartSheet.css';
import '../style/AddNewChartForm.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

class ChartSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      loaded: false,
      chartsInDatabase: [],
      selectedChartId: 0,
      selectedChart: {},
      options: {}
    }
  }

  componentDidMount() {
    this.setLoaded(false);
    let charts = this.props;
    this.setState({
      chartsInDatabase: charts,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.createOptions(nextProps.charts);
    this.setLoaded(true);
  }

  setLoaded = (bool) => {
    this.setState({
      loaded: bool
    })
  }

  createOptions = (charts) => {
    let options = charts.map (chart => {
      return {
        value: chart.id,
        label: chart.title
      }
    });
    this.setState({
      options: options
    });

  }

  revealForm = () => {
    let form = document.getElementById('AddNewChartForm');
    form.style.display = "block";
    this.setState({
      showForm: true
    });
  }

  hideForm = () => {
    let form = document.getElementById('AddNewChartForm');
    form.style.display = "none";
    this.setState({
      showForm: false
    });
  }

  selectOneChart = (e) => {
    let selectedChartId = e.value;
    this.setState({
      selectedChartId: selectedChartId,
    })
    let array = this.props.charts.filter(chart => chart.id == e.value );
    const selectedChart = array[0];
    console.log('SELECTEDCHART', array)
    this.setState({
      selectedChart: selectedChart
    })
  }

  render() {
    if (this.state.loaded == false) {
      return(
        <div className='ChartSheet' >
          <p>Loading...</p>
        </div>
      )
    } else {
      let selectedChart = this.state.selectedChart;
      return(
        <div className='ChartSheet'>
          <AddNewChartForm />
          <button id='addChart' onClick={ this.revealForm }>NEW CHART</button>
          { this.state.chartsInDatabase.length ?
            <Select options={this.state.chartsInDatabase} onChange={this.selectOneChart} /> :
            null
          }
          <Select options={this.state.options} onChange={this.selectOneChart.bind(this)} />
          <div className='chartSheetElement' id='title'>{selectedChart.title}</div>
          <div className='chartSheetElement' id='unitName'>{selectedChart.unitName}</div>
          <div className='chartSheetElement' id='target'>{selectedChart.target}</div>
          <div className='chartSheetElement' id='description'>{selectedChart.description}</div>
        </div>
      )
    }
  }
}

export default ChartSheet;