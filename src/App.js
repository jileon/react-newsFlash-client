import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

// import HeaderBar from './components/header-bar';
import UserLogin from './components/user-login';
import Dashboard from './components/dashboard';
import FolderReadView from './components/folder-read-view';
import RegistrationPage from './components/registration-page';
import LandingPage from './components/Landing-Page';
import Demo from './components/Landing-Page/demo';
import { refreshAuthToken } from './actions/auth';
import { clearAuth } from './actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }
  //TODO: import clearauth() from auth actions to clear current user when component unmounts
  componentWillUnmount() {
    this.stopPeriodicRefresh();
    this.props.dispatch(clearAuth());
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/news" component={Dashboard} />
        <Route exact path="/registeruser" component={RegistrationPage} />
        <Route path="/folder/:id" component={FolderReadView} />
        {/* <Redirect to="/" /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
