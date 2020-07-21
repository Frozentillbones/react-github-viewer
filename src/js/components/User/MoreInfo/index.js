import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';

const MoreInfo = (props) => {

  const { public_repos, followers } = props;

  return (
    <div className='user-lower'>
      <Icon id='source-rep' num={public_repos}/>
      <Icon id='acc-multi' num={followers}/>
    </div>
  );
};

MoreInfo.propTypes = {
  public_repos: PropTypes.number,
  followers: PropTypes.number
};

MoreInfo.defaultProps = {

};

export default MoreInfo;