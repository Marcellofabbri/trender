import React, {Component} from 'react';
import AddNewChartForm from './AddNewChartForm';
import '../style/ChartSheet.css';
import '../style/AddNewChartForm.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {connect} from 'react-redux';
import {selectChart} from '../actions/selectChart';
import axios from 'axios';

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
    this.setState({
      selectedChart: nextProps.alreadySelectedChart,
      selectedChartId: nextProps.alreadySelectedChart.id
    })
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

  // after deleting a chart, automatically select select chart 0
  selectChartAfterDeletion = () => {
    this.props.selectChart(0);
  }

  editableDetails = () => {
    let selectedChart = this.state.selectedChart;
    const editableDetails = {
      selectedChartId: selectedChart.id,
      selectedChartCreatedAt: selectedChart.createdAt,
      selectedChartTitle: selectedChart.title,
      selectedChartUnitName: selectedChart.unitName,
      selectedChartTarget: selectedChart.target,
      selectedChartDescription: selectedChart.description,
      selectedChartUserID: selectedChart.userID
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

  wipeChart = async (chartID) => {
    axios.delete(`/api/measurements?chartID=${chartID}`)
      .then(response => console.log(response))
      .catch((err) => {
        console.log('ERROR WHEN WIPING DATA FROM CHART', err)
      });
  }

  deleteChartFromDatabase = async (id) => {
    axios.delete(`/api/charts/${id}`)
      .then(response => console.log(response))
      .catch((err) => {
        console.log('ERROR WHEN DELETING CHARTS FROM DATABASE', err)
      });
  }

  deleteChart = async (id) => {
    await this.wipeChart(id);
    await this.deleteChartFromDatabase(id);
    this.selectChartAfterDeletion();
    this.refreshPage();
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
      let selectedChartId = this.props.selectedChartId;
      let userID = this.props.userID
      return(
        <div className='ChartSheet'>
          <AddNewChartForm
            hideForm={ this.hideForm }
            editableDetails={ this.state.edit == true ? this.editableDetails() : null }
            selectNewChart={ this.arrangeChartSelection }
            refreshPage= { this.refreshPage }
            userID={ userID }
            />
          <button id="goToAddChartForm" onClick={ this.revealForm }>NEW CHART</button>
          { this.props.selectedChartId == 0 ?
            null :
            <div id="editDeleteButtonsDiv">
            <button id="editChart" onClick={ this.revealEditForm }>EDIT CHART</button>
            <button id="deleteChart" onClick={() => { if (window.confirm('Are you sure you wish to delete this chart and its data?')) this.deleteChart(selectedChartId) }}>×</button>
            </div>
          }
          { this.state.chartsInDatabase.length ?
            <Select value={ selectedChart.title } options={this.state.chartsInDatabase} onChange={this.selectOneChart} /> :
            null
          }
          <Select id="chartSelectionBox" defaultValue={{ label: this.props.alreadySelectedChart.title, value: selectedChartId }} options={this.state.options} onChange={this.selectOneChart.bind(this)} />
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
    selectedChartId: state.main.selectedChartId,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChart: (id) => { dispatch(selectChart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSheet);