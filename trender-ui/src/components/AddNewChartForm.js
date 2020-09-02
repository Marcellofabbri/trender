import React, {Component} from 'react';
import '../style/AddNewChartForm.css';

class AddNewChartForm extends Component {
  state = {
    title: '',
    unitName: '',
    description: '',
    target: null
  }

  render() {
    const { hideForm } = this.props;
    return(
      <div className="AddNewChartForm" id="AddNewChartForm">
        <div class="modal-content">
          <button id="backToChartSheet" onClick={ hideForm }>◄</button>
          <button id="addNewChart">ADD NEW CHART</button>
          <form>
            <table id="chartsTable">
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">CHART</th>
                <th className="addChartSheetColumnRight"><input type="text" placeholder="TITLE" className='newChartInput' /></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">UNIT</th>
                <th className="addChartSheetColumnRight"><input type="text" placeholder="UNIT" className='newChartInput' /></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">TARGET</th>
                <th className="addChartSheetColumnRight"><input type="text" placeholder="TARGET" className='newChartInput' /></th>
              </tr>
              <tr className="chartSpecsRow">
                <th className="addChartSheetColumnLeft">DESCRIPTION</th>
              </tr>
            </table>
            <div id="addChartlastDiv">
              <input type="text" placeholder="Description" className='descriptionInput'/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddNewChartForm;