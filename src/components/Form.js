import './Form.scss';
import PropTypes from 'prop-types';

function Form({children, onSubmit}) {
    return (
        <form className='form' onSubmit={onSubmit} >
            {children}
        </form>
    );
}

export default Form;

Form.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]),
    onSubmit: PropTypes.func.isRequired
}