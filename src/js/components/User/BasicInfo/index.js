import React from 'react';
import PropTypes from 'prop-types';

const BasicInfo = (props) => {
const { avatar_url, login, name } = props;

  return (
    <div className='user-upper'>
      <div className="user-upper__img">
        <img src={avatar_url} alt={name}/>
      </div>
      <p className='user-upper__name'>{name}</p>
      <p className="user-upper__login"><b>@{login}</b></p>
    </div>
  );
};

BasicInfo.propTypes = {
  avatar_url: PropTypes.string,
  login: PropTypes.string,
  name: PropTypes.string
};

BasicInfo.defaultProps = {

};

export default BasicInfo;