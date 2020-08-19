import React, {Component} from 'react';
import AddNewChartForm from './AddNewChartForm';
import '../style/ChartSheet.css';
import '../style/AddNewChartForm.css'

class ChartSheet extends Component {
  state = {
      showForm: false
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


  render() {
    return(
      <div className='ChartSheet'>
        <AddNewChartForm />
        <button id='addChart' onClick={ this.revealForm }>NEW CHART</button>
        <div className='chartSheetElement' id='title'>Title</div>
        <div className='chartSheetElement' id='unitName'>Unit</div>
        <div className='chartSheetElement' id='target'>Target Daily</div>
        <div className='chartSheetElement' id='description'>Description of the chart</div>
      </div>
    )
  }
}

export default ChartSheet;