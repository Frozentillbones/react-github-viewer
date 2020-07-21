import React, { useState, useEffect } from 'react';
import Finder from './Finder';
import List from './List';
import User from './User';
import findUser from '../api-callers/findUser';
import findRepos from '../api-callers/findRepos';
import './style.scss';
import Repo from './Repo';

const App = () => {

  const [ userQuery, setUserQuery ] = useState(null);

  const [ userInfo, setUserInfo ] = useState(null);
  const [ userInfoLoading, setUserInfoLoading ] = useState(false);

  const [ userRepos, setUserRepos ] = useState(null);
  const [ userReposLoading, setUserReposLoading ] = useState(false);
  
  useEffect(() => {
    const 
      find = {
        user: findUser,
        repos: findRepos
      },
      set = {
        user: setUserInfo,
        repos: setUserRepos
      },
      loadings = {
        user: setUserInfoLoading,
        repos: setUserReposLoading
      };
    
    if (userQuery) {
      Object.entries(find).forEach(([key, func]) => {
       loadings[key](true);
       func(userQuery)
         .then(data => {
           loadings[key](false);
           set[key](data);
         })
         .catch((err) => { loadings[key](false); set[key](err); });
      });
    } else {
      Object.values(set).forEach(func => {
        func(null);
      });
    }
  }, [ userQuery ]);

  return (
    <>
      <header>
        <Finder setQuery={setUserQuery}/>
      </header>
      <main className='layout'>
        <User 
          info={userInfo}
          loading={userInfoLoading}
          className='user layout__item'
        />
        <List
          data={userRepos}
          dataType='repo'
          template={Repo}
          loading={userReposLoading}
          className='repos layout__item'
        />
      </main>
    </>
  );
};

export default App;
