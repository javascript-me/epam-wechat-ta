import React , {PropTypes} from 'react';
import classNames from 'classnames';
import './forms.less';

const TextInput  = ({name, onChange, onBlur, placeholder, value, hassError, validations}) => {

    return (

        <input
            className= {classNames("job-form__input", {'has-error': hassError})}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            />
    );
};


TextInput.propTypes  = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    hassError: PropTypes.bool,
    validations:  PropTypes.array
  };

export default TextInput;
