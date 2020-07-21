import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const Repo = (props) => {

  const { repo, className } = props;

  return (
    <div className={`repo ${className}__item`}>
      <div className='repo-header'>
        <p className="repo-header__item">{repo.name}</p>
      </div>
      <div className='repo-footer'>
        <Icon id='fork' num={repo.forks} />
        <Icon id='star' num={repo.stargazers_count} />
      </div>
    </div>
  );
};

Repo.propTypes = {
  repo: PropTypes.object,
  className: PropTypes.string
};

Repo.defaultProps = {

};

export default Repo;