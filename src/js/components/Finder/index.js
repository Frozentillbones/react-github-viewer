import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Finder = (props) => {
  const { className, setQuery } = props;
  const [ valueToSearch, setValueToSearch ] = useState('');

  return (
    <form 
      className={className} 
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(valueToSearch);
      }}
    >
      <input 
        type="search"
        className={`${className}-input`}
        onChange={({target: { value }}) => { setValueToSearch(value); }}
        value={valueToSearch}
      />
      <button className={`${className}-send`}>show</button>
    </form>
  );
};

Finder.propTypes = {
  className: PropTypes.string,
  setQuery: PropTypes.func,
};

Finder.defaultProps = {
  className: 'finder'
};

export default Finder;