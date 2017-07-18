import React, {PropTypes} from 'react';
import Role from './Role';

const RoleList  = ({roles, addRoles}) => {
    return (
        <ul className = "roles__list">
            {roles.map( r => <Role key={r.id} role = {r} addRoles = {addRoles}/>)}
        </ul>
    );
};

RoleList.propTypes  = {
    roles: PropTypes.array.isRequired,
    addRoles: PropTypes.func.isRequired
};

export default RoleList;
