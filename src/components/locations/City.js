import React, {Component,PropTypes} from 'react';

class City extends Component{
  constructor(props) {
    super(props);
    this.getJobs = this.getJobs.bind(this);
  }

  getJobs() {
    this.props.getJobs(this.props.city);
  }

  render() {
    return (<li onClick={this.getJobs} className="location__city">{this.props.city.name}</li>);
  }
}

City.propTypes = {
  city: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired
};

export default City;
