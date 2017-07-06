import React from 'react';
import JobCard from './JobCard.js';

export default class VerticalJobCard extends JobCard {

    renderDepartmentLogo () {
        return <div className="department-logo" style={{backgroundColor: this.props.color}}>{this.props.teamRoleShortName}</div>;
    }

    getPanelBackgroundColor () {
        return {backgroundColor: ""};
    }

    getTitleAndLocationColor () {
        return {color: this.props.color};
    }
}

VerticalJobCard.propTypes = {
    teamRoleShortName: React.PropTypes.string
};