import React, {Component} from 'react';
import '../style/AddNewChartForm.css';
import axios from 'axios';

class AddNewChartForm extends Component {
  state = {
    id: 0,
    createdAt: '',
    title: '',
    unitName: '',
    description: '',
    target: null,
    userID: null
  }

  componentWillReceiveProps(nextProps) {
    let editableDetails = nextProps.editableDetails;
    if (editableDetails != null) {
      this.setState({
        id: editableDetails.selectedChartId,
        createdAt: editableDetails.selectedChartCreatedAt,
        title: editableDetails.selectedChartTitle,
        unitName: editableDetails.selectedChartUnitName,
        description: editableDetails.selectedChartDescription,
        target: editableDetails.selectedChartTarget,
        userID: editableDetails.selectedChartUserID
      });
    }
  }

  hideFormAndWipeState = () => {
    this.setState({
      id: 0,
      createdAt: '',
      title: '',
      unitName: '',
      description: '',
      target: null,
      userID: null
    })
    this.props.hideForm();
  }

  postChart = () => {
    let chosenDate = (new Date()).toJSON();
    let payload = {
      createdAt: chosenDate,
      title: this.state.title,
      unitName: this.state.unitName,
      target: Math.round(this.state.target),
      description: this.state.description,
      userID: this.props.userID
    }
    axios.post('/api/charts', payload)
      .then(response => {
        console.log('RESPONSE', response);
        this.props.refreshPage();
      }).
      then(response => {
        console.log('R', response);
        this.props.selectNewChart(response.data.id);
      })
      .then(this.props.selectNewChart(0))
      .catch(error => {
        console.log(error)
      })
  }

  updateChart = (updatingId) => {
    let payload = {
      createdAt: new Date(this.state.createdAt).toJSON(),
      title: this.state.title,
      unitName: this.state.unitName,
      target: this.state.target,
      description: this.state.description,
      userID: this.props.userID
    }
    console.log(updatingId, payload)
    axios.put("/api/charts/" + updatingId, payload)
      .then(response => {
        console.log('RESPONSE', response);
        this.props.refreshPage();
      })
      .catch(error => {
        console.log(error)
      })
  }

  onChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

  render() {
    const { hideForm, editableDetails, selectNewChart, refreshPage, userID } = this.props;
    const updatingId = this.state.id;
    return(
      <div className="AddNewChartForm" id="AddNewChartForm">
        <div class="modal-content">
          <button id="backToChartSheet" onClick={ this.hideFormAndWipeState }>◄</button>
          { editableDetails == null ? <button id="addNewChart" onClick={ this.postChart } >ADD NEW CHART</button> : <button id="updateChart" onClick={ () => {this.updateChart(updatingId)} }>UPDATE CHART</button> }
          <form>
            <table id="chartsTable">
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">CHART</th>
                <th className="addChartSheetColumnRight"><input type="text" name="title" placeholder="max 20 characters" className='newChartInput' value={ this.state.title } onChange={ this.onChangeHandler } maxLength="20"/></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">UNIT</th>
                <th className="addChartSheetColumnRight"><input type="text" name="unitName" placeholder="max 20 characters" className='newChartInput' value={ this.state.unitName } onChange={ this.onChangeHandler } maxLength="20"/></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">TARGET</th>
                <th className="addChartSheetColumnRight"><input type="number" name="target" placeholder="whole numbers only (10 digits max)" className='newChartInput' value={ this.state.target } onChange={ this.onChangeHandler } min="-9999999999" max="9999999999"/></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">DESCRIPTION</th>
              </tr>
            </table>
            <div id="addChartlastDiv">
              <textArea type="text" placeholder="DESCRIPTION" name="description" className='descriptionInput' onChange={ this.onChangeHandler }>{ this.state.description }</textArea>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddNewChartForm;