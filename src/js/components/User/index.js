import React from 'react';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import BasicInfo from './BasicInfo';
import MoreInfo from './MoreInfo';

const User = (props) => {
  const { info, loading, className } = props;

  const Info = () => {

    if (!info) {
      return <p>No data requested</p>;
    }

    if (info.status) { 
      return <p>Something went wrong... {info.status}: {info.statusText}</p>;
    }

    const { avatar_url, login, name, public_repos, followers } = info;

    return <>
      <BasicInfo {...{avatar_url, login, name}} />
      <MoreInfo {...{public_repos, followers}} />
    </>;
  };

  return (
    <div className={className}>
      {
        loading
          ? <Loader />
          : <Info />
      }
    </div>
  );
};

User.propTypes = {
  info: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.bool
};

User.defaultProps = {
  className: 'user'
};

export default User;