import React, {Component} from 'react';

class AddNewChartForm extends Component {
  state = {
    title: '',
    unitName: '',
    description: '',
    target: null
  }

  render() {
    return(
      <div className="AddNewChartForm" id="AddNewChartForm">
        <div class="modal-content">
          <div className='chartSheetElement' id='title'>Title</div>
          <div className='chartSheetElement' id='unitName'>Unit</div>
          <div className='chartSheetElement' id='target'>Target Daily</div>
          <div className='chartSheetElement' id='description'>Description of the chart</div>
        </div>
      </div>
    )
  }
}

export default AddNewChartForm;