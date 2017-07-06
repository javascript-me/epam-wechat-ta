import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';
import RoleList from './RoleList';
import 'whatwg-fetch';
import config from '../../api/config';

import './Roles.less';

class RolesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      roles: []
    };

  }

  componentDidMount() {
    this.getRoles();
  }

  getRoles() {
      fetch(`${config.baseUri}team/role`)
        .then(response => response.json())
        .then(roles => this.setState({roles: roles.dto}));
  }

    render() {
      const {show, addRoles} = this.props;

      return (
          <div className = {classNames("roles", {'hidden': !show})}> 
            <RoleList  roles = {this.state.roles} addRoles = {addRoles}/>
          </div>
      );
    }
  }

  RolesPage.propTypes  = {
    show: PropTypes.bool,
    addRoles: PropTypes.func.isRequired
  };

  export default RolesPage;
