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
          <h2>Add a new chart</h2>
          <form>
            <input type="text" placeholder="Title" className='chartSheetElement' />
            <input type="text" placeholder="Unit of measurement" className='chartSheetElement' />
            <input type="text" placeholder="Target" className='chartSheetElement' />
            <input type="text" placeholder="Description" className='chartSheetElement'/>
            <button>Add</button>
          </form>
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