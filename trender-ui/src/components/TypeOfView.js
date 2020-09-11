import React, {Component} from 'react';
import '../style/TypeOfView.css';
import {connect} from 'react-redux';
import {changeView} from '../actions/changeView.js';
import {addDays} from '../helpers/addDays.js';
import {resetDate} from '../actions/resetDate.js';
import {changeDate} from '../actions/changeDate.js';
;
class TypeOfView extends Component {

  handleClick = (e) => {
    this.props.resetDate();
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

  getWeekString = (date) => {
    let dayOfTheWeek = date.getDay();
    let startDay = addDays(date, -(dayOfTheWeek)).toDateString();
    let finishDay = addDays(startDay, 6).toDateString();
    return startDay + '\n\n' + finishDay
  }

  addOneMonth = (e) => {
    e.preventDefault();
  }

  addMonth = () => {
    let currentDate = new Date(this.props.currentDate);
    let newDate = currentDate;
    while (newDate.getMonth() == currentDate.getMonth()) {
      newDate = addDays(newDate, 1);
    }
    this.props.changeDate(newDate.toString())
  }

  subtractMonth = () => {
    let currentDate = new Date(this.props.currentDate);
    let newDate = currentDate;
    while (newDate.getMonth() == currentDate.getMonth()) {
      newDate = addDays(newDate, -1);
    }
    this.props.changeDate(newDate.toString())
    }

  addWeek = () => {
    let currentDate = this.props.currentDate;
    this.props.changeDate(addDays(currentDate, 7));
  }

  subtractWeek = () => {
    let currentDate = this.props.currentDate;
    this.props.changeDate(addDays(currentDate, -7));
  }

  render() {
    const { viewLapse, viewWhat, currentDate } = this.props;
    console.log('CURRENTDATE', currentDate)
    let date = new Date(currentDate);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let week = this.getWeekString(date);
    return (
      <div className="typeOfView">
        <div className="firstThreeButtons">
          {
          viewLapse.viewAll ?
          <button className="viewButton" id="viewAll1" onClick={ this.handleClick }>VIEW ALL</button> :
          <button className="viewButton" id="viewAll0" onClick={ this.handleClick }>VIEW ALL</button>
          }
          <br/>
          <button id="subtractMonth" onClick={ this.subtractMonth }>-</button>
          {
          viewLapse.viewMonthly ?
          <button className="viewButton" id="viewMonthly1" onClick={ this.handleClick }>{month + ' ' + year}</button> :
          <button className="viewButton" id="viewMonthly0" onClick={ this.handleClick }>VIEW MONTHLY</button>
          }
          <button id="addMonth" onClick={ this.addMonth }>+</button>
          <br/>
          <button id="subtractWeek" onClick={ this.subtractWeek }>-</button>
          {
          viewLapse.viewWeekly ?
          <button className="viewButton" id="viewWeekly1" onClick={ this.handleClick }>{week}</button> :
          <button className="viewButton" id="viewWeekly0" onClick={ this.handleClick }>VIEW WEEKLY</button>
          }
          <button id="addWeek" onClick={ this.addWeek }>+</button>
        </div>


      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewLapse: state.main.viewLapse,
    viewWhat: state.main.viewWhat,
    currentDate: state.main.currentDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (lapse, what) =>  dispatch(changeView(lapse, what)),
    resetDate: () => dispatch(resetDate()),
    changeDate: (newDate) => dispatch(changeDate(newDate))
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