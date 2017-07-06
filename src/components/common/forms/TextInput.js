import React , {PropTypes} from 'react';
import classNames from 'classnames';
import './forms.less';

const TextInput  = ({name, onChange, placeholder, value, hassError, validations}) => {

    return (

        <input
            className= {classNames("job-form__input", {'has-error': hassError})}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange} />
    );
};


TextInput.propTypes  = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    hassError: PropTypes.bool,
    validations:  PropTypes.array
};

export default TextInput;