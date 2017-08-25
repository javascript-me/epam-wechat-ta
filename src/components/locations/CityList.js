import React, {PropTypes} from 'react';
import City from './City';

const CityList = ({cities, getJobs}) => (
        <ul className="location__cities">
          {cities.map((c, index) => <City key={index} city={c} getJobs = {getJobs}/> )}
      </ul>
);

CityList.propTypes  = {
  cities: PropTypes.array.isRequired,
  getJobs: PropTypes.func.isRequired
};

export default CityList;
