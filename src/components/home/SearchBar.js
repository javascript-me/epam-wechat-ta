import React, {
    Component,
    PropTypes
} from 'react';
import {browserHistory} from 'react-router';
import classNames from 'classnames';

import './SearchBar.less';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardMode: false,
            searchText: '',
            showCloseBtn: false
        };

        this.toggleView = this.toggleView.bind(this);
        this.gotoSearchPage = this.gotoSearchPage.bind(this);
        this.closeSearchBox = this.closeSearchBox.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.goBack = this.goBack.bind(this);

    }

    toggleView() {
        const {
            switchMode
        } = this.props;

        this.setState({
            isCardMode: !this.state.isCardMode
        });
        switchMode();
    }

    onSearchChange(e) {
      let value = e.target.value;
      this.setState({searchText: value, showCloseBtn: value.length});
    }

    gotoSearchPage() {
      browserHistory.push('/search');
    }

    closeSearchBox() {
      this.setState({searchText:'', showCloseBtn: false});
    }


    executeSearch(event) {
        event.preventDefault();
        this.props.getJobs(this.state.searchText);
    }

    renderSearchView() {
        return (
            <span className={
            classNames("search-bar__view",
              {'search-bar__view-list': this.state.isCardMode},
              {'search-bar__view-card': !this.state.isCardMode})}
            onClick = {this.toggleView}>
        </span>
        );
    }

    renderSearchBox() {
        return (
            <div className={classNames("search-bar__field")}>
              <input
                name="search"
                className="search-bar__input"
                type="text"
                autoFocus
                value={this.state.searchText} onChange={this.onSearchChange} />

              <span
                  className={classNames("search-bar__close", {'search-bar__close--show': this.state.showCloseBtn})}
                  onClick = {this.closeSearchBox}></span>
          </div>
        );
    }

    goBack() {
      browserHistory.goBack();
      this.props.reload();
    }

    renderSearchIcon() {
        return (
            <i className="search-bar__search"
            onClick={this.gotoSearchPage}></i>
        );
    }

    // TODO: Add sorting functionality
    renderSorting() {
      return (<div className="search-bar__sort">
              <span>Sort by: </span>
              <i className="search-bar__sort-icon"></i>
              <i className ="search-bar__arrow-down"></i>
            </div>);
    }

    render() {
        let {isCardMode} = this.state;
        let {showRoles, selectedRoles, selectedLocation, toggleRoles, toggleLocations, showLocations, searchMode} = this.props;

        return (
          <form onSubmit={this.executeSearch}>
            <div className="search-bar">
                <div className="search-bar__wrapper">
                    {searchMode && <i onClick={this.goBack}  className="search-bar__back"></i>}
                    {searchMode && this.renderSearchBox()}
                    {searchMode && this.renderSearchView()}

                    <div onClick={toggleLocations}
                      className= {classNames("search-bar__location", {'search-bar__location--active':showLocations})}>
                        <span className="search-bar__location-name">{selectedLocation}</span>
                        <i className={classNames(showLocations ? "search-bar__arrow-up": "search-bar__arrow-down")}></i>
                    </div>

                    <div className={classNames("search-bar__role", {'search-bar__role--active': showRoles})}
                        onClick = {toggleRoles}>

                        <span
                            className="search-bar__role-name">Team & Roles: {selectedRoles.length ? selectedRoles.length: 'ALL'}</span>
                        <i className={showRoles ? "search-bar__arrow-up": "search-bar__arrow-down"}></i>
                    </div>

                  {!searchMode && this.renderSearchView()}
                  {!searchMode && this.renderSearchIcon()}
                </div>
            </div>
          </form>
        );
    }
}

SearchBar.propTypes = {
    switchMode: PropTypes.func.isRequired,
    toggleRoles: PropTypes.func.isRequired,
    toggleLocations: PropTypes.func.isRequired,
    showRoles: PropTypes.bool.isRequired,
    selectedRoles: PropTypes.array.isRequired,
    showLocations: PropTypes.bool.isRequired,
    searchMode: PropTypes.string,
    getJobs: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
    selectedLocation: PropTypes.string.isRequired
  };

export default SearchBar;
