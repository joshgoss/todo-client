import './Input.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Input extends React.Component {
    render() {
        const {
            autoComplete,
            disabled,
            error,
            label,
            loading,
            name,
            type,
            onChange,
            placeholder,
            required,
            value,
            width
        } = this.props; 

        const fieldClasses = classNames('field', {
            required,
            error,
            'col-1': width === 1,
            'col-2': width === 2, 
            'col-3': width === 3
        });
    
        const inputClasses = classNames('input', {
            required,
            error
        });
    
        const labelClasses = classNames('label', {required});
    
        return (
            <div className={fieldClasses}>
                {!!label && (
                    <label className={labelClasses} htmlFor={name} >{label}</label>
                )}
                
                <span className='input-container'>
                    <input
                        autoComplete={autoComplete}
                        className={inputClasses}
                        disabled={disabled}
                        name={name}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        type={type}
                        value={value}
                    />

                    {loading && <FontAwesomeIcon icon="spinner" spin />}
                </span>
    
                {!!error && typeof error === 'string' && error.length > 0 && (
                    <p className='message error'>{error}</p>
                )}
            </div>
            
        ); 
    }
}


export default Input;

Input.propTypes = {
    autoComplete: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    loading: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    width: PropTypes.oneOf([1 ,2, 3])
};

Input.defaultProps = {
    disabled: false,
    error: '',
    loading: false,
    placeholder: '',
    required: false,
    type: 'text',
    width: 1
};