import React, {Component} from 'react';
import '../style/TypeOfView.css';
import {connect} from 'react-redux';
import {changeView} from '../actions/changeView.js';

class TypeOfView extends Component {

  handleClick = (e) => {
    let button = e.target;
    let buttonId = button.id;
    let relevantProperty = buttonId.slice(0, -1);
    let falseOrTrue = buttonId[buttonId.length - 1];
    if (relevantProperty == 'viewDataOnly' || relevantProperty == 'viewWholePeriod') {
      let newViewWhat = {
        viewDataOnly:  ('viewDataOnly' == relevantProperty),
        viewWholePeriod: ('viewWholePeriod' == relevantProperty)
      }
      this.props.changeView(null, newViewWhat);
    } else {
      let newViewLapse = {
        viewAll: ('viewAll' == relevantProperty),
        viewMonthly: ('viewMonthly' == relevantProperty),
        viewWeekly: ('viewWeekly' == relevantProperty)
      }
      this.props.changeView(newViewLapse, null);
    }
  }

  render() {
    const { viewLapse, viewWhat } = this.props;
    return (
      <div className="typeOfView">
        <div className="firstThreeButtons">
          {
          viewLapse.viewAll ?
          <button className="viewButton" id="viewAll1" onClick={ this.handleClick }>VIEW ALL</button> :
          <button className="viewButton" id="viewAll0" onClick={ this.handleClick }>VIEW ALL</button>
          }
          <br/>
          {
          viewLapse.viewMonthly ?
          <button className="viewButton" id="viewMonthly1" onClick={ this.handleClick }>VIEW MONTHLY</button> :
          <button className="viewButton" id="viewMonthly0" onClick={ this.handleClick }>VIEW MONTHLY</button>
          }
          <br/>
          {
          viewLapse.viewWeekly ?
          <button className="viewButton" id="viewWeekly1" onClick={ this.handleClick }>VIEW WEEKLY</button> :
          <button className="viewButton" id="viewWeekly0" onClick={ this.handleClick }>VIEW WEEKLY</button>
          }
        </div>


      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewLapse: state.main.viewLapse,
    viewWhat: state.main.viewWhat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (lapse, what) =>  dispatch(changeView(lapse, what))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeOfView);

//      <div className="lastTwoButtons">
//        {
//        viewWhat.viewDataOnly ?
//        <button className="viewButton" id="viewDataOnly1" onClick={ this.handleClick }>VIEW DATA ONLY</button> :
//        <button className="viewButton" id="viewDataOnly0" onClick={ this.handleClick }>VIEW DATA ONLY</button>
//        }
//        <br/>
//        {
//        viewWhat.viewWholePeriod ?
//        <button className="viewButton" id="viewWholePeriod1" onClick={ this.handleClick }>VIEW PERIOD</button> :
//        <button className="viewButton" id="viewWholePeriod0" onClick={ this.handleClick }>VIEW PERIOD</button>
//        }
//      </div>