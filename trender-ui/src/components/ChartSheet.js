import React, {Component} from 'react';
import AddNewChartForm from './AddNewChartForm';
import '../style/ChartSheet.css';
import '../style/AddNewChartForm.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {connect} from 'react-redux';
import {selectChart} from '../actions/selectChart';

class ChartSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      loaded: false,
      chartsInDatabase: [],
      selectedChartId: 0,
      selectedChart: {},
      options: {},
      edit: false
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
      showForm: false,
      edit: false
    });
  }

  arrangeChartSelection = (selectedChartId) => {
      this.props.selectChart(selectedChartId);
          this.setState({
            selectedChartId: selectedChartId,
          })
          let array = this.props.charts.filter(chart => chart.id == selectedChartId );
          const selectedChart = array[0];
          this.setState({
            selectedChart: selectedChart
          });
    }

  selectOneChart = (e) => {
    let selectedChartId = e.value;
    this.arrangeChartSelection(selectedChartId);
  }

  editableDetails = () => {
    let selectedChart = this.state.selectedChart;
    const editableDetails = {
      selectedChartId: selectedChart.id,
      selectedChartCreatedAt: selectedChart.createdAt,
      selectedChartTitle: selectedChart.title,
      selectedChartUnitName: selectedChart.unitName,
      selectedChartTarget: selectedChart.target,
      selectedChartDescription: selectedChart.description
    }
    return editableDetails;
  }

  setEditTrue = () => {
    this.setState({
      edit: true
    })
  }

  revealEditForm = () => {
    this.setEditTrue();
    this.revealForm();
  }

  refreshPage = () => {
    window.location.reload(false);
  }

  render() {
  console.log(this.state.edit);
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
          <AddNewChartForm
            hideForm={ this.hideForm }
            editableDetails={ this.state.edit == true ? this.editableDetails() : null }
            selectNewChart={ this.arrangeChartSelection }
            refreshPage= { this.refreshPage }
            />
          <button id="goToAddChartForm" onClick={ this.revealForm }>NEW CHART</button>
          { this.state.selectedChartId == 0 ? null : <button id="editChart" onClick={ this.revealEditForm }>EDIT CHART</button> }
          { this.state.chartsInDatabase.length ?
            <Select options={this.state.chartsInDatabase} onChange={this.selectOneChart} /> :
            null
          }
          <Select id="chartSelectionBox" options={this.state.options} onChange={this.selectOneChart.bind(this)} />
          <table id="chartsTable">
              <tr className="chartSpecsRow">
                <th className="chartSheetColumnLeft">CHART</th>
                <th className="chartSheetColumnRight"><div className='chartSheetElement' id='title'>{selectedChart.title}</div></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="chartSheetColumnLeft">UNIT</th>
                <th className="chartSheetColumnRight"><div className='chartSheetElement' id='unitName'>{selectedChart.unitName}</div></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="chartSheetColumnLeft">TARGET</th>
                <th className="chartSheetColumnRight"><div className='chartSheetElement' id='target'>{selectedChart.target}</div></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="chartSheetColumnLast">DESCRIPTION</th>
              </tr>
          </table>
          <div id="lastDiv">
            <div id='descriptionField'>{selectedChart.description}</div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectChartId: state.selectedChartId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChart: (id) => { dispatch(selectChart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSheet);