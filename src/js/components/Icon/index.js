import React from 'react';
import PropTypes from 'prop-types';
import svg from '../../../images/svg/sprite.svg';

const Icon = (props) => {

  const { id, num } = props;
  return (
    <div className='icon'>
      <svg>
        <use href={`${svg}#${id}`}/>
      </svg>
      <p>{num}</p>
    </div>
  
  );
};

Icon.propTypes = {
  id: PropTypes.string,
  num: PropTypes.number
};

Icon.defaultProps = {

};

export default Icon;