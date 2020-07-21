import React from 'react';
import './style.scss';

const Loader = (props) => {
  return (
    <div className="lds-ripple"><div></div><div></div></div>  
  );
};

export default Loader;