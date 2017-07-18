import React from 'react';
import {browserHistory} from 'react-router';
import ClassNames from 'classnames';
import {JobCardMode} from './Const.js';
import HotTriangle from '../hotTriangle/HotTriangle.js';

export default class JobCard extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        browserHistory.push(`/job/${this.props.id}`);
    }

    getOpeningWidgetClassNames () {
        return ClassNames(
            'job-card',
            this.props.mode
        );
    }

    renderDepartmentLogo () {
        return null;
    }

    renderRole () {
        return <div className="role">{this.props.department}</div>;
    }

    renderLocationLogo () {
        return null;
    }

    renderSubmitButton () {
        return null;
    }

    getPanelBackgroundColor () {
        return {backgroundColor: this.props.color};
    }

    getTitleAndLocationColor () {
        return {color: ''};
    }

    render () {
        return (<div className={this.getOpeningWidgetClassNames()}
            style={this.getPanelBackgroundColor()}
            onClick={this.handleClick}>
            {
                this.renderDepartmentLogo()
            }
            {
                this.props.isHot ? <HotTriangle />: null
            }
            <div className="detail">
                <div className="title" style={this.getTitleAndLocationColor()}>{this.props.title.toUpperCase()}</div>
                {
                    this.renderRole()
                }
                {
                    this.renderLocationLogo()
                }
                <div className="location" style={this.getTitleAndLocationColor()}>{this.props.location}</div>
            </div>
            {
                this.renderSubmitButton()
            }
            <div className="footer"></div>
        </div>);
    }
}

JobCard.propTypes = {
    title: React.PropTypes.string,
    location: React.PropTypes.string,
    isHot: React.PropTypes.bool,
    department: React.PropTypes.string,
    id: React.PropTypes.number,
    mode: React.PropTypes.oneOf([JobCardMode.VERTICAL, JobCardMode.GRID, JobCardMode.GRID_WITH_APPLY_BUTTON]),
    color: React.PropTypes.string
};

JobCard.defaultProps = {
    mode: JobCardMode.VERTICAL
};
