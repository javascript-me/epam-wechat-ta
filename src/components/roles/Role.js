import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import deleteIcon from './delete_icon.svg';


class Role extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };

        this.toggleSelection = this.toggleSelection.bind(this);
    }


    toggleSelection() {
        let {selected} = this.state;
        this.setState({selected: !selected});
        this.props.addRoles(this.props.role.id);
    }

    showDeleteIcon() {
        return this.state.selected ? (<img src={deleteIcon} alt="delete icon"/>) : ''; 
    }

    render() {
        const {role}  = this.props;

        return ( <li className = {classNames("roles__item", {'role__selected': this.state.selected})} 
                         onClick = {this.toggleSelection} > 
                    {role.name} {this.showDeleteIcon()}
                </li>);

    }
}

Role.propTypes  = {
    role: PropTypes.object.isRequired,
    addRoles: PropTypes.func.isRequired
};

export default Role;