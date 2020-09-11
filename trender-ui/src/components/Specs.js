import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../style/Specs.css';

class Specs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      avg: 'N/A',
      max: 'N/A',
      min: 'N/A',
      records: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length > 0) {
      this.extrapolateSpecs(nextProps.data)
    }
  }

  extrapolateSpecs = (items) => {
    let values = items.map(item => item.value);
    let records = items.length;
    let orderedValues = values.sort((a, b) => b-a);
    let max = orderedValues[0];
    let min = orderedValues[orderedValues.length - 1];
    let sum = orderedValues.reduce(function(a, b) { return a+b}, 0);
    let avg = (sum/(orderedValues.length)).toFixed(2);
    this.setState({
      items,
      avg,
      max,
      min,
      records
    })
  }

  render() {
    const { items, viewLapse } = this.props;
    let state = this.state;
    return (
      <div className="specs">
          <table className="specsTable">
            <tr>
              <td className="emptyRow"></td>
            </tr>
            <tr>
              <td className="specTitle">AVG</td>
              <td className="specTitle">MAX</td>
            </tr>
            <tr>
              <td className="specValue">{state.avg}</td>
              <td className="specValue">{state.max}</td>
            </tr>
            <tr>
              <td className="emptyRow"></td>
            </tr>
            <tr>
              <td className="specTitle">RECORDS</td>
              <td className="specTitle">MIN</td>
            </tr>
            <tr>
              <td className="specValue">{state.records}</td>
              <td className="specValue">{state.min}</td>
            </tr>
            <tr>
              <td className="emptyRow"></td>
            </tr>
          </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    viewLapse: state.main.viewLapse
  }
}

export default connect(mapStateToProps, null)(Specs);