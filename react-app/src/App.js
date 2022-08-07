import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostsPage from './components/postPage';
import MatchesPage from './components/matchPage';
import MatchedPage from './components/matchedPage';
import EditPostsPage from './components/postEdit';
import CreatePostsPage from './components/postForm';
import MessagesPage from './components/messagePAge';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
      <Route path='/posts' exact={true}>
          <PostsPage />
        </Route>
        <Route path='/posts/create' exact={true}>
          <CreatePostsPage />
        </Route>
        <Route path='/posts/edit/:id'>
          <EditPostsPage />
        </Route>
        <Route path='/matches' exact={true}>
          <MatchesPage />
        </Route>
        <Route path='/matched' exact={true}>
          <MatchedPage />
        </Route>
        <Route path='/messages' exact={true}>
          <MessagesPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <div className='lovefinderrz'>
          <img alt='' src='https://www.gamespot.com/a/uploads/scale_medium/171/1712892/3605592-screen%20shot%202019-11-18%20at%2012.15.28%20am.png' height='600px'/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
