import React, {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import classNames from 'classnames';

import JobList from './jobList/JobList';
import SearchBar from  './SearchBar';
import RolesPage from '../roles/RolesPage';
import LocationPage from '../locations/LocationsPage';
import Advertisement from './advertisement/Advertisement.js';
import MoreDataLoader from './MoreDataLoader.js';
import {JobCardMode} from '../common/card/Const.js';
import {arraysEqual} from '../../utils';
import {getJobs} from '../../api/api';

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
            selectedLocation: {shortName: 'China'},
            showRoles: false,
            showLocations: false,
            searchText: undefined,
            reloadKey : 1
        };

        this.switchMode = this.switchMode.bind(this);
        this.toggleRoles = this.toggleRoles.bind(this);
        this.addRoles = this.addRoles.bind(this);
        this.toggleLocations = this.toggleLocations.bind(this);
        this.getJobsByLocation = this.getJobsByLocation.bind(this);
        this.hideOverLay = this.hideOverLay.bind(this);
        this.getJobsBySearch = this.getJobsBySearch.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount () {
        this.getJobs();
        MoreDataLoader.enable(() => this.loadMoreData());
    }

    componentWillReceiveProps(nextProps){

      if (!nextProps.params.search) {

        this.setState({
            searchText: undefined,
            selectedLocation:
            this.state.selectedLocation,
            showLocations: false,
            showRoles: false,
            selectedRoles: []
          }, () => this.getJobs() );
      }
    }

    componentWillUnmount() {
        MoreDataLoader.disable();
    }

    loadMoreData () {
        let nextPageNumber = this.state.currentPageNumber + 1;
        if (nextPageNumber < this.state.totalPages) this.getJobs(nextPageNumber);
    }

    async getJobs (pageNumber = 0) {
        this.setState({
            isLoading: true
        });

        let {selectedRoles, searchText, selectedLocation} = this.state;
        let teamRoleIds = selectedRoles.length > 0 ? selectedRoles: undefined;

        let result = await getJobs(pageNumber, teamRoleIds, selectedLocation.locationIds, searchText);
        this.setState(
            {
                currentPageNumber: pageNumber,
                totalPages: result.pageList.totalPages,
                jobs: this.state.jobs.concat(result.pageList.content),
                isLoading: false,
                searchText: this.state.searchText
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

        this.setState({selectedRoles});
    }

    switchMode () {
        let newMode = this.state.listStyleMode === JobCardMode.VERTICAL ? JobCardMode.GRID : JobCardMode.VERTICAL;
        this.setState({
            listStyleMode: newMode
        });
    }

    toggleRoles() {
        let showRoles = !this.state.showRoles;

        if(showRoles) {
            this.setState({prevSelectedRoles: [...this.state.selectedRoles]});

        } else if (!showRoles && !arraysEqual(this.state.prevSelectedRoles, this.state.selectedRoles)) {
            this.setState({jobs:[]}, this.getJobs);
        }

        this.setState({showRoles, showLocations: false});
    }

    getJobsByLocation(location) {
      this.setState({showLocations:  false, selectedLocation: location ,jobs:[]}, this.getJobs);
    }

    getJobsBySearch(query) {
      this.setState({jobs: [], searchText: query}, this.getJobs);
    }

    toggleLocations() {
        let showLocations = !this.state.showLocations;
        this.setState({showLocations, showRoles: false});
    }

    hideOverLay() {
      this.state.showRoles ? this.toggleRoles() : this.setState({showLocations: false});
    }

    reset() {
      this.setState({reloadKey: this.state.reloadKey + 1});
    }

    render () {
        let {showRoles, showLocations,  isLoading, selectedRoles, selectedLocation} = this.state;
        let {search} = this.props.params;
        return (
            <div key={this.state.reloadKey} className={classNames("homepage", {'searchMode': search})}>
                {!search  && <Advertisement />}
                <SearchBar
                    reload = {this.reset}
                    searchMode = {search}
                    toggleRoles={this.toggleRoles}
                    toggleLocations = {this.toggleLocations}
                    showRoles={showRoles}
                    showLocations = {showLocations}
                    selectedRoles = {selectedRoles}
                    switchMode={this.switchMode}
                    getJobs = {this.getJobsBySearch}
                    selectedLocation={selectedLocation.shortName}
                    />
                <RolesPage show={showRoles} addRoles={this.addRoles} />
                <LocationPage show={showLocations} getJobs={this.getJobsByLocation} />
                <JobList data={this.state.jobs} listStyleMode={this.state.listStyleMode} />
                {isLoading && <div className="loading-symbol">LOADING... </div>}
                {(showRoles || showLocations) && <div className="overlay" onClick={this.hideOverLay}></div>}
            </div>
        );
    }
}

HomePage.propTypes  = {
  params:  PropTypes.object
};
