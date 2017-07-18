import React from 'react';
import {browserHistory} from 'react-router';
import JobCard from './JobCard.js';
import locationLogo from './locationLogo.svg';

export default class GridWithApplyButtonJobCard extends JobCard {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        browserHistory.push(`/apply/${this.props.id}`);
    }

    renderRole () {
        return null;
    }

    renderLocationLogo () {
        return <img src={locationLogo} className="location-logo" alt="location logo"></img>;
    }

    renderSubmitButton () {
      return <div className="button submit" onClick={this.handleClick}>Apply Now</div>;
    }
}
