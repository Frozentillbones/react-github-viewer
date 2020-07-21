import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const List = (props) => {

const { data, loading, className, template, dataType } = props;

const firstClassName = className && className.split(' ')[0];

const Data = () => {

  if (!data) {
    return <p>No data requested</p>;
  }
  
  if (!Array.isArray(data)) {
    return <p>Something went wrong... {data.status}: {data.statusText}</p>;
  }

  if (!data.length) {
    return <p>No {dataType}</p>;
  }

  const Template = template;
  return data.map((item, key) => {
    return <Template {...{[dataType]: item, key, className: firstClassName}} />;
  });
};

  return (
    <div className={className}>
      {
        loading
          ? <Loader />
          : <Data />
      }
    </div>
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  template: PropTypes.elementType
};

List.defaultProps = {

};

export default List;