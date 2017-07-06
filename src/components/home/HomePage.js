import React, {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import classNames from 'classnames';

import JobList from './jobList/JobList';
import SearchBar from  './SearchBar';
import RolesPage from '../roles/RolesPage';
import Advertisement from './advertisement/Advertisement.js';
import Service from './Service.js';
import MoreDataLoader from './MoreDataLoader.js';
import {JobCardMode} from '../common/card/Const.js';
import {arraysEqual} from '../../utils';

export default class HomePage extends Component {

    constructor (props) {
        super(props);
        document.title = 'EPAM Openings';


        this.state = {
            listStyleMode: JobCardMode.VERTICAL, 
            jobs: [], 
            currentPageNumber: 0,
            totalPages: 0, 
            isLoading: false,
            selectedRoles: [],
            prevSelectedRoles: [],
            showRoles: false
        };

        this.switchMode = this.switchMode.bind(this);
        this.toggleRoles = this.toggleRoles.bind(this);
        this.addRoles = this.addRoles.bind(this);
    }

    loadMoreData () {
        let nextPageNumber = this.state.currentPageNumber + 1;
        if (nextPageNumber < this.state.totalPages) this.getJobs(nextPageNumber);
    }

    async getJobs (pageNumber = 0) {
        
        this.setState({
            isLoading: true
        });

        let {selectedRoles} = this.state;

        let teamRoleIds = selectedRoles.length > 0 ? selectedRoles: undefined; 

        let result = await Service.getJobsResult(pageNumber, teamRoleIds)
        this.setState(
            {
                currentPageNumber: pageNumber,
                totalPages: result.pageList.totalPages, 
                jobs: this.state.jobs.concat(result.pageList.content),
                isLoading: false
            }
        );
    }

    addRoles(roleId) {
        let {selectedRoles} = this.state;
        let index  = selectedRoles.findIndex(role => role === roleId);
        
        if (index > -1) {
            selectedRoles.splice(index, 1);
        } else {
            selectedRoles.push(roleId);
        }

        this.setState({selectedRoles})
    }

    switchMode () {
        let newMode = this.state.listStyleMode === JobCardMode.VERTICAL ? JobCardMode.GRID : JobCardMode.VERTICAL;
        this.setState({
            listStyleMode: newMode
        });
    }

    toggleRoles() {
        let showRoles = !this.state.showRoles;
        this.setState({showRoles});

        if(showRoles) {
            this.state.prevSelectedRoles = [...this.state.selectedRoles];

        } else if (!showRoles && !arraysEqual(this.state.prevSelectedRoles, this.state.selectedRoles)) {
            this.state.jobs = [];
            this.getJobs();
        }
    }
    
    componentDidMount () {
        this.getJobs();
        MoreDataLoader.enable(() => this.loadMoreData());
    }

    componentWillUnmount() {
        MoreDataLoader.disable()
    }


    render () {
        let {showRoles, isLoading, selectedRoles} = this.state;
        
        return (
            <div className='homepage'>
                <Advertisement />
                <SearchBar toggleRoles={this.toggleRoles} showRoles={showRoles} selectedRoles = {selectedRoles} switchMode={this.switchMode}/>
                <RolesPage show = {showRoles} addRoles = {this.addRoles} />
                <JobList data={this.state.jobs} listStyleMode={this.state.listStyleMode} />
                {isLoading && <div className="loading-symbol">LOADING... </div>}
                {showRoles && <div className="overlay" onClick={this.toggleRoles}></div>}
            </div>
        );
    }
};