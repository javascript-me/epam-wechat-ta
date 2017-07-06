import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import './SearchBar.less';


class SearchBar extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            isCardMode: false
        };

        this.toggleView = this.toggleView.bind(this);
        this.toggleRoles = this.toggleRoles.bind(this);
    }

    toggleView() {
        const {switchMode} = this.props;
        this.setState({isCardMode: !this.state.isCardMode});
        switchMode();
    }

    toggleRoles() {
        this.props.toggleRoles();
    }

    render() {
        const {isCardMode} = this.state;
        const {showRoles, selectedRoles} = this.props;
        return (
            <div className="search-bar">
                <div className="search-bar__wrapper">
                    <div className="search-bar__location">
                        <span className="search-bar__location-name">Shenzhen</span>
                        
                        <span className="search-bar__arrow-down"></span>
                    </div>

                    <div className={classNames("search-bar__role", {'SearchBar__role--active': showRoles })} onClick = {this.toggleRoles}>
                        <span className="search-bar__role-name">Team & Roles: {selectedRoles.length ? selectedRoles.length: 'ALL'}</span>
                        <span className={showRoles ? "search-bar__arrow-up": "search-bar__arrow-down"}></span>
                    </div>
                    <span className={classNames("search-bar__view", 
                            {'search-bar__view-list': isCardMode}, 
                            {'search-bar__view-card': !isCardMode})} 
                            onClick = {this.toggleView}>
                    </span>
                    <span className="search-bar__search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                            <path fill="#999" fill-rule="evenodd" d="M14.27 8.682h-1.027c0-2.435-2-4.394-4.486-4.394V3.282c3.08.053 5.513 2.436 5.513 5.4zm5.406 6.618l-3.244-2.594c1.946-3.547 1.136-8.047-2.162-10.694C10.54-.953 5.027-.424 2 3.282-1.027 6.988-.486 12.335 3.243 15.3c3.298 2.647 8.054 2.488 11.19-.159l3.135 2.488 2.108-2.329zm-15.19-1.43c-2.918-2.329-3.35-6.511-.972-9.37 2.378-2.859 6.648-3.282 9.567-.953 2.919 2.33 3.351 6.512.973 9.37-2.378 2.86-6.649 3.23-9.568.954z"/>
                        </svg>
                    </span>

                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    switchMode: PropTypes.func.isRequired,
    toggleRoles: PropTypes.func.isRequired,
    showRoles: PropTypes.bool.isRequired
};

export default SearchBar;