import React from 'react';
import JobCard from './JobCard.js';
import locationLogo from './locationLogo.svg';

export default class GridWithApplyButtonJobCard extends JobCard {

    constructor (props) {
        super(props);
        this.applyJob = this.applyJob.bind(this);
    }

    applyJob () {
        window.location.href = '/apply/' + this.props.id;
    }

    renderRole () {
        return null;
    }

    renderLocationLogo () {
        return <img src={locationLogo} className="location-logo" alt="location logo"></img>;
    }

    renderSubmitButton () {
        return <div className="button submit" onClick={this.applyJob}>Apply Now</div>;
    }

    handleClick () {
    }    
    
}