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
    target: null
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
        target: editableDetails.selectedChartTarget
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
      target: null
    })
    this.props.hideForm();
  }

  postChart = () => {
    let chosenDate = (new Date()).toJSON();
    let payload = {
      createdAt: chosenDate,
      title: this.state.title,
      unitName: this.state.unitName,
      target: this.state.target,
      description: this.state.description
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
      description: this.state.description
    }
    console.log(updatingId)
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
    const { hideForm, editableDetails, selectNewChart, refreshPage } = this.props;
    console.log(this.props)
    const updatingId = this.state.id;
    console.log('UPDATINGID', updatingId);
    return(
      <div className="AddNewChartForm" id="AddNewChartForm">
        <div class="modal-content">
          <button id="backToChartSheet" onClick={ this.hideFormAndWipeState }>◄</button>
          { editableDetails == null ? <button id="addNewChart" onClick={ this.postChart } >ADD NEW CHART</button> : <button id="updateChart" onClick={ () => {this.updateChart(updatingId)} }>UPDATE CHART</button> }
          <form>
            <table id="chartsTable">
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">CHART</th>
                <th className="addChartSheetColumnRight"><input type="text" name="title" placeholder="TITLE" className='newChartInput' value={ this.state.title } onChange={ this.onChangeHandler }/></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">UNIT</th>
                <th className="addChartSheetColumnRight"><input type="text" name="unitName" placeholder="UNIT" className='newChartInput' value={ this.state.unitName } onChange={ this.onChangeHandler } /></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">TARGET</th>
                <th className="addChartSheetColumnRight"><input type="text" name="target" placeholder="TARGET" className='newChartInput' value={ this.state.target } onChange={ this.onChangeHandler } /></th>
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