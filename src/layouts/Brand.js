import PropTypes from 'prop-types';
import './Brand.scss';

const Brand = ({showTagline}) => {
    return (
        <div className='brand'>
          <span className='title'><span className='primary'>To</span><span className='alt'>Do</span></span>
          {showTagline && (<span className='tagline'>A Simple To-Do Manger</span>)}
        </div>
    );
};

export default Brand;

Brand.propTypes = {
    showTagline: PropTypes.bool
};

Brand.defaultProps = {
    showTagline: true
};