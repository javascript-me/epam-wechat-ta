import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';

import {
  getLocations
} from '../../api/api';
import CityList from './CityList';

import './Locations.less';

class LocationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }

  componentDidMount() {
    this.getLocations();
  }


  async getLocations() {
    let locations = await getLocations();
    this.setState({locations: locations.dto});
  }

  renderLocations () {
    return (
      <ul className="location__list">
        {
          this.state.locations.map((loc, index) => (
            <li key = {index}>
              <strong className="location__country">{loc.country}</strong>
                <CityList cities={loc.cities} getJobs = {this.props.getJobs}/>
            </li>
          ))
        }
      </ul>
    )
  }

  render() {
    let {show} = this.props;

    return (
      <div className = {classNames( "location", {'hidden': !show})} >
        {this.renderLocations()}
      </div>
    );
  }
}

export default LocationPage;
