import React from 'react';
import JobCard from './JobCard.js';

export default class GridJobCard extends JobCard {

    renderRole () {
        let department = (this.props.department === "Delivery & Project Management") ? "Delivery & Project MGMT" : this.props.department;
        return <div className="role">{department}</div>;
    }
    
}